import React, { useState, useEffect } from 'react'
import axios from 'axios';
import HeaderComponent from '../includes/HeaderComponent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'

const CarDetails = (props) => {


    const [id, setId] = useState(props.match.params.id)
    const [carsInfo, setCarsInfo] = useState([])
    const [usrid, setUsridId] = useState(localStorage.getItem("usrid"))
    const [usrtype, setUsrType] = useState(localStorage.getItem("usrtype"))

    //booking details
    const [cityName, setCityName] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [cities, setCities] = useState([])
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [pickupLocation, setPickupLocation] = useState()
    const [dropoffLocation, setDropoffLocation] = useState()
    const [carName, setCarName] = useState()
    const [carNo, setCarNo] = useState()

    //user details for booking
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPhone, setUserPhone] = useState()
    const [userAddress, setUserAddress] = useState()

    //useEffect called after render
    useEffect(function () {
        console.log("called after render");
        console.log(props.location.search_data)

        //call api for car details
        axios.get("http://localhost:3000/listcar?carId=" + id).then((res) => {
            console.log(res.data.data.car_details);
            setCarsInfo(res.data.data.car_details)
            setCityName(res.data.data.car_details[0].city_name)
            setCarName(res.data.data.car_details[0].car_name)
            setCarNo(res.data.data.car_details[0].car_no)
        }).catch((err) => {
            console.log(err)

        })
        //call api get list of cities
        axios.get("http://localhost:3000/listcity").then((res) => {
            console.log(res.data.data);
            setCities(res.data.data)

            console.log('cities');
            console.log(this.state.cities);

        }).catch((err) => {
            console.log(err)

        })

        //update state variable
        var cityName1 = '';
        var startDate1 = new Date();
        var endDate1 = new Date();
        var startTime1 = '';
        var endTime1 = '';
        if (props.location.search_data != undefined) {
            cityName1 = props.location.search_data.city;
            startDate1 = props.location.search_data.startdate;
            endDate1 = props.location.search_data.enddate;
            startTime1 = props.location.search_data.starttime;
            endTime1 = props.location.search_data.endtime;
            setCityName(cityName1)
            setStartDate(startDate1)
            setEndDate(endDate1)
            setStartTime(startTime1)
            setEndTime(endTime1)

        } else {

        }

    }, []);

    //for editor html show
    const createMarkup = (content) => {
        return { __html: content };
    }

    //update state variable
    const changeStatus = (event) => {
        //user details for booking
        if (event.target.name == "userName") {
            setUserName(event.target.value)
        }
        if (event.target.name == "userEmail") {
            setUserEmail(event.target.value)
        }
        if (event.target.name == "userPhone") {
            setUserPhone(event.target.value)
        }
        if (event.target.name == "userAddress") {
            setUserAddress(event.target.value)
        }
        //booking details
        if (event.target.name == "cityName") {
            setCityName(event.target.value)
        }
        if (event.target.name == "startTime") {
            setStartTime(event.target.value)
        }
        if (event.target.name == "endTime") {
            setEndTime(event.target.value)
        }
        if (event.target.name == "pickupLocation") {
            setPickupLocation(event.target.value)
        }
        if (event.target.name == "dropoffLocation") {
            setDropoffLocation(event.target.value)
        }
    }

    const convert = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    var config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }
    //call api for car book
    const bookNowCar = () => {
        //call insert api
        axios.post("http://localhost:3000/carbook", {
            car_id: id,
            user_name: userName,
            user_email: userEmail,
            user_phone: userPhone,
            user_address: userAddress,
            car_city: cityName,
            car_name: carName,
            car_no: carNo,
            start_date: convert(startDate),
            end_date: convert(endDate),
            start_time: startTime,
            end_time: endTime,
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
        }, config).then((res) => {

            console.log(res);
            // this.setState({
            //     success_msg: "Car booked successfully."
            // })
            //toaster for success
            toastSuccess("Car booked successfully")
            //this.resetInputFields()
            //setTimeout(() => this.setState({ redirect: true }), 2000)

        }).catch((err) => {

            console.log('err.message');
            console.log(err.response);

            if (typeof err.response != "undefined") {

                // this.setState({
                //     error_msg: err.response.data.error ? "Some error has been occurred. " + err.response.data.error : err.response.data.message

                // })

                var msg = err.response.data.error ? err.response.data.error : err.response.data.message;

                //toaster for error
                toastError(msg);
            }

        })
    }

    return (
        <>
            {ToastContainerInfo()}
            <div id="hdng">
                <h3 class="hdlg">Car Details </h3>
                <section id="blog" class="blog">
                    <div class="container" >
                        {
                            carsInfo.map((elem, index) => {
                                var imageurl = 'http://localhost:3000/cars/1/' + elem.car_image
                                return <div class="row">

                                    <div class="col-lg-12 entries">

                                        <article class="entry">
                                            <div class="row">
                                                <div class="col-sm-4" >
                                                    <div class="entry-img">
                                                        <img src={imageurl} alt="" class="img-fluid" />
                                                    </div>
                                                </div>
                                                <div class="col-sm-7 margcssdv" >
                                                    <h2 class="entry-title carnam">
                                                        {elem.car_name}
                                                    </h2>
                                                    <h6 class="carnum">
                                                        <span>Car No:</span>  {elem.car_no}
                                                    </h6>

                                                    <div class="entry-meta">
                                                        <ul class="icnslstcar">
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

                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-shopping-bag"></i>
                                                                {elem.no_of_large_bags} Large bags

                                                            </li>

                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-suitcase"></i>

                                                                {elem.no_of_small_bags} Small bags

                                                            </li>

                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-support"></i>

                                                                {elem.mileage}

                                                            </li>

                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-battery-4"></i>

                                                                Fuel Type: {elem.fuel_type}, Capacity: {elem.fuel_tank_capacity}

                                                            </li>
                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-location-arrow"></i>

                                                                City: {elem.city_name}

                                                            </li>
                                                            <li class="d-flex align-items-center">

                                                                <i class="fa fa-cab"></i>

                                                                Brand: {elem.brand_name}

                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <div class="entry-content">
                                                        <p>
                                                            <spna class="prctxt">
                                                                Price for 1 hour
                                                            </spna> <span class="prch">₹{elem.price_per_hour}</span>
                                                        </p>

                                                    </div>
                                                    <hr />
                                                    <h4 class="dtls_1">Important Details</h4>
                                                    <div class="entry-content desceditor">

                                                        <div dangerouslySetInnerHTML={createMarkup(elem.important_details)} className='editor'></div>

                                                    </div>
                                                    <hr />
                                                    <h4 class="dtls_1">Other Details</h4>
                                                    <div class="entry-content desceditor">

                                                        <div dangerouslySetInnerHTML={createMarkup(elem.other_details)} className='editor'></div>

                                                    </div>
                                                </div>

                                            </div>

                                        </article>

                                        <section id="contact" class="contact bookingform entry">
                                            <div class="container" >

                                                <fieldset>

                                                    <legend >BOOKING DETAILS </legend>
                                                    <div class="row mt-5 justify-content-center">
                                                        <div class="col-lg-10">
                                                            <div class="row">
                                                                <div class="col-md-6 form-group">
                                                                    <input type="text" class="form-control" name="userName" id="userName" onChange={changeStatus} placeholder="Name" />

                                                                </div>
                                                                <div class="col-md-6 form-group">
                                                                    <input class="form-control" type="text" name="userEmail" id="userEmail" onChange={changeStatus} placeholder="Email" />

                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 form-group">
                                                                    <input type="text" class="form-control" name="userPhone" id="userPhone" onChange={changeStatus} placeholder="Phone No" />

                                                                </div>
                                                                <div class="col-md-6 form-group">
                                                                    <textarea class="form-control" type="text" name="userAddress" id="userAddress" onChange={changeStatus} placeholder="Address" rows="4"></textarea>

                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div class="row">
                                                                <div class="col-md-12 form-group">
                                                                    <input class="form-control" name="cityName" id="cityName" onChange={changeStatus} value={cityName} readonly="readonly" />

                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6 form-group">
                                                                    <DatePicker selected={startDate} onChange={setStartDate}
                                                                        name="startDate" class="form-control" autocomplete="off" title="Start Date" />
                                                                </div>
                                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                    <select value={startTime} name="startTime" onChange={changeStatus}>
                                                                        <option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>
                                                                </div>
                                                            </div>

                                                            <div class="row">
                                                                <div class="col-md-6 form-group">
                                                                    <DatePicker selected={endDate} onChange={setEndDate}
                                                                        name="endDate" autocomplete="off" />
                                                                </div>
                                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                    <select name="endTime" value={endTime} onChange={changeStatus}>
                                                                        <option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>
                                                                </div>
                                                            </div>


                                                            <div class="row">
                                                                <div class="col-md-6 form-group">
                                                                    <textarea rows="4" cols="47" placeholder="Pickup Location" class="form-control" name="pickupLocation" onChange={changeStatus}>

                                                                    </textarea>
                                                                </div>
                                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                    <textarea rows="4" cols="47" placeholder="Drop Car Off  Location" class="form-control" name="dropoffLocation" onChange={changeStatus}>

                                                                    </textarea>
                                                                </div>
                                                            </div>
                                                            <div class="text-center submtbtn" style={{ 'margin-top': '10px' }}><button class="btn btn-success newbut" type="button" onClick={bookNowCar} >Book Now</button></div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </section>
                                    </div>
                                </div>

                            })
                        }

                    </div>
                </section>

            </div>
            <HeaderComponent idParam={usrid} userTypeParam={usrtype} />
        </>
    )

}
export default CarDetails