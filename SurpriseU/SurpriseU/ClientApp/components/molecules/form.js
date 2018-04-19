import React from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'


import { color, font } from '../theme'

import { Layout } from '../atoms'

const FormWrapper = styled.div`
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
`
const Title = styled.div`
    position: relative;
    top: 0;
    font-size: 1.5rem;
    padding: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.3rem;
    text-align: center;
    color: #888898;
`

export const Form = ({ children, header }) => (
    <FormWrapper>
        <Title>{header}</Title>
        <Layout
            flow='column'
            padding={2}
            justify='space-between'
            align='center'
            gap={2}>
            {children}
        </Layout>
    </FormWrapper>
)


Form.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
}

Form.defaultProps = {
    header: 'Редагувати',
}