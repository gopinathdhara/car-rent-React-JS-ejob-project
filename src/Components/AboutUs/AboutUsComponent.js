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



                    <section id="about-us" class="about-us">
                        <div class="container" >
                            <h2 id="hdng">About Us</h2>
                            <div class="row content">
                                <div class="col-lg-12">

                                    <h4 class="abthd">Welcome to Car Rent</h4>
                                    <p class="abtpara">
                                        That wonderful feeling you start the engine and your adventure begins…

                                        At Car Rent everything we do is about giving you the freedom to discover more. We will move mountains to find you the right rental car, and bring you a smooth, hassle-free experience from start to finish.


                                    </p>
                                    <p class="abtpara">
                                        We are a broker, so we arrange the car rental on your behalf. We use our massive buying power to bring you great deals. But we’re way more than a price comparison site, because we stay with you every step of the way.
                                    </p>
                                    <p class="abtpara">
                                        We use all our experience – and the experiences of millions of our customers – to bring you the car you need and the quality of service you want. Always at the best price. But don’t take our word for it.
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