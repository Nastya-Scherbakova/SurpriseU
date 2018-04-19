import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '../atoms'
import React from 'react'

const def = <def>
    <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="10%" stopColor="#1C1C59" />
        <stop offset="100%" stopColor="#03A9F4" />
    </linearGradient>
</def>;

const Wrapper = styled.span`
  position: absolute;
  height: ${p => p.height }rem;
  width: ${p => p.height }rem;
  top: ${p => ((p.propHeight - p.height)/2)}rem;
  ${p => p.position}: ${p => ((p.propHeight - p.height) / 2)}rem;
`

export const IconLabel = ({ height, propHeight, position,  ...props }) =>
    <Wrapper height={height}
        position={position}
        propHeight={propHeight} > 
        <Icon {...props}
            def={def}
            size={`${height}rem`} />
    </Wrapper> 

IconLabel.propTypes = {
    height: PropTypes.number,
    propHeight: PropTypes.number,
    position: PropTypes.oneOf(['left', 'right']),
    color: PropTypes.string
}

IconLabel.defaultProps = {
    height: 1,
    propHeight: 2,
    position: 'left',
    color: 'url(#icon)'
}


