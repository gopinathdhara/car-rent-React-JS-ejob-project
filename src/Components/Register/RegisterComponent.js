import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import HeaderComponent from '../includes/HeaderComponent';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
            gender: "",
            gender_error: "",
            name: "",
            name_error: "",
            email: "",
            email_error: "",
            phone: "",
            phone_error: "",
            driver_name: "",
            driver_name_error: "",
            address: "",
            address_error: "",
            password: "",
            password_error: "",
            confirm_password: "",
            confirm_password_error: "",
            success_msg: 0,
            error_msg: '',
            redirect: false
        }
        this.changeStatus = this.changeStatus.bind(this);
    }
    //component lifecycle
    componentWillMount() {
        console.log('Component Will MOUNT!')
    }
    componentDidMount() {
        console.log('Component Did MOUNT!')
    }

    componentWillReceiveProps(newProps) {
        console.log('Component Will Recieve Props!')
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('shouldComponentUpdate is called!')
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('Component Will UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component Did UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component Will UNMOUNT!')
    }
    //update state
    changeStatus(event) {

        if (event.target.name === "gender") {
            this.setState({
                gender: event.target.value
            })
        }
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            })
        }
        if (event.target.name === "email") {
            this.setState({
                email: event.target.value
            })
        }
        if (event.target.name === "phone") {
            this.setState({
                phone: event.target.value
            })
        }
        if (event.target.name === "driver_name") {
            this.setState({
                driver_name: event.target.value
            })
        }
        if (event.target.name === "address") {
            this.setState({
                address: event.target.value
            })
        }
        if (event.target.name === "password") {
            this.setState({
                password: event.target.value
            })
        }
        if (event.target.name === "confirm_password") {
            this.setState({
                confirm_password: event.target.value
            })
        }
    }
    //form validation
    formSubmitNow = () => {
        console.log(this.state)
        var errorCount = 0;
        var rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var rgx1 = /^[0-9]{10}$/;

        if (this.state.password == "") {
            errorCount++;
            this.setState({
                password_error: "Please provide password"
            })
        } else {

            if (this.state.password.length < 5) {
                errorCount++;
                this.setState({
                    password_error: "Password minimum length 5"
                })
            }
            else if (this.state.password != this.state.confirm_password) {
                errorCount++;
                this.setState({
                    password_error: "Password and confirm password should match"
                })
            }
            else {
                this.setState({
                    password_error: ""
                })
            }
        }
        if (this.state.confirm_password == "") {
            errorCount++;
            this.setState({
                confirm_password_error: "Please provide confirm password"
            })
        } else {
            this.setState({
                confirm_password_error: ""
            })
        }
        if (this.state.gender == "") {
            errorCount++;
            this.setState({
                gender_error: "Please provide gender"
            })
        } else {
            this.setState({
                gender_error: ""
            })
        }
        if (this.state.name == "") {
            errorCount++;
            this.setState({
                name_error: "Please provide name"
            })
        } else {
            this.setState({
                name_error: ""
            })
        }
        if (this.state.email == "") {
            errorCount++;
            this.setState({
                email_error: "Please provide email"
            })
        }
        else {
            var res2 = rgx.test(this.state.email);
            if (res2 === false) {
                errorCount++;
                this.setState({
                    email_error: "Please provide valid email"
                })
            } else {
                this.setState({
                    email_error: ""
                })
            }

        }
        if (this.state.phone == "") {
            errorCount++;
            this.setState({
                phone_error: "Please provide phone no"
            })
        } else {

            var res2 = rgx1.test(this.state.phone);
            if (res2 === false) {
                errorCount++;
                this.setState({
                    phone_error: "Please provide valid phone no"
                })
            } else {
                this.setState({
                    phone_error: ""
                })
            }

        }
        if (this.state.driver_name == "") {
            errorCount++;
            this.setState({
                driver_name_error: "Please provide driver name"
            })
        } else {
            this.setState({
                driver_name_error: ""
            })
        }
        if (this.state.address == "") {
            errorCount++;
            this.setState({
                address_error: "Please provide address"
            })
        } else {
            this.setState({
                address_error: ""
            })
        }
        if (errorCount == 0) {

            //call insert api
            axios.post("http://localhost:3000/registration", {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                password: this.state.password,
                name_on_driving_license: this.state.driver_name
            }).then((res) => {
                console.log(res);
                document.getElementById("register_form").reset();
                this.setState({
                    success_msg: "You have registered successfully."
                })
                //toaster for success
                toastSuccess("You have registered successfully")
                //this.resetInputFields()
                setTimeout(() => this.setState({ redirect: true }), 2000)

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
    }
    //clear state
    resetInputFields = () => {
        this.setState({

            gender: "",
            gender_error: "",
            name: "",
            name_error: "",
            email: "",
            email_error: "",
            phone: "",
            phone_error: "",
            driver_name: "",
            driver_name_error: "",
            address: "",
            address_error: "",
            password: "",
            password_error: "",
            confirm_password: "",
            confirm_password_error: "",
            success_msg: '',
            error_msg: ''

        })
    }
    successToast = (data) => {
        console.log("successToast")
    }
    render() {

        const redirect = this.state.redirect;
        if (redirect) {
            return <Redirect to="/login" />
        }

        return (
            <>
                <div>
                    {ToastContainerInfo()}

                    <section id="contact" class="contact">
                        <div class="container" id="hdln">

                            <fieldset>

                                <legend >REGISTER </legend>
                                <div class="row mt-5 justify-content-center">
                                    <div class="col-lg-10">
                                        <form id="register_form">
                                            <div class="row">
                                                <div class="col-md-12 radio">
                                                    <label> <input type="radio" name="gender" class="gender" value="Male" onChange={this.changeStatus} /> Male </label>
                                                    <label> <input type="radio" name="gender" class="gender" value="Female" onChange={this.changeStatus} /> Female </label>
                                                    <p class="valdtncls">{this.state.gender_error}</p>
                                                </div>

                                            </div>
                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.name_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.email_error}</p>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <input type="password" name="password" class="form-control" id="password" placeholder="Your Password" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.password_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Your Confirm Password" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.confirm_password_error}</p>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6 form-group">
                                                    <input type="text" name="phone" class="form-control" id="phone" placeholder="Your Phone" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.phone_error}</p>
                                                </div>
                                                <div class="col-md-6 form-group mt-3 mt-md-0">
                                                    <input type="email" class="form-control" name="driver_name" id="driver_name" placeholder="Name as on Driving License" onChange={this.changeStatus} />
                                                    <p class="valdtncls">{this.state.driver_name_error}</p>
                                                </div>
                                            </div>

                                            <div class="form-group mt-3">
                                                <textarea class="form-control" name="address" rows="5" placeholder="Address" onChange={this.changeStatus}> </textarea>
                                                <p class="valdtncls">{this.state.address_error}</p>
                                            </div>

                                            <div class="text-center submtbtn"><button class="btn btn-success newbut" type="button" onClick={this.formSubmitNow}>Register</button></div>
                                        </form>
                                    </div>

                                </div>


                            </fieldset>



                        </div>
                    </section>
                </div>

                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />

                {/* <ToasterNotify succMsg={this.state.success_msg} errMsg={this.state.error_msg} toastSucc={this.successToast} /> */}

            </>
        )
    }
}

export default Register