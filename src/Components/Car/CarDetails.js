import React, { useState, useEffect } from 'react'
import axios from 'axios';
import HeaderComponent from '../includes/HeaderComponent';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { useAlert } from 'react-alert'
import LoadingOverlay from 'react-loading-overlay'
import { serverBaseUrl } from '../Common/Utils'
import moment from 'moment'

const CarDetails = (props) => {

    const alert = useAlert()
    const [id, setId] = useState(props.match.params.id)
    const [carsInfo, setCarsInfo] = useState([])
    const [usrid, setUsridId] = useState(localStorage.getItem("usrid"))
    const [usrtype, setUsrType] = useState(localStorage.getItem("usrtype"))

    //booking details
    const [cityName, setCityName] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [startDateError, setStartDateError] = useState("")
    const [endDate, setEndDate] = useState(new Date())
    const [endDateError, setEndDateError] = useState("")
    const [cities, setCities] = useState([])
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [startTimeError, setStartTimeError] = useState("")
    const [endTimeError, setEndTimeError] = useState("")
    const [pickupLocation, setPickupLocation] = useState("")
    const [pickupLocationError, setPickupLocationError] = useState("")
    const [dropoffLocation, setDropoffLocation] = useState("")
    const [dropoffLocationError, setDropoffLocationError] = useState("")
    const [carName, setCarName] = useState()
    const [carNo, setCarNo] = useState()
    const [carPrice, setCarPrice] = useState()

    //user details for booking
    const [userName, setUserName] = useState("")
    const [userNameError, setUserNameError] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userEmailError, setUserEmailError] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [userPhoneError, setUserPhoneError] = useState("")
    const [userAddress, setUserAddress] = useState("")
    const [userAddressError, setUserAddressError] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [redirectLogin, setRedirectLogin] = useState(false)
    const [isActive, setIsActive] = useState(true)

    //useEffect called after render
    useEffect(function () {
        console.log("called after render");
        console.log(props.location.search_data)
        setTimeout(() => setIsActive(false), 1000)

        //update state variable
        var cityName1 = '';
        var startDate1 = new Date();
        var endDate1 = new Date();
        var startTime1 = '';
        var endTime1 = '';
        var userName1 = '';
        var userEmail1 = '';
        var userPhone1 = '';
        var userAddress1 = '';
        var pickupLocation1 = '';
        var dropoffLocation1 = '';

        //props.location.search_data.id = props.match.params.id;

        if (props.location.search_data != undefined) {
            cityName1 = props.location.search_data.city;
            startDate1 = props.location.search_data.startdate;
            endDate1 = props.location.search_data.enddate;
            startTime1 = props.location.search_data.starttime;
            endTime1 = props.location.search_data.endtime;

            userName1 = props.location.search_data.userName;
            userEmail1 = props.location.search_data.userEmail;
            userPhone1 = props.location.search_data.userPhone;
            userAddress1 = props.location.search_data.userAddress;
            pickupLocation1 = props.location.search_data.pickupLocation;
            dropoffLocation1 = props.location.search_data.dropoffLocation;
            //console.log('pickupLocation1');
            //console.log(pickupLocation1);
            setCityName(cityName1)
            setStartDate(startDate1)
            setEndDate(endDate1)
            setStartTime(startTime1)
            setEndTime(endTime1)

            setUserName(userName1)
            setUserEmail(userEmail1)
            setUserPhone(userPhone1)
            setUserAddress(userAddress1)
            setPickupLocation(pickupLocation1)
            setDropoffLocation(dropoffLocation1)


        } else {

        }

        //get profile details
        if (localStorage.getItem("usrid") != "" && localStorage.getItem("usrid") != undefined) {

            axios.post(serverBaseUrl + "myprofile", {}, config).then((res) => {
                console.log(res.data.data);
                console.log('userName')
                console.log(userName)
                if (props.location.search_data != undefined) {
                    if (props.location.search_data.userName == "") {
                        setUserName(res.data.data[0].name)
                    }
                    if (props.location.search_data.userEmail == "") {
                        setUserEmail(res.data.data[0].email)
                    }
                    if (props.location.search_data.userPhone == "") {
                        setUserPhone(res.data.data[0].phone)
                    }
                    if (props.location.search_data.userAddress == "") {
                        setUserAddress(res.data.data[0].address)
                    }
                } else {
                    setUserName(res.data.data[0].name)
                    setUserEmail(res.data.data[0].email)
                    setUserPhone(res.data.data[0].phone)
                    setUserAddress(res.data.data[0].address)
                }

            }).catch((err) => {

                console.log('err.message');
                console.log(err.response);

                if (typeof err.response != "undefined") {

                    var msg = err.response.data.error ? err.response.data.error : err.response.data.message;

                    //toaster for error
                    toastError(msg);
                }

            })
        }

        //call api for car details
        axios.post(serverBaseUrl + "listcar?carId=" + id).then((res) => {
            console.log(res.data.data.car_details);
            setCarsInfo(res.data.data.car_details)
            setCityName(res.data.data.car_details[0].city_name)
            setCarName(res.data.data.car_details[0].car_name)
            setCarNo(res.data.data.car_details[0].car_no)
            setCarPrice(res.data.data.car_details[0].price_per_hour)
        }).catch((err) => {
            console.log(err)

        })
        //call api get list of cities
        axios.get(serverBaseUrl + "listcity").then((res) => {
            console.log(res.data.data);
            setCities(res.data.data)

            //console.log('cities');
            //console.log(this.state.cities);

        }).catch((err) => {
            console.log(err)

        })



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
        if (localStorage.getItem("usrid") == undefined || localStorage.getItem("usrid") == "") {
            //alert("please login to book car");
            alert.show('please login to book car!')
            setTimeout(() => setRedirectLogin({ redirectLogin: true }), 1000)
        } else {
            //form validation
            var errorCount = 0;
            var rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var rgx1 = /^[0-9]{10}$/;
            var now = new Date();
            //console.log('pickupLocatio11n')
            // console.log(pickupLocation)

            //get current time
            var now = new Date();
            var currentHourMinute = now.getHours() + ":" + now.getMinutes();
            var currentTimeData = toMinutes(currentHourMinute)
            var startTimeData = toMinutes(startTime);
            console.log(startTime)
            var inputStartDate = new Date(convert(startDate));
            var inputEndDate = new Date(convert(endDate));

            if (userName == "") {
                errorCount++;
                setUserNameError("Please provide name")

            } else {
                setUserNameError("")
            }
            if (userEmail == "") {
                errorCount++;
                setUserEmailError("Please provide email")
            }
            else {
                var res2 = rgx.test(userEmail);
                if (res2 === false) {
                    errorCount++;
                    setUserEmailError("Please provide valid email")
                } else {
                    setUserEmailError("")
                }
            }
            if (userPhone == "") {
                errorCount++;
                setUserPhoneError("Please provide phone no")

            } else {

                var res2 = rgx1.test(userPhone);
                if (res2 === false) {
                    errorCount++;
                    setUserPhoneError("Please provide valid phone no")
                } else {
                    setUserPhoneError("")
                }
            }
            if (userAddress == "") {
                errorCount++;
                setUserAddressError("Please provide address")

            } else {
                setUserAddressError("")
            }
            if (startDate == null) {
                errorCount++;
                setStartDateError("Please provide start date")

            } else {
                //check start date and end date
                if (inputStartDate > inputEndDate) {
                    errorCount++;
                    setStartDateError("Startdate should not greater than enddate")

                }
                else {
                    if (inputStartDate.getTime() == inputEndDate.getTime() && parseInt(toMinutes(startTime)) >= parseInt(toMinutes(endTime))) {
                        errorCount++;
                        setStartDateError("Startdatetime must be less than enddatetime")
                    }
                    else {
                        setStartDateError("")
                    }
                }
            }
            if (endDate == null) {
                errorCount++;
                setEndDateError("Please provide end date")

            } else {
                setEndDateError("")
            }
            if (startTime == "") {
                errorCount++;
                setStartTimeError("Please select start time")
            }
            else {
                if (inputStartDate.toDateString() == new Date().toDateString() && startTimeData <= currentTimeData) {
                    errorCount++;
                    setStartTimeError("Pick up time must be in the future")
                }
                else {
                    setStartTimeError("")
                }
            }
            if (endTime == "") {
                errorCount++;
                setEndTimeError("Please select end time")
            }
            else {
                setEndTimeError("")
            }

            if (pickupLocation == "" || pickupLocation == undefined) {
                errorCount++;
                setPickupLocationError("Please provide pick up location")

            } else {
                setPickupLocationError("")
            }
            if (dropoffLocation == "" || dropoffLocation == undefined) {
                errorCount++;
                setDropoffLocationError("Please provide drop off location")

            } else {
                setDropoffLocationError("")
            }

            //call insert api
            if (errorCount == 0) {
                //calculate total price
                var startDtTime = convert(startDate) + " " + startTime;
                var endDtTime = convert(endDate) + " " + endTime;
                var date1 = new Date(startDtTime);
                var date2 = new Date(endDtTime);
                var difference = Math.abs(date1.getTime() - date2.getTime());
                var hourDifference = difference / 1000 / 3600;
                var total_price = parseFloat(hourDifference) * parseFloat(carPrice);

                axios.post(serverBaseUrl + "carbook", {
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
                    car_price_per_hour: carPrice,
                    total_price: total_price

                }, config).then((res) => {

                    console.log(res);
                    // this.setState({
                    //     success_msg: "Car booked successfully."
                    // })
                    //toaster for success
                    toastSuccess("Car booked successfully")
                    //this.resetInputFields()
                    setTimeout(() => setRedirect({ redirect: true }), 1000)

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
        }


    }

    if (redirect) {
        return <Redirect to="/my-booking" />
    }
    if (redirectLogin) {
        var searchData = {};
        if (props.location.search_data != undefined) {
            searchData = props.location.search_data;
            searchData.userName = userName ? userName : ''
            searchData.userEmail = userEmail ? userEmail : ''
            searchData.userPhone = userPhone ? userPhone : ''
            searchData.userAddress = userAddress ? userAddress : ''
            searchData.pickupLocation = pickupLocation ? pickupLocation : ''
            searchData.dropoffLocation = dropoffLocation ? dropoffLocation : ''
            searchData.id = props.match.params.id;
        } else {
            searchData.id = props.match.params.id;
        }
        return <Redirect to={{
            pathname: '/login',
            search_data: searchData
        }}
        />
    }
    //convert time into minutes
    const toMinutes = (time) => {
        var b = time.split(':');
        return b[0] * 60 + +b[1];
    }
    return (
        <>

            {ToastContainerInfo()}

            <div class="cardts">
                <LoadingOverlay
                    active={isActive}
                    spinner
                    text='Loading content. Please wait...'
                >

                    <section id="blog" class="blog">
                        <div class="container" >
                            <h3 class="hdlg" id="hdng">Car Details </h3>
                            {
                                carsInfo.map((elem, index) => {
                                    var imageurl = serverBaseUrl + 'cars/1/' + elem.car_image;
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
                                                                </spna> <span class="prch">???{elem.price_per_hour.toLocaleString()}</span>
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
                                                                        <input type="text" class="form-control" name="userName" id="userName" onChange={changeStatus} placeholder="Name" value={userName} />
                                                                        <p class="valdtncls">{userNameError}</p>
                                                                    </div>
                                                                    <div class="col-md-6 form-group">
                                                                        <input class="form-control" type="text" name="userEmail" id="userEmail" onChange={changeStatus} placeholder="Email" value={userEmail} />
                                                                        <p class="valdtncls">{userEmailError}</p>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6 form-group">
                                                                        <input type="text" class="form-control" name="userPhone" id="userPhone" onChange={changeStatus} placeholder="Phone No" value={userPhone} />
                                                                        <p class="valdtncls">{userPhoneError}</p>
                                                                    </div>
                                                                    <div class="col-md-6 form-group">
                                                                        <textarea class="form-control" type="text" name="userAddress" id="userAddress" onChange={changeStatus} placeholder="Address" rows="4" value={userAddress}></textarea>
                                                                        <p class="valdtncls">{userAddressError}</p>
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
                                                                            name="startDate" class="form-control" autoComplete="off" title="Start Date" minDate={moment().toDate()} />
                                                                        <p class="valdtncls">{startDateError}</p>
                                                                    </div>
                                                                    <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                        <select value={startTime} name="startTime" onChange={changeStatus}>
                                                                            <option value="">Select</option>
                                                                            <option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>
                                                                        <p class="valdtncls">{startTimeError}</p>
                                                                    </div>
                                                                </div>

                                                                <div class="row">
                                                                    <div class="col-md-6 form-group">
                                                                        <DatePicker selected={endDate} onChange={setEndDate}
                                                                            name="endDate" autoComplete="off" minDate={moment().toDate()} />
                                                                        <p class="valdtncls">{endDateError}</p>
                                                                    </div>
                                                                    <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                        <select name="endTime" value={endTime} onChange={changeStatus}>
                                                                            <option value="">Select</option>
                                                                            <option value="00:00">00:00</option><option value="00:30">00:30</option><option value="01:00">01:00</option><option value="01:30">01:30</option><option value="02:00">02:00</option><option value="02:30">02:30</option><option value="03:00">03:00</option><option value="03:30">03:30</option><option value="04:00">04:00</option><option value="04:30">04:30</option><option value="05:00">05:00</option><option value="05:30">05:30</option><option value="06:00">06:00</option><option value="06:30">06:30</option><option value="07:00">07:00</option><option value="07:30">07:30</option><option value="08:00">08:00</option><option value="08:30">08:30</option><option value="09:00">09:00</option><option value="09:30">09:30</option><option value="10:00">10:00</option><option value="10:30">10:30</option><option value="11:00">11:00</option><option value="11:30">11:30</option><option value="12:00">12:00</option><option value="12:30">12:30</option><option value="13:00">13:00</option><option value="13:30">13:30</option><option value="14:00">14:00</option><option value="14:30">14:30</option><option value="15:00">15:00</option><option value="15:30">15:30</option><option value="16:00">16:00</option><option value="16:30">16:30</option><option value="17:00">17:00</option><option value="17:30">17:30</option><option value="18:00">18:00</option><option value="18:30">18:30</option><option value="19:00">19:00</option><option value="19:30">19:30</option><option value="20:00">20:00</option><option value="20:30">20:30</option><option value="21:00">21:00</option><option value="21:30">21:30</option><option value="22:00">22:00</option><option value="22:30">22:30</option><option value="23:00">23:00</option><option value="23:30">23:30</option></select>
                                                                        <p class="valdtncls">{endTimeError}</p>
                                                                    </div>
                                                                </div>


                                                                <div class="row">
                                                                    <div class="col-md-6 form-group">
                                                                        <textarea rows="4" cols="47" placeholder="Pickup Location" class="form-control" name="pickupLocation" onChange={changeStatus} value={pickupLocation}>

                                                                        </textarea>
                                                                        <p class="valdtncls">{pickupLocationError}</p>
                                                                    </div>
                                                                    <div class="col-md-6 form-group mt-3 mt-md-0">
                                                                        <textarea rows="4" cols="47" placeholder="Drop Car Off  Location" class="form-control" name="dropoffLocation" onChange={changeStatus} value={dropoffLocation}>

                                                                        </textarea>
                                                                        <p class="valdtncls">{dropoffLocationError}</p>
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
                </LoadingOverlay>
            </div>
            <HeaderComponent idParam={usrid} userTypeParam={usrtype} />

        </>
    )

}
export default CarDetails