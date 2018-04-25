import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components'
import { ProfileTemplate } from '../templates'
import { Cloudlet , Cloud, Icon, IconLink} from '../atoms'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Tag } from '../molecules';
@inject('userStore')
@withRouter
@observer
export default class ProfilePage extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        const link = this.props.match.url;
        return <ProfileTemplate>
            <Cloud
                leftIcon={<Icon name='Search' color='#888898' />}
                rightIcon={<IconLink to={'/edit/account'} color='#888898' name='Edit' />}
            >
                <Main>
                    

                    <Column>
                        <Avatar src={currentUser.photo} size='15vh' />
                        <Name>{currentUser.name}</Name>
                        <Age>{currentUser.age}</Age>
                    </Column>
                    <Tags>

                        <Tag name='Instagram' check/>
                        <Tag name='кушать' check />
                        <Tag name='спать' check />
                        <Tag name='красивые фотки' check />
                        <Tag name='одежда' check />
                        </Tags>
                </Main>

             <Content>
              
                </Content>

                <Content>

                </Content>
                <Content>

                </Content>
                <div className='social-tabs'>
                    <div className='twitter'>   <Icon name='Twitter' />    </div>
                    <div className='social-border'>   <Icon name='Instagram' />    </div>
                    <div className='social-border'>   <Icon name='Facebook' />    </div>
                </div>
            </Cloud>
        </ProfileTemplate>;
    }
}

const presents = [
    { id: 1, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 2, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 3, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 4, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 5, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 6, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' },
    { id: 7, src: 'https://bake-n-cake.ru/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/v/a/vanilla-cupcakes2_1.jpg' }
];

const Main = styled.div`
display: flex;
    align-items:center;
        justify-content: space-between;
 height: 30%;
        width: 100%; 
margin-top: 2rem;
padding:1rem 2rem;
`
const Column = styled.div`
display:flex;
flex-direction: column;

`

const Tags = styled.div`
display:flex;
width: 60%;
padding: 1rem;
flex-wrap:wrap;
`


const Name = styled.span`
 font-family: 'Source Sans Pro', sans-serif;
                letter-spacing: 0.07rem;
                font-size: 1.5rem;
                color: #31394D;
                font-weight: bold;

`

const Age = styled.span`
 font-weight: 500;
                color: #9BA8B4;
                font-size: 1rem;
                letter-spacing: 0.08rem;
`
const Content = styled.div`
    display: flex;
    align-items:center;
        justify-content: space-around;
        height: 20%;
        width: 100%; 
border-radius: 2vh;
    background: rgba(255,255,255,0.7);
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.1);
    position: relative;
    overflow: hidden;
`


const Area = styled.div`


`