import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import FileBase64 from 'react-file-base64';
import CKEditor from "react-ckeditor-component";
import HeaderComponent from '../includes/HeaderComponent';
//@ckeditor link : https://github.com/codeslayer1/react-ckeditor
//@base64 converter https://github.com/BosNaufal/react-file-base64

class AddCar extends React.Component {
    constructor(props) {
        super(props);
        //declare state variables
        this.state = {
            car_name: '',
            car_name_error: '',
            car_no: '',
            car_no_error: '',
            no_of_seats: '',
            no_of_seats_error: '',
            is_ac: '',
            is_ac_error: '',
            mileage: '',
            mileage_error: '',
            is_manual: '',
            is_manual_error: '',
            other_details: '',
            other_details_error: '',
            important_details: '',
            important_details_error: '',
            no_of_large_bags: '',
            no_of_large_bags_error: '',
            no_of_small_bags: '',
            no_of_small_bags_error: '',
            price_per_hour: '',
            price_per_hour_error: '',
            car_image: '',
            car_image_error: '',
            fuel_type: '',
            fuel_type_error: '',
            fuel_tank_capacity: '',
            fuel_tank_capacity_error: '',
            redirect: false,
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
            cities: [],
            city_name: '',
            city_name_error: '',
            brand_name: '',
            brand_name_error: ''
        }

        this.changeStatus = this.changeStatus.bind(this);
        this.onChangeOtherDetails = this.onChangeOtherDetails.bind(this);
        this.onChangeImportantDetails = this.onChangeImportantDetails.bind(this);

    }
    config = {
        headers: {
            token: localStorage.getItem("token"),
        }
    }

    //update state files convert image to base64
    getFiles(files) {
        this.setState({ car_image: files })
    }
    //update state
    //ckeditor
    onChangeOtherDetails(evt) {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            other_details: newContent
        })
    }
    onChangeImportantDetails(evt) {
        console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        this.setState({
            important_details: newContent
        })
    }

    changeStatus(event) {
        console.log(this.config.headers.token)
        if (event.target.name === "car_name") {
            this.setState({
                car_name: event.target.value
            })
        }
        if (event.target.name === "car_no") {
            this.setState({
                car_no: event.target.value
            })
        }
        if (event.target.name === "no_of_seats") {
            this.setState({
                no_of_seats: event.target.value
            })
        }
        if (event.target.name === "is_ac") {
            this.setState({
                is_ac: event.target.value
            })
        }
        if (event.target.name === "mileage") {
            this.setState({
                mileage: event.target.value
            })
        }
        if (event.target.name === "is_manual") {
            this.setState({
                is_manual: event.target.value
            })
        }
        // if (event.target.name === "other_details") {
        //     var newContent = event.editor.getData();
        //     this.setState({
        //         other_details: newContent
        //     })
        // }
        // if (event.target.name === "important_details") {
        //     var newContent = event.editor.getData();
        //     this.setState({
        //         important_details: newContent
        //     })

        // }
        if (event.target.name === "no_of_large_bags") {
            this.setState({
                no_of_large_bags: event.target.value
            })
        }
        if (event.target.name === "no_of_small_bags") {
            this.setState({
                no_of_small_bags: event.target.value
            })
        }
        if (event.target.name === "price_per_hour") {
            this.setState({
                price_per_hour: event.target.value
            })
        }
        // if (event.target.name === "car_image") {
        //     this.setState({
        //         car_image: event.target.value
        //     })
        // }
        if (event.target.name === "fuel_type") {
            this.setState({
                fuel_type: event.target.value
            })
        }
        if (event.target.name === "fuel_tank_capacity") {
            this.setState({
                fuel_tank_capacity: event.target.value
            })
        }
        if (event.target.name === "city_name") {
            this.setState({
                city_name: event.target.value
            })
        }
        if (event.target.name === "brand_name") {
            this.setState({
                brand_name: event.target.value
            })
        }
    }
    //form validation
    formSubmitNow = () => {
        console.log(this.state)
        var errorCount = 0;
        if (this.state.city_name == "") {
            errorCount++;
            this.setState({
                city_name_error: "Please provide city name"
            })
        } else {
            this.setState({
                city_name_error: ""
            })
        }
        if (this.state.brand_name == "") {
            errorCount++;
            this.setState({
                brand_name_error: "Please provide brand name"
            })
        } else {
            this.setState({
                brand_name_error: ""
            })
        }
        if (this.state.car_image == "") {
            errorCount++;
            this.setState({
                car_image_error: "Please provide car image"
            })
        } else {
            this.setState({
                car_image_error: ""
            })
        }
        if (this.state.car_name == "") {
            errorCount++;
            this.setState({
                car_name_error: "Please provide car name"
            })
        } else {
            this.setState({
                car_name_error: ""
            })
        }
        if (this.state.car_no == "") {
            errorCount++;
            this.setState({
                car_no_error: "Please provide car no"
            })
        } else {
            this.setState({
                car_no_error: ""
            })
        }
        if (this.state.no_of_seats == "") {
            errorCount++;
            this.setState({
                no_of_seats_error: "Please provide no of seats"
            })
        } else {
            this.setState({
                no_of_seats_error: ""
            })
        }
        if (this.state.is_ac == "") {
            errorCount++;
            this.setState({
                is_ac_error: "Please provide ac or non ac"
            })
        } else {
            this.setState({
                is_ac_error: ""
            })
        }
        if (this.state.is_manual == "") {
            errorCount++;
            this.setState({
                is_manual_error: "Please provide manual or automatic"
            })
        } else {
            this.setState({
                is_manual_error: ""
            })
        }
        if (this.state.mileage == "") {
            errorCount++;
            this.setState({
                mileage_error: "Please provide mileage"
            })
        } else {
            this.setState({
                mileage_error: ""
            })
        }
        if (this.state.other_details == "") {
            errorCount++;
            this.setState({
                other_details_error: "Please provide other details"
            })
        } else {
            this.setState({
                other_details_error: ""
            })
        }
        if (this.state.important_details == "") {
            errorCount++;
            this.setState({
                important_details_error: "Please provide important details"
            })
        } else {
            this.setState({
                important_details_error: ""
            })
        }
        if (this.state.no_of_large_bags == "") {
            errorCount++;
            this.setState({
                no_of_large_bags_error: "Please provide no of large bags"
            })
        } else {
            this.setState({
                no_of_large_bags_error: ""
            })
        }
        if (this.state.no_of_small_bags == "") {
            errorCount++;
            this.setState({
                no_of_small_bags_error: "Please provide no of small bags"
            })
        } else {
            this.setState({
                no_of_small_bags_error: ""
            })
        }
        if (this.state.price_per_hour == "") {
            errorCount++;
            this.setState({
                price_per_hour_error: "Please provide price per hour"
            })
        } else {
            this.setState({
                price_per_hour_error: ""
            })
        }
        if (this.state.fuel_type == "") {
            errorCount++;
            this.setState({
                fuel_type_error: "Please provide fuel type"
            })
        } else {
            this.setState({
                fuel_type_error: ""
            })
        }
        if (this.state.fuel_tank_capacity == "") {
            errorCount++;
            this.setState({
                fuel_tank_capacity_error: "Please provide fuel tank capacity"
            })
        } else {
            this.setState({
                fuel_tank_capacity_error: ""
            })
        }
        if (errorCount == 0) {

            //call insert api
            axios.post("http://localhost:3000/addcar", {
                car_name: this.state.car_name,
                car_no: this.state.car_no,
                no_of_seats: this.state.no_of_seats,
                is_ac: this.state.is_ac,
                mileage: this.state.mileage,
                is_manual: this.state.is_manual,
                other_details: this.state.other_details,
                important_details: this.state.important_details,
                no_of_large_bags: this.state.no_of_large_bags,
                no_of_small_bags: this.state.no_of_small_bags,
                price_per_hour: this.state.price_per_hour,
                car_image: this.state.car_image[0].base64,
                fuel_type: this.state.fuel_type,
                fuel_tank_capacity: this.state.fuel_tank_capacity,
                city_name: this.state.city_name,
                brand_name: this.state.brand_name,
            }, this.config).then((res) => {
                console.log(res);
                //document.getElementById("register_form").reset();
                this.setState({
                    success_msg: "Car added successfully."
                })
                //toaster for success
                toastSuccess("Car added successfully")
                //this.resetInputFields()
                setTimeout(() => this.setState({ redirect: true }), 2000)

            }).catch((err) => {

                console.log('err.message');
                console.log(err.response);

                if (typeof err.response != "undefined") {

                    this.setState({
                        error_msg: err.response.data.error ? "Some error has been occurred. " + err.response.data.error : err.response.data.message

                    })

                    var msg = err.response.data.error ? err.response.data.error : err.response.data.message;

                    //toaster for error
                    toastError(msg);
                }

            })
        }
    }

    componentWillMount() {
        console.log('Component Will MOUNT!')
        //call api
        axios.get("http://localhost:3000/listcity").then((res) => {
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

    render() {

        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to="/listcar" />
        }

        return (
            <>

                <div>
                    {ToastContainerInfo()}



                    <section id="contact" class="contact">
                        <div class="container" id="hdln" >
                            <fieldset>
                                <legend >ADD CAR </legend>
                                <div class="row mt-5 justify-content-center">
                                    <div class="col-lg-10">
                                        <form id="register_form">

                                            <div class="row" id="rwfrst">
                                                <div class="col-md-6 radio">
                                                    <label> <input type="radio" name="is_ac" class="gender" value="1" onChange={this.changeStatus} /> AC </label>
                                                    <label> <input type="radio" name="is_ac" class="gender" value="0" onChange={this.changeStatus} /> Non AC </label>
                                                    <p class="valdtncls">{this.state.is_ac_error}</p>
                                                </div>

                                                <div class="col-md-6 radio">
                                                    <label> <input type="radio" name="is_manual" class="gender" value="1" onChange={this.changeStatus} /> Manual </label>
                                                    <label> <input type="radio" name="is_manual" class="gender" value="0" onChange={this.changeStatus} /> Automatic</label>
                                                    <p class="valdtncls">{this.state.is_manual_error}</p>
                                                </div>


                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="car_name" class="form-control" id="car_name" placeholder="Car Name" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.car_name_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" class="form-control" name="car_no" id="car_no" placeholder="Car No" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.car_no_error}</p>
                                                </div>
                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="no_of_seats" class="form-control" id="no_of_seats" placeholder="No Of Seats" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.no_of_seats_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" class="form-control" name="mileage" id="mileage" placeholder="Mileage" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.mileage_error}</p>
                                                </div>
                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <label style={{ 'font-family': 'cursive', 'font-size': '15px', 'font-style': 'italic', 'margin': '5px' }}>Other Details</label>
                                                    {/* <textarea rows="4" cols="10" name="other_details" class="form-control" id="other_details" placeholder="Other Details" onChange={this.changeStatus} placeholder="Other Details">{this.state.other_details}</textarea> */}

                                                    <CKEditor
                                                        activeClass="p10"
                                                        content={this.state.other_details}
                                                        events={{
                                                            //"blur": this.onBlur,
                                                            //"afterPaste": this.afterPaste,
                                                            "change": this.onChangeOtherDetails
                                                        }}
                                                    />
                                                    <p class="valdtncls">{this.state.other_details_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    {/* <textarea rows="4" cols="10" class="form-control" name="important_details" id="important_details" placeholder="Important Details" onChange={this.changeStatus} ></textarea> */}


                                                    <label style={{ 'font-family': 'cursive', 'font-size': '15px', 'font-style': 'italic', 'margin': '5px' }}>Important Details</label>
                                                    <CKEditor
                                                        activeClass="p10"
                                                        content={this.state.important_details}
                                                        events={{
                                                            //  "blur": this.onBlur,
                                                            //"afterPaste": this.afterPaste,
                                                            "change": this.onChangeImportantDetails
                                                        }}
                                                    />

                                                    <p class="valdtncls">{this.state.important_details_error}</p>
                                                </div>
                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="no_of_large_bags" class="form-control" id="no_of_large_bags" placeholder="No Of Large Bags" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.no_of_large_bags_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" class="form-control" name="no_of_small_bags" id="no_of_small_bags" placeholder="No Of Small Bags" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.no_of_small_bags_error}</p>
                                                </div>
                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="price_per_hour" class="form-control" id="price_per_hour" placeholder="Price Per Hour" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.price_per_hour_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <FileBase64
                                                        multiple={true}
                                                        onDone={this.getFiles.bind(this)} class="form-control" title="Car Image" />
                                                    <p class="valdtncls">{this.state.car_image_error}</p>
                                                </div>
                                            </div>

                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="fuel_type" class="form-control" id="fuel_type" placeholder="Fuel Type" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.fuel_type_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" class="form-control" name="fuel_tank_capacity" id="fuel_tank_capacity" placeholder="Fuel Tank Capacity" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.fuel_tank_capacity_error}</p>
                                                </div>
                                            </div>
                                            <div class="row" >
                                                <div class="col-md-6 form-group">
                                                    <select name="city_name" class="form-control" id="city_name" onChange={this.changeStatus}>
                                                        <option value="">--Select City---</option>
                                                        {
                                                            this.state.cities.map((elem, index) => {

                                                                return <option>{elem.city_name}</option>

                                                            })
                                                        }
                                                    </select>

                                                    <p class="valdtncls">{this.state.city_name_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="text" class="form-control" name="brand_name" id="brand_name" placeholder="Car Brand" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.brand_name_error}</p>
                                                </div>
                                            </div>



                                            <div class="text-center submtbtn" ><button class="btn btn-danger newbut" type="button" onClick={this.formSubmitNow}>Submit</button></div>
                                        </form>
                                    </div>

                                </div>


                            </fieldset>


                        </div>
                    </section>

                </div>
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />
            </>
        )
    }
}
export default AddCar