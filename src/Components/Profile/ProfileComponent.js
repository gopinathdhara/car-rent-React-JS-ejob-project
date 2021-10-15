import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import HeaderComponent from '../includes/HeaderComponent';
const ProfileComponent = () => {

    const [name, setName] = useState(localStorage.getItem("usrname"))
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordErrpr, setPasswordError] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [usrid, setUsridId] = useState(localStorage.getItem("usrid"))
    const [usrtype, setUsrType] = useState(localStorage.getItem("usrtype"))

    //update state
    const stateUpdate = (e) => {
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
            axios.post("http://localhost:3000/login", {
                email: email,
                password: password
            }).then((res) => {
                console.log(res);
                setSuccessMsg("You have logged in successfully")
                //toaster for success
                toastSuccess("You have logged in successfully")


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


    return (

        <>
            {ToastContainerInfo()}
            <div>
                <section id="contact" class="contact"><h1 id="hdln">My Profile</h1></section>
                <h3>{name}</h3>
            </div>
            <HeaderComponent idParam={usrid} userTypeParam={usrtype} />
        </>
    )
}
export default ProfileComponent