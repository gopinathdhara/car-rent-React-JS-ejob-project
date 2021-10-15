import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const FooterComponent = () => {


    return (
        <>
            <div>
                <footer id="footer">
                    <div class="footer-top">

                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 footer-contact">
                                    <h3>Company</h3>
                                    <p>
                                        Car Rental <br />
                                        Address :  Kolkata<br />
                                        <strong>Phone:</strong> 9804669402<br />
                                        <strong>Email:</strong> gopi1.dhara@gmail.com <br />
                                    </p>
                                </div>
                                <div class="col-lg-4 col-md-6 footer-contact">

                                </div>
                                {/* <div class="col-lg-2 col-md-6 footer-links">
                                    <h4>Useful Links</h4>
                                    <ul>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Terms of service</a></li>
                                        <li><i class="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                                    </ul>
                                </div> */}
                                <div class="col-lg-2 col-md-6 footer-links">
                                    <h4>Our Services</h4>

                                    <nav>
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>
                                                <Link to="/about-us">About</Link>
                                            </li>
                                            <li>
                                                <Link to="/contact-us">Contact Us</Link>
                                            </li>
                                        </ul>
                                    </nav>

                                </div>

                                {/* <div class="col-lg-4 col-md-6 footer-newsletter">
                                    <h4>Join Our Newsletter</h4>
                                    <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                                    <form action="" method="post">
                                        <input type="email" name="email" /><input type="submit" value="Subscribe" />
                                    </form>
                                </div> */}
                            </div>
                        </div>

                    </div>

                    <div class="container d-md-flex py-4">

                        <div class="me-md-auto text-center text-md-start">
                            <div class="copyright">
                                &copy; Copyright <strong><span>Car Rental</span></strong>. All Rights Reserved
                            </div>
                            <div class="credits">

                                Developed by <a href="https://bootstrapmade.com/">Developer Gopinath Dhara</a>
                            </div>
                        </div>
                        {/* <div class="social-links text-center text-md-right pt-3 pt-md-0">
                            <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                            <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
                            <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                        </div> */}
                    </div>
                </footer>

                <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>


                <script src="/frontend/assets/vendor/aos/aos.js"></script>
                <script src="/frontend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
                <script src="/frontend/assets/vendor/glightbox/js/glightbox.min.js"></script>
                <script src="/frontend/assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
                <script src="/frontend/assets/vendor/php-email-form/validate.js"></script>
                <script src="/frontend/assets/vendor/swiper/swiper-bundle.min.js"></script>
                <script src="/frontend/assets/vendor/waypoints/noframework.waypoints.js"></script>
                <script src="/frontend/assets/js/main.js"></script>

            </div>
        </>
    )

}
export default FooterComponent