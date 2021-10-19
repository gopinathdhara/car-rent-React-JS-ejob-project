import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';

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
          <NavLink to="/login" exact activeClassName='is-active'>Login</NavLink>
          <NavLink to="/register" exact activeClassName='is-active'>Register</NavLink>
        </>
      )
    } else {
      if (this.props.userTypeParam == 2) {
        route2 = (
          <>
            <NavLink to="/addcar" exact activeClassName='is-active'>Add Car</NavLink>
            <NavLink to="/my-booking" exact activeClassName='is-active'> Booking </NavLink>
            <NavLink to="/user-list" exact activeClassName='is-active'> Users </NavLink>
          </>

        )
      } else {
        route2 = (
          <NavLink to="/my-booking" exact activeClassName='is-active'> My Booking </NavLink>
        )
      }
      route1 = (
        <>
          <NavLink to="/profile" exact activeClassName='is-active'>Profile</NavLink>

          <NavLink to="/logout" exact activeClassName='is-active'>Logout</NavLink>
        </>

      )

    }

    return (
      <>

        <header id="header" class="fixed-top">

          <div class="container d-flex align-items-center">

            <h1 class="logo me-auto"><i class="fa fa-car" style={{ "font-size": "48px;", "color": "yellow" }}></i> &nbsp;&nbsp;<Link to="/"><span>Car Rent</span></Link></h1>


            <Navbar collapseOnSelect expand="lg">
              <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav className="mr-auto d-block">

                  <NavLink to="/" exact activeClassName='is-active'>Home</NavLink >

                  <NavLink exact to="/about-us" activeClassName='is-active'>About</NavLink>

                  <NavLink exact to="/contact-us" activeClassName='is-active'>Contact Us</NavLink>

                  <NavLink exact to="/listcar" activeClassName='is-active'> Car List </NavLink>

                  {route2}
                  {route1}

                </Nav>
              </Navbar.Collapse>
            </Navbar>


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