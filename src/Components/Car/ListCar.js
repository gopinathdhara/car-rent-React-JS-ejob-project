import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import HeaderComponent from '../includes/HeaderComponent';
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
            searchData: ''

        }

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
        axios.get("http://localhost:3000/listcar").then((res) => {
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
                <div id="hdng">
                    <h3 class="hdlg">Car Price List </h3>
                    <section id="blog" class="blog">
                        <div class="container" >
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
                                                                </spna> <span class="prch">₹{elem.price_per_hour}</span>
                                                            </p>
                                                            <div class="btn btn-primary boknwbut" >
                                                                {/* <Link to={"/car-details/" + elem.id + "?" + this.state.getParam}> Book Now</Link> */}
                                                                <Link class="btn btn-primary boknwbut" to={{ pathname: '/car-details/' + elem.id, search_data: this.state.searchData }} >Book Now</Link>

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

                </div>
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />
            </>
        )
    }
}
export default ListCar