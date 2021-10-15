import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    var route1 = '';
    var route2 = '';
    if (this.props.idParam == undefined) {
      route1 = (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )
    } else {
      if (this.props.userTypeParam == 2) {
        route2 = (
          <>
            <Link to="/addcar">Add Car</Link>

          </>

        )
      }
      route1 = (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </>

      )

    }

    return (
      <>
        <header id="header" class="fixed-top">
          <div class="container d-flex align-items-center">

            <h1 class="logo me-auto"><i class="fa fa-car" style={{ "font-size": "48px;", "color": "yellow" }}></i> &nbsp;&nbsp;<Link to="/"><span>Car Rent</span></Link></h1>



            <nav id="navbar" class="navbar order-last order-lg-0">
              <ul>
                <Link to="/">Home</Link>

                {/* <li class="dropdown"><a href="#"><span>About</span> <i class="bi bi-chevron-down"></i></a>
                  <ul>
                    <Link to="/about-us">About</Link>
                    <li><a href="team.html">Team</a></li>
                    <li><a href="testimonials.html">Testimonials</a></li>
                    <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                      <ul>
                        <li><a href="#">Deep Drop Down 1</a></li>
                        <li><a href="#">Deep Drop Down 2</a></li>
                        <li><a href="#">Deep Drop Down 3</a></li>
                        <li><a href="#">Deep Drop Down 4</a></li>
                        <li><a href="#">Deep Drop Down 5</a></li>
                      </ul>
                    </li>
                  </ul>
                </li> */}

                {/* <li><a href="services.html">Services</a></li>
                <li><a href="portfolio.html">Portfolio</a></li>
                <li><a href="pricing.html">Pricing</a></li>
                <li><a href="blog.html">Blog</a></li> */}
                <Link to="/about-us">About</Link>
                <Link to="/contact-us">Contact Us</Link>
                {/* <Link to="/register">Register</Link> */}
                {/* <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link> */}
                <Link to="/listcar"> Car Price</Link>
                {route2}
                {route1}
                {/* <Link to="/profile">Profile</Link> */}

              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>

            {/* <div class="header-social-links d-flex">
              <a href="#" class="twitter"><i class="bu bi-twitter"></i></a>
              <a href="#" class="facebook"><i class="bu bi-facebook"></i></a>
              <a href="#" class="instagram"><i class="bu bi-instagram"></i></a>
              <a href="#" class="linkedin"><i class="bu bi-linkedin"></i></a>
            </div> */}

          </div>
        </header>
        {/* <div>
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
        </div> */}

      </>
    )
  }
}
export default HeaderComponent