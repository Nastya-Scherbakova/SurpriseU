import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { Input, Error, Icon } from '../atoms'
import { color, font } from '../theme'



const FieldContainer = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    padding: 0 20%;
   
`

export const Select = ({ name, values, value, onChange }) => (
    <FieldContainer>
        {values.map(e => 
        <Icon 
            key={e.value} 
            name={e.icon}
            style={{opacity: value == e.value ? '1': '0.7'}}
            onClick={() => onChange(name, e.value)}/>)}
    </FieldContainer>
)




Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    name: PropTypes.string
}
