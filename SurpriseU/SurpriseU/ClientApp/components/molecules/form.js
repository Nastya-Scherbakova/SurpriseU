import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { color, font } from '../theme'

import { Button, Cloud } from '../atoms'


const Title = styled.div`
    position:relative;
    font-size: 1.5rem;
    padding: 2rem 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    text-align: center;
    color: #888898;
`
@withRouter
export class Form extends React.Component {
    back = () => this.props.history.goBack();

    render() {
        const { children, header, submit } = this.props;
        return <Cloud>
            <Title> 
                {header}
            </Title>
            {children}
            <Submit shine darkblue rounded >Зберегти</Submit>
        </Cloud>;
    }
}

    //< Icon name= 'Check' onClick= { submit } />

const Submit = Button.extend`
transform: scale(0.9);
margin: 0 auto;
`

Form.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
}

Form.defaultProps = {
    header: 'Редагувати',
}