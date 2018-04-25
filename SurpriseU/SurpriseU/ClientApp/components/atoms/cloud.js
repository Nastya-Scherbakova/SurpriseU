﻿import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Icon } from './'


export const CloudWrapper = styled.div`
    height: 85vh;
    @media (orientation: portrait) {
        width: 90%;
    }
    @media (orientation: landscape) {
        width: 60%;
    }
    @media (min-width: 1200px) {
        width: 30%;
    }
    background: rgba(255,255,255,0.2);
    overflow: hidden;
    position: relative;
    border-radius: 30px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 2rem 2rem 2rem;
`

const Back = styled.div`
position:absolute;
top:2rem;
left:2rem;
`
const Right = styled.div`
position:absolute;
top:2rem;
right:2rem;
`

@withRouter
export class Cloud extends React.Component {
    back = () => this.props.history.goBack();
    render() {
        const { children, rightIcon, leftIcon } = this.props;
        return <CloudWrapper>
            <Back>
                {leftIcon || <Icon name='Back' color='#888898' onClick={this.back} />}
            </Back>
            <Right>
                {rightIcon}
            </Right>
            {children}
        </CloudWrapper>;
    }
}