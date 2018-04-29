import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from './'

export const Spinner = () => <SpinWrapper>
    <Icon name='BlueSpinner' size='5vh' />
</SpinWrapper>


const rotating = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

const SpinWrapper = styled.div`
    animation: ${rotating} 2s linear infinite;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
