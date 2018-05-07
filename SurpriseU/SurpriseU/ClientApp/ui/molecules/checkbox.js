import * as React from 'react'
import styled from 'styled-components'
import { Icon,Flex } from '../atoms'
import PropTypes from 'prop-types'

const Square = styled.div`
    transition: all .3s ease-in;
    height: 1.2rem;
    width: 1.2rem;
    background: ${p => p.checked ? p.active : p.def};
    display: flex;
    align-items:center;
    border-radius: 2px;
    justify-content: center;
    & > * {
        transition: all .3s ease-in;
    }
`


const Title = styled.div`
    color: #31394D;
    padding: 0 0.5rem;
font-weight: 500;
`
export class Checkbox extends React.Component {
    state = { checked: this.props.checked }

    onClick = () => {
        this.setState(prevState => ({ checked: !prevState.checked }));
        this.props.onClick(this.state.checked);
    }
    render() {
        const { def, active, text } = this.props;
        return <Flex align='center'>
            <Square
                active={active}
                def={def}
                checked={this.state.checked}
                onClick={this.onClick}
            >
                <Icon name='Check' size={this.state.checked ? '1rem' : '0'} color='#fff' />
            </Square>
            <Title>{text}</Title>
        </Flex>
    }
}


Checkbox.propTypes = {
    active: PropTypes.string,
    checked: PropTypes.bool,
    def: PropTypes.string,
    text: PropTypes.string
}

Checkbox.defaultProps = {
    active: '#5C71DB',
    checked: false,
    def: '#C8C8CE',
    text: ''
}