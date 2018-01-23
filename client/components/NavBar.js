import React, { Component } from 'react'
<<<<<<< HEAD
import { Link } from 'react-router-dom'

import LogIn from './Login'
import LogOut from './LogOut'
=======
>>>>>>> basic set up with navBar and 404 route NEED TO ADD FIREB AUTH

class Navbar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
<<<<<<< HEAD
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation" >
            <div className="container" style={{maxWidth:"100vw"}}>
                <Link to="/" className="navbar-brand">Home</Link>
=======
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation">
            <div className="container">
                <a className="navbar-brand" href="#">Home</a>
>>>>>>> basic set up with navBar and 404 route NEED TO ADD FIREB AUTH
                <button className="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
                    &#9776;
                </button>
                <div className="collapse navbar-collapse" id="exCollapsingNavbar">
                    <ul className="nav navbar-nav">
                        <li className="nav-item"><a href="#" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Link</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Service</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">More</a></li>
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-2 order-md-1"><a href="#" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-1">
<<<<<<< HEAD
                            {this.props.authenticated
                                ?  <LogOut authenticated={this.props.authenticated}/>
                                :
                                <LogIn/>
                            }
=======
                            <button type="button" id="dropdownMenu1" data-toggle="dropdown" className="btn btn-outline-secondary dropdown-toggle">Login <span className="caret"></span></button>
                            <ul className="dropdown-menu dropdown-menu-right mt-1">
                              <li className="p-3">
                                    <form className="form" role="form">
                                        <div className="form-group">
                                            <input id="emailInput" placeholder="Email" className="form-control form-control-sm" type="text" required=""/>
                                        </div>
                                        <div className="form-group">
                                            <input id="passwordInput" placeholder="Password" className="form-control form-control-sm" type="text" required=""/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <div className="form-group text-xs-center">
                                            <small><a href="#">Forgot password?</a></small>
                                        </div>
                                    </form>
                                </li>
                            </ul>
>>>>>>> basic set up with navBar and 404 route NEED TO ADD FIREB AUTH
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        )
    }
}

export default Navbar        
