import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap';
import '../css/bootstrap.css';
import '../css/style.css';

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

const Present = React.createClass({
    render() {
        return (
            <svg className="icon-gift" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <path d="M24.11 10c0.566-0.402 1.11-0.851 1.608-1.348 1.044-1.044 1.742-2.328 1.966-3.616 0.246-1.412-0.115-2.723-0.988-3.597-0.697-0.697-1.641-1.065-2.73-1.065-1.551 0-3.185 0.744-4.483 2.043-2.077 2.077-3.288 4.945-3.94 6.991-0.482-2.056-1.444-4.833-3.313-6.702-1.003-1.003-2.285-1.518-3.495-1.518-0.989 0-1.931 0.344-2.633 1.046-1.562 1.562-1.351 4.306 0.471 6.128 0.65 0.65 1.409 1.189 2.21 1.638h-6.782v8h2v14h24v-14h2v-8h-5.89zM21.073 4.007c0.866-0.866 1.948-1.384 2.892-1.384 0.334 0 0.803 0.070 1.139 0.406 0.813 0.813 0.357 2.697-0.977 4.031-1.373 1.373-3.221 2.318-4.826 2.939h-1.584c0.58-1.798 1.627-4.264 3.356-5.993zM7.31 5.028c-0.022-0.285-0.002-0.82 0.381-1.203 0.32-0.32 0.743-0.387 1.042-0.387v0c0.664 0 1.358 0.313 1.904 0.859 1.059 1.058 1.93 2.743 2.521 4.871 0.016 0.057 0.031 0.115 0.047 0.171-0.057-0.015-0.114-0.031-0.171-0.047-2.128-0.591-3.813-1.462-4.871-2.521-0.495-0.495-0.805-1.13-0.853-1.743zM14 30h-8v-13h8v13zM14 16h-10v-4h10v4zM26 30h-8v-13h8v13zM28 16h-10v-4h10v4z"></path>
            </svg>
        )
    }
});

export class Menu extends Component {

    render() {
        return (
            <nav className=" navbar navbar-toggleable-sm fixed-top main-nav navbar-light bg-light" data-spy="affix" data-offset-top="400">
                <div className="container">
                   
                    <ul className="d-flex flex-row nav navbar-nav flex-grow">    
                       
                        <li className="nav-item"><Link className='navbar-brand' to={'/'}>SurpriseU</Link></li>
                       
                    </ul>
                    <ul className="nav navbar-nav flex-grow justify-content-center">
                        <li className="nav-item"><input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /></li>

                    </ul>
                    <ul className=" d-flex flex-row nav navbar-nav flex-grow justify-content-end">
                     
                        <li className="nav-item"><NavLink to={'/anketa'}><Anketa /></NavLink></li>
                        <li className="nav-item"><NavLink to={'/profile'}><User /></NavLink></li>
                        <li className="nav-item"><NavLink to={'/admin'}><Present /></NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

