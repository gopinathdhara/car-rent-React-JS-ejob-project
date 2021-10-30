import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import AOS from 'aos';
import "aos/dist/aos.css";
import HeaderComponent from '../includes/HeaderComponent';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingOverlay from 'react-loading-overlay'
import { serverBaseUrl } from '../Common/Utils'
import { Redirect } from 'react-router-dom';
import { withAlert } from 'react-alert'
import moment from 'moment'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        //declare state variables
        this.state = {
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
            carsInfo: [],
            startDate: new Date(),
            startDate_error: '',
            startDateFormatted: '',
            endDate: new Date(),
            endDateFormatted: '',
            cities: [],
            city_name: '',
            city_name_error: '',
            startTime: '',
            endTime: '',
            isActive: true,
            redirect: false
        }
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
    }
    //component finishes loading
    componentDidMount() {
        setTimeout(() => this.setState({ isActive: false }), 1000)
        console.log('Component Did MOUNT!')
    }
    componentWillMount() {

        console.log('Component Will MOUNT!')
        //call api get list of cars
        axios.post(serverBaseUrl + "listcar?page=home").then((res) => {
            console.log(res.data.data.car_details);
            this.setState({
                carsInfo: res.data.data.car_details
            })

        }).catch((err) => {
            console.log(err)

        })
        //call api get list of cities
        axios.get(serverBaseUrl + "listcity").then((res) => {
            console.log(res.data.data);
            this.setState({
                cities: res.data.data
            })
            console.log('cities');
            console.log(this.state.cities);

        }).catch((err) => {
            console.log(err)

        })
    }
    //update state variable
    setStartDate(date) {
        var date1 = this.convert(date)
        console.log(date1)
        this.setState({
            startDate: date
        })
        this.setState({
            startDateFormatted: date1
        })
        console.log("hi")
        console.log(this.state.startDate)
    }
    setEndDate(date) {
        var date1 = this.convert(date)
        this.setState({
            endDate: date
        })
        this.setState({
            endDateFormatted: date1
        })
        console.log("hi")
        console.log(this.state.endDate)
    }
    convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    setStartTime = (event) => {
        this.setState({
            startTime: event.target.value
        })
    }
    setEndTime = (event) => {
        this.setState({
            endTime: event.target.value
        })
    }
    changeStatus = (event) => {
        this.setState({
            city_name: event.target.value
        })
    }
    slider = (
        <AwesomeSlider
            media={[
                {
                    source: '/frontend/assets/img/slide/1.jpg',
                },
                {
                    source: '/frontend/assets/img/slide/2.jpg',
                },
                {
                    source: '/frontend/assets/img/slide/3.jpg',
                },
            ]}
        />
    );
    //search car form validation
    searchCar = () => {
        //get current time
        var now = new Date();
        var currentHourMinute = now.getHours() + ":" + now.getMinutes();
        var currentTimeData = this.toMinutes(currentHourMinute)

        // alert(currentHourMinute)
        // alert(currentTimeData)

        var startTimeData = this.toMinutes(this.state.startTime);
        //alert(startTimeData)

        var inputStartDate = new Date(this.convert(this.state.startDate));
        var inputEndDate = new Date(this.convert(this.state.endDate));

        var errorCount = 0;
        if (this.state.city_name == "") {
            errorCount++;
            this.props.alert.show("Please select city")
        }
        else if (this.state.startDate == null) {
            errorCount++;
            this.props.alert.show("Please enter start date")
        }
        else if (this.state.endDate == null) {
            errorCount++;
            this.props.alert.show("Please enter end date")
        }
        else if (this.state.startTime == "") {
            errorCount++;
            this.props.alert.show("Please select start time")
        }
        else if (this.state.endTime == "") {
            errorCount++;
            this.props.alert.show("Please select end time")
        }
        //check start date and end date
        else if (inputStartDate > inputEndDate) {
            errorCount++;
            this.props.alert.show("startdate should not greater than enddate")
        }
        else if (inputStartDate.getTime() == inputEndDate.getTime() && parseInt(this.toMinutes(this.state.startTime)) >= parseInt(this.toMinutes(this.state.endTime))) {
            errorCount++;
            this.props.alert.show("startdatetime must be less than enddatetime")
        }
        else if (inputStartDate.toDateString() == new Date().toDateString() && startTimeData <= currentTimeData) {
            errorCount++;
            this.props.alert.show("Pick up time must be in the future")
        }

        if (errorCount == 0) {
            setTimeout(() =>
                this.setState({
                    redirect: true
                })
                , 1000)
        }
    }
    //convert time into minutes
    toMinutes(time) {
        var b = time.split(':');
        return b[0] * 60 + +b[1];
    }
    render() {
        if (this.state.redirect) {

            return <Redirect to={{
                pathname: '/listcar/',
                search_data: { city: this.state.city_name, startdate: this.state.startDate, starttime: this.state.startTime, enddate: this.state.endDate, endtime: this.state.endTime }
            }} />;
        }
        return (
            <>

                <div class="cardts">
                    <LoadingOverlay
                        active={this.state.isActive}
                        spinner
                        text='Loading content. Please wait...'
                    >
                        <div >
                            {this.slider}
                        </div>

                        <main id="main">



                            <div class="container table-responsive">
                                <fieldset class="hmserchfieldset">

                                    <legend class="lgndhd">Find the right car for you  </legend>
                                    <table class="table srchtable table-bordered" cellPadding="4" cellSpacing="4">
                                        <thead>
                                            <tr>
                                                <th>City</th>
                                                <th>Start Date</th>
                                                <th>Start Time</th>
                                                <th>End Date</th>
                                                <th >End Time</th>

                                            </tr>
                                        </thead>

                                        <tbody>

                                            <tr>
                                                <td>

                                                    <select name="city_name" id="city_name" onChange={this.changeStatus}>
                                                        <option value="">--Select City---</option>
                                                        {
                                                            this.state.cities.map((elem, index) => {

                                                                return <option>{elem.city_name}</option>

                                                            })
                                                        }
                                                    </select>

                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} name="startDate" minDate={moment().toDate()} />


                                                </td>
                                                <td>
                                                    <select name="startTime" onChange={this.setStartTime}>
                                                        <option value="">Select</option>
                                                        <option value="00:00">00:00</option>
                                                        <option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>

                                                </td>
                                                <td>
                                                    <DatePicker selected={this.state.endDate} onChange={(date) => this.setEndDate(date)} name="endDate" minDate={moment().toDate()} />
                                                </td>
                                                <td>
                                                    <select name="endTime" onChange={this.setEndTime}>
                                                        <option value="">Select</option>
                                                        <option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>
                                                </td>
                                                <td class="srchtr">

                                                    <button style={{ 'margin-top': '18px' }} class="btn btn-primary srchbt btn-sm" onClick={this.searchCar}>SEARCH CAR</button >
                                                    {/* <Link class="btn btn-primary srchbt" style={{ 'margin-top': '18px' }} to={{ pathname: '/listcar/', search_data: { city: this.state.city_name, startdate: this.state.startDate, starttime: this.state.startTime, enddate: this.state.endDate, endtime: this.state.endTime } }} >Search</Link> */}


                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>

                                </fieldset>
                            </div>

                            <section id="services" class="services section-bg">
                                <div class="container"  >

                                    <div class="row">
                                        {
                                            this.state.carsInfo.map((elem, index) => {
                                                var imageurl = serverBaseUrl + 'cars/1/' + elem.car_image
                                                return <div class="col-lg-4 col-md-6 d-flex align-items-stretch homecar" >
                                                    <div class="icon-box iconbox-blue">
                                                        <div class="entry-img">
                                                            <img src={imageurl} alt="" class="img-fluid hmimgcss" />
                                                        </div>
                                                        <h4>{elem.car_name}</h4>
                                                        <div class="entry-content">
                                                            <div class="entry-meta">
                                                                <ul class="icnslstcar hmcdul">
                                                                    <li class="d-flex align-items-center ">

                                                                        <i class="fa fa-wheelchair"></i>
                                                                        {elem.no_of_seats} seats

                                                                    </li>

                                                                    <li class="d-flex align-items-center">

                                                                        <i class="fa fa-crosshairs"></i> {elem.is_ac ? 'Air Conditioning' : 'Non Air Conditioning'}

                                                                    </li>

                                                                    <li class="d-flex align-items-center">

                                                                        <i class="fa fa-bolt"></i>
                                                                        {elem.is_manual ? 'Manual' : 'Automatic'}

                                                                    </li>




                                                                </ul>
                                                            </div>
                                                            <br />
                                                            <p>
                                                                <spna class="prctxt">
                                                                    Price for 1 hour
                                                                </spna> <span class="prch">₹{elem.price_per_hour}</span>
                                                            </p>
                                                            <div class="read-more homerdmr btn btn-primary bknw">
                                                                <Link to={"/car-details/" + elem.id}> Book Now</Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }



                                    </div>

                                </div>
                            </section>




                            <section id="clients" class="clients">
                                <div class="container" >
                                    <div class="section-title">
                                        <h4>Connecting you to the biggest brands in car rental</h4>
                                    </div>
                                    <div class="row no-gutters clients-wrap clearfix" >

                                        <div class="col-lg-4 col-md-4 col-6">
                                            <div class="client-logo">
                                                <img src="/frontend/assets/home/1.png" class="img-fluid" alt="" />
                                                Flexible rentals :
                                                Cancel or change most bookings for free up to 48 hours before pick-up
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-6">
                                            <div class="client-logo">
                                                <img src="/frontend/assets/home/2.png" class="img-fluid" alt="" />
                                                No hidden fees :
                                                Know exactly what you’re paying
                                            </div>
                                        </div>

                                        <div class="col-lg-4 col-md-4 col-6">
                                            <div class="client-logo">
                                                <img src="/frontend/assets/home/3.png" class="img-fluid" alt="" />
                                                Price Match Guarantee :
                                                Found the same deal for less? We’ll match the price.
                                            </div>
                                        </div>



                                    </div>
                                </div>
                            </section>






                        </main>
                    </LoadingOverlay>
                </div>
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />

            </>
        )
    }
}
export default withAlert()(HomeComponent)