import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import HeaderComponent from '../includes/HeaderComponent';
import { serverBaseUrl } from '../Common/Utils'

const LoginComponent = (props) => {

    const [usrid, setUsridId] = useState(localStorage.getItem("usrid"))
    const [usrtype, setUsrType] = useState(localStorage.getItem("usrtype"))
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErrpr, setPasswordError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [redirect, setRedirect] = useState(false)

    //update state
    const stateUpdate = (e) => {
        console.log(props);
        if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        if (e.target.name == "password") {
            setPassword(e.target.value)
        }
    }
    //form validation
    const formSubmitNow = () => {

        var rgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var errorCount = 0;
        if (password == "") {
            errorCount++;
            setPasswordError("Please provide password")
        } else {
            setPasswordError("")
        }
        if (email == "") {
            errorCount++;
            setEmailError("Please provide email")
        } else {
            var res2 = rgx.test(email);
            if (res2 === false) {
                errorCount++;
                setEmailError("Please provide valid email")
            }
            else {
                setEmailError("")
            }

        }
        if (errorCount == 0) {
            //call api
            axios.post(serverBaseUrl + "login", {
                email: email,
                password: password
            }).then((res) => {
                console.log(res);
                setSuccessMsg("You have logged in successfully")
                //toaster for success
                toastSuccess("You have logged in successfully")
                console.log("name")
                console.log(res);
                localStorage.setItem("usrname", res.data.data.user[0].name);
                localStorage.setItem("usrid", res.data.data.user[0].id);
                localStorage.setItem("usrtype", res.data.data.user[0].user_type);
                localStorage.setItem("token", res.data.data.token);
                setTimeout(() => setRedirect({ redirect: true }), 1000)

            }).catch((err) => {
                console.log(err.response);
                if (typeof err.response != "undefined") {

                    setErrorMsg("Some error has been occurred. " + err.response.data.error)
                    var msg = err.response.data.error;
                    //toaster for error
                    toastError(msg);
                }

            })
        }
    }
    //useEffect called after render view list api can be called here
    useEffect(function () {
        console.log("called after render");
    })

    if (redirect) {
        console.log('props');
        console.log(props);
        if (props.location.search_data != undefined) {

            return <Redirect to={{
                pathname: '/car-details/' + props.location.search_data.id,
                search_data: props.location.search_data
            }}
            />
        } else {
            return <Redirect to="/profile" />
        }

    }
    return (



        <>
            {ToastContainerInfo()}
            <div>

                <button type="button" class="btn btn-primary mymodbut" data-toggle="modal" data-target="#exampleModal" id="mymodbut" style={{ 'display': 'none' }}>
                    Launch demo modal
                </button>
                <section id="contact" class="contact">
                    <div class="container col-lg-6" id="hdln">
                        <fieldset>
                            <legend >LOGIN </legend>
                            <div class="row" id="rwfrst">
                                <div class="col-sm-5 loginform" >
                                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" onChange={stateUpdate} />
                                    <p class="valdtncls">{emailError}</p>
                                </div>

                            </div>
                            <div class="row">
                                <div class="col-sm-5 loginform" >
                                    <input type="password" name="password" class="form-control" id="password" placeholder="Your Password" onChange={stateUpdate} />
                                    <p class="valdtncls">{passwordErrpr}</p>
                                </div>
                            </div>
                            <div class="text-center submtbtn"><button class="newbut btn btn-success" type="button" onClick={formSubmitNow}>Login</button></div>
                        </fieldset>

                    </div>

                </section>
            </div>
            <HeaderComponent idParam={usrid} userTypeParam={usrtype} />

        </>
    )
}
export default LoginComponent