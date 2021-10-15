import React from 'react'
import './AboutUs.css'
import HeaderComponent from '../includes/HeaderComponent';

class AboutUsComponent extends React.Component {

    constructor(props) {
        super(props);
        //declare state variables
        this.state = {

            usrid: localStorage.getItem("usrid"),
            usrtype: localStorage.getItem("usrtype")
        }

    }

    render() {
        return (
            <>
                <div>
                    <h2 id="hdng">About Us</h2>


                    <section id="about-us" class="about-us">
                        <div class="container" >

                            <div class="row content">
                                <div class="col-lg-6">
                                    <h2>Eum ipsam laborum deleniti velitena</h2>
                                    <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assum perenda sruen jonee trave</h3>
                                </div>
                                <div class="col-lg-6 pt-4 pt-lg-0" >
                                    <p>
                                        Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim id est laborum
                                    </p>
                                    <ul>
                                        <li><i class="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequa</li>
                                        <li><i class="ri-check-double-line"></i> Duis aute irure dolor in reprehenderit in voluptate velit</li>
                                        <li><i class="ri-check-double-line"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</li>
                                    </ul>
                                    <p class="fst-italic">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                        magna aliqua.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <HeaderComponent idParam={this.state.usrid} userTypeParam={this.state.usrtype} />
            </>
        )
    }
}
export default AboutUsComponent