import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Clipboard} from 'react-feather';
import '../css/bootstrap.css';
import '../css/Site.scss';
import 'scrollpos-styler';


export class Menu extends Component {
    render() {
        return (
            <nav className="d-flex align-items-center justify-content-between navbar navbar-toggleable-sm navbar-light fixed-top sps sps--abv">
                
                  
                <div className="d-flex w-50 align-items-center"><h1><NavLink className="nav-brand" to={'/'}>SurpriseU</NavLink></h1>
                
                    <div id='portal-nav-input' className="w-50 ml-5"><input className="form-control" type="search" placeholder="Search" aria-label="Search" /></div></div>
                    
                    <div className="d-flex flex-row">
                    <NavLink className="navlink-no nav-icon" to={'/anketa'}>  <div className="d-flex justify-content-center align-items-center "><Clipboard size="5vh" color='#031560'/></div></NavLink>
                    <NavLink className="navlink-no nav-icon" to={'/profile'}><div className="d-flex justify-content-center align-items-center"><User size="5vh" color='#031560'/></div></NavLink>
                    </div>
               
            </nav>
        );
    }
}