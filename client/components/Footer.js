import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <div className='footer' style={{backgroundColor:" #383838"}}>
        <div className='row footer-section'>
          <div className='col-md-2'>
            <span style={{color: "#cdb287",
  fontWeight: "bold",
  fontSize: "28px"}}>Learn Piano</span>
          </div>
          <div className='col-md-2'>
            <span className='footer-title'>BROWSER</span>
            <ul className="footer-list">
              <li>
              <NavLink exact activeClassName="active" to='/men' >
                Men
              </NavLink>
              </li>
              <li>
              <NavLink exact activeClassName="active" to='/women' >
                Women
              </NavLink>
              </li>
            </ul>
          </div>
          <div className='col-md-2'>
            <span className='footer-title'>ABOUT Learn Piano</span>
            <ul className="footer-list">
              <li>About Learn Piano</li>
              <li>Careers</li>
              <li>Legal</li>
              <li>Privacy & Cookies</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <div className='col-md-2'>
            <span className='footer-title'>INFORMATION</span>
            <ul className="footer-list">
              <li>Contact Us</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <span className='footer-title'>SIGN UP FOR Learn Piano UPDATES</span>
            <input className="form-control footer-input-sm" type="text" placeholder="Email Address"></input>
            <span className='footer-title'>FOLLOW US</span>
              <div>
                <i className="fa fa-facebook social" aria-hidden="true"></i>
                <i className="fa fa-instagram social" aria-hidden="true"></i>
                <i className="fa fa-twitter social" aria-hidden="true"></i>
                <i className="fa fa-youtube social" aria-hidden="true"></i>
              </div>
          </div>
        </div>
        <hr className="col-md-12"></hr>
        <div className='row'>
          <div className='col-md-6 footer-rights'>
            <span>© 2018 Learn Piano. All Right Reserved.</span>
          </div>
          <div className='col-md-6 footer-address'>
            <span>Los Angeles, CA 90045</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;