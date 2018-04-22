import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

export const Image = styled.div`
    width: ${p => p.size};
    height: ${p => p.size};
    border-radius: 50%;
    overflow:hidden;
    background-size:cover;
    background-image:  url("${p => p.src}");
    ${p => p.round && css`
        border-radius: 50%;
    `}
`



//export const Image = (props) => <Img size={props.size} src={props.src} round={props.round} />


Image.propTypes = {
    size: PropTypes.string,
    src: PropTypes.string.isRequired,
    round: PropTypes.bool
}

Image.defaultProps = {
    size: '5vh',
    round: false
}