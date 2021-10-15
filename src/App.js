import logo from './logo.svg';
import './App.css';
import HeaderComponent from './Components/includes/HeaderComponent';
import FooterComponent from './Components/includes/FooterComponent';
import AboutUsComponent from './Components/AboutUs/AboutUsComponent';
import ContactUsComponent from './Components/ContactUs/ContactUsComponent';
import HomeComponent from './Components/Home/HomeComponent';
import HeadComponent from './Components/includes/HeadComponent';
import RegisterComponent from './Components/Register/RegisterComponent';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginComponent from './Components/Login/LoginComponent';
import LogoutComponent from './Components/Logout/LogoutComponent';
import ProfileComponent from './Components/Profile/ProfileComponent';
import AddCar from './Components/Car/AddCar';
import ListCar from './Components/Car/ListCar';
import CarDetails from './Components/Car/CarDetails';

function App(props) {

  return (
    <>
      <html lang="en" >
        <HeadComponent />
        <body>
          <div className="App">

            <Router>
              <div>
                <HeaderComponent />
                <Switch>
                  <Route path="/about-us">
                    <AboutUsComponent />
                  </Route>
                  <Route path="/contact-us">
                    <ContactUsComponent />
                  </Route>
                  <Route path="/register">
                    <RegisterComponent />
                  </Route>
                  <Route path="/login">
                    <LoginComponent />
                  </Route>
                  <Route path="/profile">
                    <ProfileComponent />
                  </Route>
                  <Route path="/addcar">
                    <AddCar />
                  </Route>
                  <Route path="/logout">
                    <LogoutComponent />
                  </Route>
                  {/* <Route path="/listcar">
                    <ListCar />
                  </Route> */}
                  <Route path="/listcar" component={ListCar} />

                  <Route path="/car-details/:id" component={CarDetails} />
                  <Route path="/">
                    <HomeComponent />
                  </Route>
                </Switch>
              </div>
              <FooterComponent />
            </Router>


          </div>

        </body>
      </html>
    </>
  );
}

export default App;
