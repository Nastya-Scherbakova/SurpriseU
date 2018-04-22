import React from 'react'
import styled, { keyframes  } from 'styled-components'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { color } from '../theme'

import { Image, Icon, Cloud, Spinner, IconLink } from '../atoms'
import { Like } from '../molecules'
import { ProfileTemplate } from '../templates'

@inject('presentsStore')
@withRouter
@observer
export default class PresentPage extends React.Component {
    state = { liked: false }


    onLike = () => {
        this.setState(prevState => ({ liked: !prevState.liked }));
    }


    componentDidMount = () => this.props.presentsStore.getPresent(this.props.match.params.presentId);


    onRemovePresent = () => this.props.presentsStore.deletePresent(this.props.match.params.presentId);
    render() {
        const present = this.props.presentsStore.presentById;
        return <ProfileTemplate><Cloud rightIcon={<Like liked={this.state.liked} onClick={this.onLike}/>}>
            {present == null ? <Spinner /> : 
                <Wrapper>
                    <Image size='30vh' round src={present.photo} />
                    <Title>{present.title}</Title>
                    <Item>
                        <Item><Icon size='2vh' color='#7496DB' name='UserSimple' />
                            ж, ч </Item>
                        <Item> <Icon size='2vh' color='#7496DB'  name='Clock' />

                            {present.startAge}-{present.endAge}</Item>
                        <Item> <Icon size='2vh' color='#7496DB' name='HeartOutline' />
                               12 </Item>
                    </Item>
                    <Info>{present.content}</Info>
                </Wrapper>}
            <Settings>
                <IconLink color={color.darkGrey} to={`${this.props.match.url}/edit`} name='Pencil' />
                <Icon color={color.darkGrey} onClick={this.onRemovePresent} name='Trash' />
            </Settings>
        </Cloud></ProfileTemplate>;
    }
}



const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
padding: 2rem;

`

const Title = styled.div`
    font-size: 1.6rem;
    text-align: center;
    padding: 1rem;
`

const Item = styled.div`
 display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 0 2rem;
width: 60%;

`

const Info = styled.div`
 padding: 1vh 0;
`

const Settings = styled.div`

position: absolute;
bottom: 2rem;
margin: auto;
left: 0;
right: 0;
display: flex;
width: 20%;
justify-content: space-between;
`