﻿import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import img from '../../css/images/login-blue.jpg'
import { Name, Layout, Button } from '../atoms'


const Image = styled.section`
    background-position: center center;
    background-size: cover;
    overflow: hidden;  
    z-index: 3;position: relative;
    background-image: url(${img});
    @media (orientation: portrait) {
        width: 100%;
        height: 30vh;
    }
    @media (orientation: landscape) {
        width: 35vw;
        height: 100%;
    }
`

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    width:100vw;
    font-size: 1rem;
    @media (orientation: portrait) {
        flex-direction: column;
    }
    @media (orientation: landscape) {
        flex-direction: row;
    }
`
const FormContainer = styled.div`
    background: white;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (orientation: portrait) {
        width: 100%;
        height: 70vh;
        padding: 5vh 10vw 1.5vh 10vw;
    }
    @media (orientation: landscape)  {
        width: 65vw;
        height: 100%;
        padding: 14vh 10vw;
    }
`
const Tab = styled.div`
    position: absolute;
   top: 5vh;
    z-index:4;
 right:5vh;
`
export const LoginTemplate = ({ children, tab, onClick}) => (
    <PageContainer>
       
        <Image>  <Tab><Button light shine onClick={onClick}>{tab}</Button> </Tab> </Image>
        <FormContainer >
           
            <Name size='3rem'/>
            {children}
        </FormContainer>
        </PageContainer>
)

LoginTemplate.propTypes = {
    children: PropTypes.node.isRequired,
    tab: PropTypes.string,
    onClick: PropTypes.func,
}

LoginTemplate.defaultTypes = {
    tab: 'Реєстрація'
}
