import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LogIn from './Login'

class Navbar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation" >
            <div className="container" style={{maxWidth:"100vw"}}>
                <Link to="/" className="navbar-brand">Home</Link>
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
                            {this.props.authenticated
                                ?  <button type="button" id="signOut" className="btn btn-outline-secondary">Log Out<span className="caret"></span></button>
                                :
                                <LogIn/>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        )
    }
}

export default Navbar        
