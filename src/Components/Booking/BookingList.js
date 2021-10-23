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
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
class BookingList extends React.Component {
    constructor(props) {
        super(props);
        //declare state variables
        this.state = {
            bookingInfo: [],
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
            searchData: '',
            isActive: true,
            carId: 0

        }
        this.updateBookingStatus.bind(this)
    }
    config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }
    //component finishes loading
    componentDidMount() {
        setTimeout(() => this.setState({ isActive: false }), 1000)
        console.log('Component Did MOUNT!')
    }
    componentWillMount() {

        axios.post("http://localhost:3000/carbooklist", {

        }, this.config).then((res) => {

            console.log(res);
            this.setState({
                bookingInfo: res.data.data
            })

        }).catch((err) => {

            console.log('err.message');
            console.log(err.response);

            if (typeof err.response != "undefined") {

                var msg = err.response.data.error ? err.response.data.error : err.response.data.message;
                //toaster for error
                //toastError(msg);
            }

        })
    }
    getPageHeading() {
        if (localStorage.getItem("usrtype") == 2) {
            var pageTitle = 'User Booking';
        } else {
            var pageTitle = 'My Booking';
        }
        return pageTitle;
    }
    config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }
    //############update booking status##############
    updateBookingStatus(status, carId) {

        axios.post("http://localhost:3000/updateBookingStatus", {
            booking_status: status,
            carId: carId,

        }, this.config).then((res) => {
            console.log(res);

            //toaster for success
            toastSuccess("Booking status updated successfully")
            //this.resetInputFields()


        }).catch((err) => {
            if (typeof err.response != "undefined") {
                console.log(err.response);
                this.setState({
                    error_msg: "Some error has been occurred. " + err.response.data.error

                })
                var msg = err.response.data.error;
                //toaster for error
                toastError(msg);
            }

        })
    }
    //##################################
    render() {


        return (
            <>
                <div class="cardts">
                    {ToastContainerInfo()}
                    <LoadingOverlay
                        active={this.state.isActive}
                        spinner
                        text='Loading content. Please wait...'>

                        <section id="blog" class="blog">
                            <div class="container" >
                                <h3 class="hdlg" id="hdng">
                                    {this.getPageHeading()}


                                </h3 >
                                {
                                    this.state.bookingInfo.map((elem, index) => {
                                        var imageurl = 'http://localhost:3000/cars/1/' + elem.car_details[0].car_image
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

                                                            <div class="entry-content">
                                                                <p >
                                                                    <i class="fa fa-user-circle-o"></i>
                                                                    <span class="boksp3"> {elem.user_name} </span>
                                                                    <i class="fa fa-mobile-phone"></i>
                                                                    <span class="boksp3"> {elem.user_phone}  </span>
                                                                    <i class="fa fa-mail-forward"></i>
                                                                    <span class="boksp3"> {elem.user_email}</span>
                                                                </p>
                                                                <p>
                                                                    <span class="boksp1">Start date time:</span>
                                                                    <span class="boksp2"> {elem.start_date} {elem.start_time} </span> ,

                                                                    <span class="boksp1"> End date time:</span>
                                                                    <span class="boksp2"> {elem.end_date} {elem.end_time} </span>
                                                                </p>

                                                                <p>
                                                                    <span class="boksp1">Pickup location:</span>
                                                                    <span class="boksp2"> {elem.pickup_location}  </span>
                                                                    <span class="boksp1">, Dropoff location:</span>
                                                                    <span class="boksp2"> {elem.dropoff_location}  </span>
                                                                </p>
                                                                <p>

                                                                </p>

                                                            </div>


                                                            <div class="entry-content">
                                                                <p>
                                                                    <spna class="prctxt">
                                                                        Price for 1 hour
                                                                    </spna> <span class="prch">₹{elem.car_price_per_hour.toLocaleString()}</span>

                                                                    <spna class="prctxt">
                                                                        , Total Price
                                                                    </spna> <span class="prch">₹{elem.total_price.toLocaleString()}</span>
                                                                </p>


                                                            </div>
                                                            <div class="entry-content">
                                                                <label class="carlbl bokklbl">Booking Status: </label>
                                                                <p>

                                                                    <select onChange={(event) => this.updateBookingStatus(event.target.value, elem.id)}
                                                                        className={"form-control" + " " + "bookstsdrp " + (localStorage.getItem("usrtype") == 2 ? 'hiddenbksts' : 'showbksts')}
                                                                    >
                                                                        {

                                                                            (elem.booking_status == 0) ?
                                                                                <option value="0" selected="true">InProgress</option>
                                                                                :
                                                                                <option value="0" >InProgress</option>
                                                                        }
                                                                        {
                                                                            (elem.booking_status == 1) ?
                                                                                <option value="1" selected="true">Completed</option>

                                                                                :
                                                                                <option value="1" >Completed</option>
                                                                        }
                                                                        {
                                                                            (elem.booking_status == 2) ?
                                                                                <option value="2" selected="true">Cancelled</option>

                                                                                :
                                                                                <option value="2" >Cancelled</option>



                                                                        }
                                                                    </select>

                                                                </p></div>

                                                        </div>

                                                    </div>

                                                </article>

                                            </div>

                                        </div>

                                    })
                                }
                                <h4>{this.state.bookingInfo.length == 0 ? 'No Record Found' : ''}</h4>

                            </div>
                        </section>
                    </LoadingOverlay>
                </div>
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />
            </>
        )
    }
}
export default BookingList