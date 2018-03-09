import * as React from 'react';
import ReactModal from 'react-modal';
import { PresentsList, NewPresent, Present } from './Present.jsx';
import { Plus, Settings, Search, ChevronRight, X, Search, Edit } from 'react-feather';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { HashTag } from './Layout';
import Ionicon from 'react-ionicons';

@inject('authStore', 'userStore')
@withRouter
@observer
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editModal: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    openEdit = () => this.setState({ editModal: true });
    hideEdit = () => this.setState({ editModal: false });
    render() {
        return <div className="info w-100 d-flex justify-content-around align-items-center">
            <div className="d-flex flex-column main align-items-center">
                <img className="img rounded-circle " /*src={this.props.user.photo} *//>
                    <div className="d-flex justify-content-around">
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  tel" /*href={this.props.user.telegram}*/></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  insta " /*href={this.props.user.instagram}*/></a>
                        <a className="d-flex justify-content-center align-items-center social-icon navlink-no  face" /*href={this.props.user.facebook}*/></a>
                    </div>
                    <div className="d-flex justify-content-center align-items-center button" onClick={this.openEdit}>
                    Редагувати
                     </div>
                    <div className="d-flex justify-content-center align-items-center button">
                    Пошук
                     </div>
            </div>
            <div className="d-flex flex-column other-data justify-content-around">
                <div className="d-flex align-items-center age">Дата народження<div ></div></div>
                <Likes /*user={this.props.user}*/ />
                <Friends /*user={this.props.user}*/ />
            </div>
            <ReactModal isOpen={this.state.editModal} onRequestClose={this.hideEdit} className='profile'>
                <EditUser toClose={this.hideEdit} />
            </ReactModal>
        </div>;
    }
}



class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div className="edit-user animated fadeInDown">
            <div className="content">
                {presents.map(present => LikedPresent)}
            </div>
            <div className='button'><X size="5vh" color='#600303' onClick={this.props.toClose} /></div>
        </div>;
    }
}



class Likes extends React.Component {
    render() {
        const likes = [{ name: 'спорт', id: '1' }, { name: 'хореографія', id: '2' }, { name: 'співати', id: '3' }, { name: 'програмування', id: '4'}];
        return <div className="w-100 h-25 d-flex flex-wrap align-items-center likes" >
            <div className="d-flex like-title align-items-center">Подобається</div>
            <input placeholder="+" />
            {
                likes.map(like => <HashTag key={like.id} name={like.name} check={true}/>)
            }
        </div>;
    }
}




class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    render() {
        return <div className="friends">
            <div className="title"><div className='text'>Друзі</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {LikedPresent}
                    {LikedPresent}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh'  onClick={this.showPresents} />
            </div>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>;
    }
}


class LikedPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    render() {
        return <div className="presents">
            <div className="title"><div className='text'>Вподобані подарунки</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    {presents.map(present => LikedPresent)}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' onClick={this.showPresents} />
            </div>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>;
    }
}




class AddedPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPresentModal: false,
            allPresents: false
        };
    }
    componentWillMount() {
        ReactModal.setAppElement('body');
    }
    showPresents = () => this.setState({ allPresents: true });
    hidePresents = () => this.setState({ allPresents: false });
    openAdd = () => this.setState({ newPresentModal: true });
    closeAdd = () => this.setState({ newPresentModal: false });

    render() {
        return <div className="presents">
            <div className="title"><div className='text'>Запропоновані подарунки</div></div>
            <div className="d-flex h-100 align-items-center">
                <div className="items">
                    <div className="user-present rounded-circle">
                        <div className="h-100 w-100 d-flex justify-content-center align-items-center plus-div" onClick={this.openAdd}><Plus className='plus ' size='7vh' /></div>
                    </div>
                    {presents.map(present => LikedPresent)}
                </div>
                <ChevronRight className="d-flex right-arrow align-items-center" size='10vh' onClick={this.showPresents}/>
            </div>
            <ReactModal isOpen={this.state.newPresentModal} onRequestClose={this.closeAdd} className='addPresent'>
                <NewPresent toClose={this.closeAdd} />
            </ReactModal>
            <ReactModal isOpen={this.state.allPresents} onRequestClose={this.hidePresents} className='profile'>
                <UserPresents toClose={this.hidePresents} />
            </ReactModal>
        </div>  
    }
}

const presents = ['item' ,
    'item', 'item ',
    'item' ,
   ' item' ];

class UserPresents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return <div className="all-content animated fadeInDown">
            <div className="title">Запропоновані подарунки</div>
            <div className="content">
                {presents.map(present => LikedPresent)}
            </div>
            <div className='button'><X size="5vh" color='#600303' onClick={this.props.toClose}/></div>
        </div>;
    }
}

@inject('authStore', 'userStore')
@withRouter
@observer
export class Profile extends React.Component {
    render() {
        const { isUser, currentUser } = this.props.userStore;
        return <div className="profile h-100 w-100">
         
            <div className='profile-area d-flex flex-column justify-content-around'>
                <div className="d-flex justify-content-center align-items-center w-100 name">{currentUser.name}</div>
                <Info user={currentUser} />
                <div className='d-flex content align-items-center'>
                    <LikedPresents />
                    <AddedPresents />
                </div>
            </div>

            {!isUser && <Redirect to="/login" />}
        </div>;
    }
}
//<svg className='icon' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//    <path d="M9.028 20.837c-.714 0-.593-.271-.839-.949l-2.103-6.92L22.263 3.37" />
//    <path d="M9.028 20.837c.552 0 .795-.252 1.105-.553l2.941-2.857-3.671-2.214" />
//    <path d="M9.403 15.213l8.89 6.568c1.015.56 1.748.271 2-.942l3.62-17.053c.372-1.487-.564-2.159-1.534-1.72L1.125 10.263c-1.45.582-1.443 1.392-.264 1.753l5.455 1.7L18.94 5.753c.595-.36 1.143-.167.694.232" />
//</svg>
//    <svg className='icon' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />

//    </svg>
//    <svg className='icon' role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
//    </svg>

@inject('authStore', 'userStore')
@withRouter
@observer
export class TestProfile extends React.Component {
    render() {
        const likes = [{ name: 'спорт', id: '1' }, { name: 'хореографія', id: '2' }, { name: 'співати', id: '3' }, { name: 'програмування', id: '4' }];
        return <div className="profile2">
         
           <div className='img-2'></div>  <div className='img-3'></div>
            <div className='img-4'></div>  <div className='img-5'></div>  <div className='img-6'></div>
            <div className='img-7'></div>  <div className='img-8'></div>  <div className='img-9'></div>
            <div className='profile-div d-flex'>
              
                <div className='back-div'></div>  
  <div className='back-div2'></div> 
  <div className="main d-flex flex-column align-items-center">
                    <div className='main-shadow1'></div>
                    <div className='main-shadow2'></div>
                    <div className='top-image'>

                        {Search}
                        <img className="photo" />
                        {Edit}
                    </div> 
                   
                    <div className='info'>
                    <div className="name">Влада</div>
                        
                
                    <div className="age">
                        <div className="d-flex title align-items-center">{Cake}</div>02.01.1999
                     </div>

                      <div className=" d-flex flex-wrap align-items-center likes" >
                         <div className="d-flex title align-items-center"> {Heart}</div>
                            <br />
                            <input placeholder="+" />
                                    {
                                        likes.map(like => <HashTag key={like.id} name={like.name} check={true} />)
                                    }
                             </div>
                    </div>


                    <div className='social-tabs d-flex justify-content-around align-items-center'>
                        {Twitter}
                        {Instagram}
                        {Facebook}
                    </div>
                </div>




                <div className='d-flex flex-column user align-items-center justify-content-around'>
                    <div className="presents">
                        <div className="title"><div className='text'>Друзі</div></div>
                        <div className="d-flex h-100 items align-items-center">
                            {LikedPresent}
                            {LikedPresent}
                        </div>
                    </div>
                    <div className="presents">
                        <div className="title"><div className='text'>Вподобані подарунки</div></div>
                        <div className="d-flex h-100 items align-items-center">
                                {presents.map(present => LikedPresent)}
                        </div>
                    </div>
                    
                    <div className="presents">
                        <div className="title"><div className='text'>Запропоновані подарунки</div></div>
                        <div className="items">
                            <div className="user-present rounded-circle">
                                <div className="h-100 w-100 d-flex justify-content-center align-items-center plus-div"><Plus className='plus ' size='7vh' /></div>
                            </div>
                            {presents.map(present => LikedPresent)}
                        </div>
                       
                    </div>  
                </div>



            </div>
           
        </div>;
    }
}



const LikedPresent = <div className="user-present rounded-circle border-0">
    <img className="h-100 rounded-circle border-0" src="https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800" />
</div>;

const Instagram = <div className='social-border'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" >
        <defs>
            <linearGradient id="gradient2">
                <stop offset="10%" stop-color="#FCBC59" />
                <stop offset="55%" stop-color="#EE494C" />
                <stop offset="100%" stop-color="#8142C4" />
            </linearGradient>
        </defs>
        <g className="inst" stroke="url(#gradient2)">
            <path d="M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192c88.352,0,160-71.648,160-160V160 C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112V160C48,98.24,98.24,48,160,48 h192c61.76,0,112,50.24,112,112V352z" />
        </g>
        <g className="inst" stroke="url(#gradient2)">
            <path d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128S326.688,128,256,128z M256,336 c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80C336,300.096,300.096,336,256,336z" />
        </g>
        <g className="inst" stroke="url(#gradient2)">
            <circle cx="393.6" cy="118.4" r="17.056" />
        </g>
</svg></div>;

const Facebook = <div className='social-border'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000">
    <defs>
        <linearGradient id="gradient3">
            <stop offset="10%" stop-color="#636E93" />
            <stop offset="100%" stop-color="#130CB7" />
        </linearGradient>
    </defs>
    <path className="fa" stroke="url(#gradient3)" d="M583.5,341.5h143.4L710.2,500H583.5v459.8H393.2V500h-94.9V341.5h94.9v-95.4 	c0-67.7,16-118.9,48-153.7s84.6-52.2,157.9-52.2h126.7v158.5h-79.2c-14.5,0-26.1,1.2-34.9,3.6c-8.7,2.4-15.1,6.8-19,13.1 	s-6.4,12.7-7.5,19.3s-1.7,15.7-1.7,27.6V341.5L583.5,341.5z" />
    </svg></div>;

const Twitter = <div className='twitter'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" >
    <defs>
        <linearGradient id="gradient1">
            <stop offset="10%" stop-color="#0283BF" />
            <stop offset="100%" stop-color="#03A9F4" />
        </linearGradient>
    </defs>
    <path stroke="url(#gradient1)" className="tw" d="M112.5,748.5c57.3,5,112.2-2.8,164.8-25.5c25.3-10.9,60.4-32,69.1-41.6c-2-0.2-3.8-0.4-5.5-0.6c-1.6-0.2-3.2-0.5-4.9-0.6 			c-18.1-1.4-35.3-6.1-51.7-13.8c-40-18.9-68-49.1-83.9-90.6c-0.7-1.9-1.2-3.8-2.1-6.3c6.3,0.6,11.9,1.3,17.5,1.7 			c5.9,0.4,11.8,0.8,17.7,0.6c5.7-0.1,11.4-0.8,17-1.6c5.6-0.8,11.2-1.9,17.3-3c-1.5-1.8-3-2-4.4-2.4 			c-49.5-13.3-85.3-43.1-107.2-89.3c-9.4-19.8-14-40.8-14.4-62.7c0-1.7,0.2-3.5,0.3-5.8c6.1,2.8,11.5,5.5,17.1,7.7 c5.7,2.2,11.5,4.2,17.3,5.9c5.7,1.6,11.5,2.9,17.3,3.9c5.9,1,11.9,2.3,18.8,1.7c-2.8-2.9-5.7-4.4-8.1-6.5c-2.7-2.2-5.4-4.4-8-6.7 			c-2.4-2.2-4.8-4.4-7.1-6.8c-2.3-2.3-4.5-4.7-6.7-7.2c-2.3-2.6-4.5-5.3-6.6-8c-2-2.6-3.9-5.2-5.7-7.9c-1.8-2.7-3.6-5.5-5.2-8.3 			c-1.7-3-3.4-6-5-9.1c-1.5-2.9-2.9-5.9-4.2-8.8c-1.3-3-2.5-6-3.6-9.1c-1.2-3.3-2.2-6.6-3.2-9.9c-0.9-3.1-1.7-6.3-2.4-9.5 			c-0.7-3.2-1.4-6.4-1.9-9.6c-0.6-3.4-1-6.9-1.3-10.3c-0.3-3.2-0.4-6.5-0.5-9.8c-0.1-3.3-0.1-6.5,0-9.8c0.1-3.5,0.1-6.9,0.4-10.4 			c0.3-3.3,0.7-6.5,1.2-9.7c0.5-3.2,1.2-6.4,1.9-9.6c0.8-3.4,1.6-6.7,2.5-10.1c0.9-3.1,1.8-6.3,2.9-9.3c1.1-3.1,2.3-6.1,3.5-9.1 			c1.4-3.2,2.8-6.3,4.3-9.4c1.4-2.9,3.1-5.7,4.6-8.5c2.4,0.8,3.4,2.7,4.7,4.3c29.8,35.4,64,65.7,102.9,90.8 			c45.1,29.1,93.8,49.7,146.2,61.5c13.5,3,27.1,5.7,40.9,7.2c10.1,1.1,20.3,2.2,30.4,3.2c2,0.2,4,0.5,6.3-0.3 			c-7.9-39-3.7-76.4,15.1-111.6c15.6-29.2,38.3-51.5,67.7-67c57.9-30.6,137.5-24.2,192.1,32.4c8.8-1.3,17.6-3.6,26.4-6.3 			c8.6-2.6,17.1-5.3,25.5-8.5c8.6-3.3,17-6.9,25.3-10.8c8-3.8,15.8-8.1,23.9-12.2c-1,10.3-13.5,34.3-25.7,49.7 			c-11.6,14.7-25.4,26.9-41,37.5c30.5-3.3,59.5-11.6,87.4-23.6c1.3,1,0.3,1.6,0,2.3c-0.3,0.7-0.9,1.4-1.3,2 			c-13,18.6-27.7,35.8-44.3,51.4c-10.1,9.5-20.8,18.4-32.4,26.8c0,1.4,0,3,0,4.6c0,3.3,0.1,6.5,0.1,9.8 			c0.8,48.8-6.7,96.4-21.3,142.8c-18.6,59.2-47.3,113.2-87.1,161c-60.6,73-136.8,121.8-228.9,145.5c-16.4,4.2-33,7.3-49.7,9.8 			c-30.6,4.6-61.3,5.5-92.2,4.5c-12-0.4-24-1.7-35.9-3.2c-21.5-2.7-42.6-6.9-63.5-12.6c-42.5-11.7-82.5-29.2-120-52.4 			C115,750.4,113.8,749.4,112.5,748.5z" />
</svg></div>;

const Heart = <div className='items-border'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 455.111 455.111" width='3vh' height='3vh' >
    <defs>
        <linearGradient id="gradient4">
            <stop offset="10%" stop-color="#31274A" />
            <stop offset="100%" stop-color="#B8B9D7" />
            <stop offset="100%" stop-color="#615481" />
        </linearGradient>
    </defs>
    <path stroke="url(#gradient4)" className="cake other-width" d="M455.111,164.089c0,137.956-163.556,228.978-213.333,253.156c-8.533,4.267-19.911,4.267-28.444,0 C163.556,393.067,0,304.889,0,164.089C0,92.978,52.622,34.667,116.622,34.667c51.2,0,93.867,35.556,109.511,85.333 c15.644-49.778,59.733-85.333,109.511-85.333C402.489,34.667,455.111,92.978,455.111,164.089z"/>
    <path stroke="url(#gradient4)" className="cake other-width" d="M455.111,164.089c0,137.956-163.556,228.978-213.333,253.156c-8.533,4.267-19.911,4.267-29.867,0 c-22.756-9.956-65.422-34.133-108.089-68.267h1.422c135.111,0,243.2-109.511,243.2-243.2c0-24.178-4.267-48.356-11.378-71.111 C403.911,36.089,455.111,92.978,455.111,164.089z"/>
    <path stroke="url(#gradient4)" className="cake other-width" d="M109.511,142.756c-22.756,5.689-44.089-2.844-48.356-18.489 C58.311,107.2,72.533,90.133,95.289,84.444s44.089,2.844,48.356,18.489C147.911,120,132.267,137.067,109.511,142.756z"/>
</svg></div>;

const Cake = <div className='items-border'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 56.277 56.277" width='3vh' height='3vh' >
    <g>
        <path stroke="url(#gradient4)" className="cake cake-width" d="M9.51,3.342c0.536,0.418,0.934,0.9,1.243,1.381C9.698,5.117,8.741,5.716,7.947,6.51L7.033,7.424 c-3.415,3.415-3.004,9.381,0.914,13.299c1.776,1.776,4.138,2.755,6.649,2.755c2.512,0,4.874-0.979,6.649-2.755 C23.022,18.947,24,16.586,24,14.073c0-2.512-0.978-4.873-2.754-6.649c-2.058-2.059-4.786-3.238-7.484-3.238 c-0.327,0-0.648,0.022-0.965,0.057c-0.437-0.828-1.078-1.708-2.027-2.455c-2.008-1.583-4.771-2.119-8.211-1.59 C2.011,0.281,1.636,0.791,1.72,1.337c0.083,0.547,0.6,0.922,1.14,0.837C5.718,1.738,7.956,2.129,9.51,3.342z M11.416,8.531 c0.87,0.869,2.287,0.869,3.157,0c0.391-0.391,1.024-0.391,1.415,0c0.39,0.391,0.39,1.024,0,1.414 c-0.825,0.825-1.909,1.237-2.993,1.237c-1.084,0-2.167-0.412-2.993-1.237c-0.391-0.391-0.391-1.023,0-1.414 C10.391,8.141,11.025,8.141,11.416,8.531z"/>
        <path stroke="url(#gradient4)" className="cake cake-width" d="M50.943,24.861c0.069-0.376,0.104-0.753,0.104-1.127c0-2.943-2.044-5.686-5.772-7.766 c-0.086-1.971-0.666-8.175-4.506-12.038c-2.404-2.418-5.627-3.458-9.54-3.07c-0.343,0.034-0.645,0.242-0.798,0.552 c-0.153,0.31-0.136,0.675,0.045,0.969c0.634,1.026,1.745,3.506,1.131,4.618c-0.263,0.478-0.929,0.725-1.979,0.735 c-1.806,0.019-3.578,0.191-5.261,0.476C25.424,9.964,26,11.972,26,14.073c0,3.047-1.187,5.911-3.34,8.064 c-2.153,2.153-5.017,3.34-8.063,3.34c-2.297,0-4.49-0.677-6.354-1.933c-0.002,0.063-0.013,0.126-0.013,0.189 c0,0.375,0.035,0.752,0.103,1.127c-2.374,1.92-3.625,4.143-3.625,6.46c0,0.179,0.012,0.357,0.027,0.534l0.01-0.01 c1.226-1.209,2.792-1.85,4.525-1.85c2.663,0,5.233,1.518,7.173,3.079c2.683-1.039,6.069-0.353,9.052,1.729 c2.719-1.451,6.187-1.452,8.906-0.005c2.951-2.073,6.303-2.76,8.967-1.729c1.931-1.56,4.488-3.073,7.14-3.073 c1.519,0,2.907,0.494,4.053,1.435c0.001-0.036,0.007-0.073,0.007-0.109C54.568,29.003,53.318,26.781,50.943,24.861z M15.992,28.447 c-0.148,0.405-0.531,0.657-0.939,0.657c-0.114,0-0.229-0.02-0.342-0.061c-1.111-0.404-2.181-0.875-3.181-1.398 c-0.489-0.256-0.679-0.859-0.423-1.35c0.256-0.488,0.86-0.68,1.35-0.422c0.922,0.481,1.911,0.916,2.939,1.291 C15.914,27.354,16.181,27.927,15.992,28.447z M29.886,18.146c4.132,0,8.052-0.523,11.335-1.515c0.527-0.158,1.087,0.14,1.247,0.668 c0.159,0.529-0.14,1.087-0.668,1.246c-3.468,1.047-7.588,1.601-11.913,1.601c-0.552,0-1-0.447-1-1S29.334,18.146,29.886,18.146z M36.279,31.019c-2.216,0.288-4.436,0.433-6.644,0.433c-2.042,0-4.073-0.123-6.08-0.37c-0.548-0.067-0.938-0.565-0.871-1.114 c0.068-0.548,0.575-0.938,1.115-0.87c4.012,0.492,8.124,0.472,12.222-0.061c0.55-0.07,1.049,0.314,1.121,0.862 S36.827,30.948,36.279,31.019z M47.861,27.638c-1.695,0.895-3.676,1.654-5.887,2.258c-0.088,0.024-0.177,0.035-0.264,0.035 c-0.44,0-0.843-0.292-0.964-0.737c-0.145-0.532,0.169-1.082,0.702-1.228c2.07-0.564,3.914-1.271,5.48-2.098 c0.488-0.256,1.094-0.07,1.351,0.418C48.536,26.775,48.349,27.379,47.861,27.638z"/>
        <path stroke="url(#gradient4)" className="cake cake-width" d="M50.508,31.995c-2.567,0-5.201,1.954-6.854,3.466c-0.855-0.58-1.861-0.883-2.956-0.883c-1.983,0-4.242,0.984-6.181,2.666 c-1.303-1.003-2.892-1.546-4.563-1.546c-1.673,0-3.263,0.544-4.566,1.548c-1.959-1.683-4.24-2.668-6.241-2.668 c-1.106,0-2.122,0.304-2.985,0.887c-1.661-1.512-4.309-3.47-6.89-3.47c-1.214,0-2.265,0.429-3.123,1.275l-0.477,0.469l4.751,11.704 l0.048,0.102c3.184,5.854,5.869,7.345,11.684,9.574c1.918,0.735,4.739,1.157,7.74,1.157c3.002,0,5.816-0.422,7.72-1.158 c5.825-2.251,8.508-3.738,11.63-9.479l4.851-11.898l-0.474-0.47C52.765,32.425,51.718,31.995,50.508,31.995z M20.172,48.995 c-0.137,0.064-0.281,0.095-0.423,0.095c-0.376,0-0.736-0.213-0.906-0.576l-2.764-5.904c-0.234-0.5-0.019-1.096,0.482-1.329 c0.501-0.233,1.096-0.019,1.33,0.481l2.764,5.904C20.888,48.166,20.672,48.762,20.172,48.995z M26.352,51.174 c-0.052,0.008-0.104,0.012-0.156,0.012c-0.484,0-0.91-0.353-0.987-0.846l-0.921-5.904c-0.085-0.546,0.289-1.058,0.834-1.143 c0.546-0.081,1.057,0.288,1.143,0.834l0.921,5.904C27.271,50.577,26.898,51.089,26.352,51.174z M34.557,50.34 c-0.077,0.493-0.503,0.846-0.987,0.846c-0.051,0-0.104-0.004-0.156-0.012c-0.545-0.085-0.919-0.597-0.834-1.143l0.921-5.904 c0.085-0.546,0.596-0.915,1.143-0.834c0.545,0.085,0.919,0.597,0.834,1.143L34.557,50.34z M43.688,42.61l-2.764,5.904 c-0.17,0.363-0.53,0.576-0.906,0.576c-0.142,0-0.287-0.03-0.423-0.095c-0.5-0.233-0.716-0.829-0.482-1.329l2.764-5.904 c0.233-0.501,0.831-0.717,1.33-0.481C43.707,41.514,43.922,42.11,43.688,42.61z"/>
</g>
</svg></div>;

const Edit = <div className='settings'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 478.703 478.703" width='4vh' height='4vh' >
    <g>
        <path stroke="url(#gradient4)" className="cake other-width " d="M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8 c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2 c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8 c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1 c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8 c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5 l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6 c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1 l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1 C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9 c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8 c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42 c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8 c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8 c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2 c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42 c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6 c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1 c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8 c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7 c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z"/>
        <path stroke="url(#gradient4)" className="cake other-width"  d="M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001 z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z"/>
    </g>
</svg></div>;

const Search = <div className='settings'><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width='4vh' height='4vh' >
    <g>
        <path stroke="url(#gradient4)" className="cake other-width" d="M495,466.2L377.2,348.4c29.2-35.6,46.8-81.2,46.8-130.9C424,103.5,331.5,11,217.5,11C103.4,11,11,103.5,11,217.5   S103.4,424,217.5,424c49.7,0,95.2-17.5,130.8-46.7L466.1,495c8,8,20.9,8,28.9,0C503,487.1,503,474.1,495,466.2z M217.5,382.9   C126.2,382.9,52,308.7,52,217.5S126.2,52,217.5,52C308.7,52,383,126.3,383,217.5S308.7,382.9,217.5,382.9z" />
    </g>
</svg></div>;
//<a className="d-flex justify-content-center align-items-center social-icon navlink-no edit"></a>