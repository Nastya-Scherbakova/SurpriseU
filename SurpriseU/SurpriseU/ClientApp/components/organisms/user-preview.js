
import * as React from 'react';
import styled, { css } from 'styled-components'
import { Cloudlet, Image, IconLink } from '../atoms'


const Add = <PlusWrapper>
    <IconLink to="/presents/new" name='Plus' color='white' size='2.5vh' />
</PlusWrapper>;


const PlusWrapper = styled.div`
        background: #E5E6FF;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        @media (orientation: portrait) {
            width: 10vh;
            height: 10vh;
        }
        @media (orientation: landscape) {
            width: 15vh;
            height: 15vh;
        }
`

