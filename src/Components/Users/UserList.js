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
class UserList extends React.Component {

    constructor(props) {
        super(props);
        //declare state variables
        this.state = {
            usersInfo: [],
            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype"),
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

        //call api
        axios.get("http://localhost:3000/listuser").then((res) => {
            console.log(res.data.data);
            this.setState({
                usersInfo: res.data.data
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
                                <h3 id="hdng" class=" hdlg col-lg-12 entries" >Users List </h3>
                                {
                                    this.state.usersInfo.map((elem, index) => {

                                        return <div class="row">

                                            <div class="col-lg-12 entries">

                                                <article class="entry">
                                                    <div class="row">
                                                        <div class="col-sm-4" >
                                                            <div class="entry-img">
                                                                <img src="/frontend/assets/img/user/user.png" alt="" class="img-fluid usrimg" />
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-7 margcssdv" >


                                                            <div class="entry-content">
                                                                <p >
                                                                    <i class="fa fa-user-circle-o"></i>
                                                                    <span class="boksp3"> {elem.name} </span>
                                                                    <i class="fa fa-mobile-phone"></i>
                                                                    <span class="boksp3"> {elem.phone}  </span>
                                                                    <i class="fa fa-mail-forward"></i>
                                                                    <span class="boksp3"> {elem.email}</span>
                                                                </p>
                                                                <p>
                                                                    <span class="boksp1">Address:</span>
                                                                    <span class="boksp2"> {elem.address} </span>

                                                                </p>
                                                                <p>

                                                                    <span class="boksp1">Name on  driving license:</span>
                                                                    <span class="boksp2"> {elem.name_on_driving_license} </span>
                                                                </p>
                                                                <p>

                                                                    <span class="boksp1">Registered on :</span>
                                                                    <span class="boksp2"> {new Date(elem.created_at).toDateString()} </span>
                                                                </p>

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
export default UserList