import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import HeaderComponent from '../includes/HeaderComponent';
import LoadingOverlay from 'react-loading-overlay'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
class ListCar extends React.Component {
    constructor(props) {
        super(props);
        //declare state variables
        this.state = {
            carsInfo: [],
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
            searchData: '',
            isActive: true

        }

    }
    //component finishes loading
    componentDidMount() {
        setTimeout(() => this.setState({ isActive: false }), 1000)
        console.log('Component Did MOUNT!')
    }
    componentWillMount() {

        console.log('Component Will MOUNT!')
        console.log(this.props.location.search_data)
        if (this.props.location.search_data != "") {
            this.setState({
                searchData: this.props.location.search_data
            })
        }

        //call api
        axios.post("http://localhost:3000/listcar", {
            search_data: this.props.location.search_data
        }
        ).then((res) => {
            console.log(res.data.data.car_details);
            this.setState({
                carsInfo: res.data.data.car_details
            })


        }).catch((err) => {
            console.log(err)

        })
    }

    render() {


        return (
            <>

                <div class="cardts">
                    <LoadingOverlay
                        active={this.state.isActive}
                        spinner
                        text='Loading content. Please wait...'>


                        <section id="blog" class="blog">
                            <div class="container" >
                                <h3 id="hdng" class=" hdlg col-lg-12 entries" >Car Price List </h3>
                                {
                                    this.state.carsInfo.map((elem, index) => {
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
                                                                    </spna> <span class="prch">₹{elem.price_per_hour.toLocaleString()}</span>
                                                                </p>
                                                                <div class="boknwbut" >
                                                                    {/* <Link to={"/car-details/" + elem.id + "?" + this.state.getParam}> Book Now</Link> */}

                                                                    <Link class="btn btn-primary boknwbut btn-sm" to={{ pathname: '/car-details/' + elem.id, search_data: this.state.searchData }} >BOOK NOW</Link>

                                                                    {
                                                                        (this.state.usrtype == 2) ? <Link class="updwbut btn btn-success btn-sm" to={{ pathname: '/car-update/' + elem.id }} >UPDATE CAR</Link> : ''
                                                                    }

                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>




                                                </article>


                                            </div>



                                        </div>

                                    })
                                }

                            </div>
                        </section>
                    </LoadingOverlay>
                </div >
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />

            </>
        )
    }
}
export default ListCar