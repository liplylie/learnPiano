import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LogIn from './Login'
import LogOut from './LogOut'

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
                        <li className="nav-item"><a href="/About" className="nav-link">About</a></li>
                        <li className="nav-item"><a href="/Links" className="nav-link">Links</a></li>
                        <li className="dropdown nav-item">
                            <a data-toggle="dropdown" className="dropdown-toggle nav-link" href="#">Mini Games</a>
                            <ul className="dropdown-menu text-center">
                              <li className="dropdown-item"><Link to="/miniGame1">Mini Game 1</Link></li>
                              <li className="dropdown-item"><Link to="/miniGame2">Mini Game 2</Link></li>
                              <li className="dropdown-item"><Link to="/miniGame3">Mini Game 3</Link></li>
                              <li className="dropdown-item"><Link to="/miniGame4">Mini Game 4</Link></li>
                              <li className="dropdown-item"><Link to="/miniGame5">Mini Game 5</Link></li>
                            </ul>
                          </li>
                    </ul>
                    <ul className="nav navbar-nav flex-row justify-content-between ml-auto">
                        <li className="nav-item order-2 order-md-1"><a href="#" className="nav-link" title="settings"><i className="fa fa-cog fa-fw fa-lg"></i></a></li>
                        <li className="dropdown order-1">
                            {this.props.authenticated
                                ?  <LogOut authenticated={this.props.authenticated}/>
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