import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import img from '../../css/images/home-image.jpg'
import { Icon } from '../atoms'
import { Form, Slider, Select } from '../molecules'
import { Autocomplete } from '../organisms'

@inject('presentsStore', 'tagsStore')
@observer
export default class Filter extends Component {

    openSearch = () => this.props.presentsStore.enableFilter()
  
    render() {
        const { searchParams, isFilter, onFieldChange, onFieldBlur, onAgeFieldChange, onAgeChange } = this.props.presentsStore;
        const { likes, celebrations } = this.props.tagsStore;
        return <Wrapper isFilter={isFilter} >
            {isFilter ? <Form>
                <Main><Select name='gender'
                    values={genders}
                    value={searchParams.gender}
                    onChange={onFieldChange} />
                    <Slider
                        start={searchParams.startAge}
                        end={searchParams.endAge}
                        onChange={onAgeChange}
                        onFieldChange={onAgeFieldChange}
                        onBlur={onFieldBlur}
                    /> </Main>
                <Autocomplete width='25%'
                    suggestions={likes}
                />
                <Autocomplete width='25%'
                    suggestions={celebrations} />
                <Icons>
                    <Icon name='Check' size='2vh' onClick={this.openSearch} />
                    <Icon name='X' size='2vh' onClick={this.openSearch} />
                </Icons>
            </Form> : undefined}
        </Wrapper>;
    }
}


const genders = [
    {
        icon: 'Mars',
        value: 1
    }, {
        icon: 'BothGenders',
        value: 0
    }, {
        icon: 'Venus',
        value: 2
    },
];

const Main = styled.div`
    width: 30%;
`

const Icons = styled.div`
    width: 10vh;
position:absolute;
bottom:2vh;
margin: auto;
left:0;
right:0;
display:flex;
justify-content: space-between;
`

const Form = styled.div`

    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: rgba(255,255,255, 0.4);
    padding: 10vh 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Wrapper = styled.div`
    background-image: url(${img});
    background-size: cover;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    margin-bottom: 3vh;
    position: relative;
    top: 0;
    z-index: 1;
    left:0;
    @media (max-width: 576px) {
        height: 40vh;
        background-size: 250%;
        background-position: center top;
    }
    @media (min-width: 568px) {
        height: 40vh;
        background-size: 150%;
        background-position: center top;
    }
    @media (min-width: 900px) {
        background-size: cover;
    }
    @media (min-width: 1200px)  {
        height: 45vh;
    }
     ${p => p.isFilter && css`
        position: sticky;
        left:0;
        top: 0;
    `}
`


Filter.propTypes = {
    isFilter: PropTypes.bool 
}

Filter.defaultProps = {
    isFilter: false
}
