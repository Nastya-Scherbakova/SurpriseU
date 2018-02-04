import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Clipboard} from 'react-feather';
import '../css/bootstrap.css';
import '../css/Site.scss';
import 'scrollpos-styler';
import { Search } from 'react-feather';

export class Menu extends Component {
    render() {
        return (
            <nav className="d-flex align-items-center justify-content-between navbar navbar-toggleable-sm navbar-light fixed-top sps sps--abv">
                <div className="d-flex w-75 justify-content-center align-items-center h-100">
                    <h1 className="align-middle" > <NavLink className="nav-brand align-middle" to={'/'}>SurpriseU</NavLink></h1>
                    <div className="d-flex w-50 align-items-center ml-3 h-100 input-div">
                        <div className='icon align-items-center justify-content-center'><Search className='search-icon' color='#AEAEAE' /></div>
                        <input className="form-control" type="search" placeholder="Пошук" aria-label="Search" />
                    </div>
                </div> 
                <div className="d-flex w-25">
                    <NavLink className="navlink-no" to={'/anketa'}> <div className=" nav-icon d-flex justify-content-center align-items-center "><Clipboard size='100%' color='#031560' /></div></NavLink>
                    <NavLink className="navlink-no" to={'/profile'}><div className=" nav-icon d-flex justify-content-center align-items-center"><User size='100%' color='#031560' /></div></NavLink>
                </div> 
            </nav>
        );
    }
}