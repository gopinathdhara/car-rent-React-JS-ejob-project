import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toastSuccess, toastError, ToastContainerInfo } from '../Common/Utils'
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";

const LogoutComponent = () => {

    const [redirect, setRedirect] = useState(true)
    //setTimeout(() => setRedirect({ redirect: true }), 1000)
    if (redirect) {
        localStorage.removeItem('usrid');
        localStorage.removeItem('usrname');
        localStorage.removeItem('token');
        localStorage.clear();
        return <Redirect to="/login" />
    }

    return (
        <>
        </>
    )
}
export default LogoutComponent