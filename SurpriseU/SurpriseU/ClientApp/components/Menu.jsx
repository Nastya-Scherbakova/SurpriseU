import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap';
import '../css/bootstrap.css';
import '../css/style.css';
import 'scrollpos-styler';
const Anketa = React.createClass({
    render() {
        return (
            <svg className="icon-profile" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 18h14v2h-14zM8 22h14v2h-14zM10 9c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.657-1.343 3-3 3s-3-1.343-3-3zM15 12h-4c-1.65 0-3 0.9-3 2v2h10v-2c0-1.1-1.35-2-3-2z"></path>
            </svg>
        )
    }
});

const User = React.createClass({
    render() {
        return (
            <svg className="icon-users-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M23.797 20.922c-0.406-2.922-1.594-5.516-4.25-5.875-1.375 1.5-3.359 2.453-5.547 2.453s-4.172-0.953-5.547-2.453c-2.656 0.359-3.844 2.953-4.25 5.875 2.172 3.063 5.75 5.078 9.797 5.078s7.625-2.016 9.797-5.078zM20 10c0-3.313-2.688-6-6-6s-6 2.688-6 6 2.688 6 6 6 6-2.688 6-6zM28 14c0 7.703-6.25 14-14 14-7.734 0-14-6.281-14-14 0-7.734 6.266-14 14-14s14 6.266 14 14z"></path>
            </svg>
        )
    }
});

export class Menu extends Component {

    render() {
        return (
            <nav className="navbar navbar-toggleable-sm navbar-light fixed-top sps sps--abv">
                <div className="container d-flex flex-row align-items-center">
                   
                    <ul className="d-flex flex-row nav navbar-nav flex-grow">    
                       
                        <li className="nav-item"><Link className='navbar-brand' to={'/'}>SurpriseU</Link></li>
                       
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-center">
                        <li className="nav-item"><input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /></li>

                    </ul>
                    <ul className=" d-flex flex-row nav navbar-nav flex-grow justify-content-end">
                      
                        <li ><Link to={'/anketa'}><Anketa /></Link></li>
                        <li ><Link to={'/profile'}><User/ ></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

/*export class Menu extends Component {

    render() {
        return (
            <nav className="navbar navbar-toggleable-sm navbar-light fixed-top sps sps--abv">
                <div className="container d-flex flex-row align-items-center">

                    <ul className="d-flex flex-row nav navbar-nav flex-grow">

                        <li className="nav-item"><Link className='navbar-brand' to={'/'}>SurpriseU</Link></li>

                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-center">
                        <li className="nav-item"><input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /></li>

                    </ul>
                    <ul className=" d-flex flex-row nav navbar-nav flex-grow justify-content-end">

                        <li className="round-li"><Link to={'/anketa'}></Link></li>
                        <li className="round-li"><Link to={'/profile'}></Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
*/
