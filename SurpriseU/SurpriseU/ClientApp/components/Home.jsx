import * as React from 'react';
import { ReactDOM } from 'react-dom';
import { PresentsList } from './Present';
import { HashTag } from './Layout';
import { inject, observer } from 'mobx-react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { X, Check } from 'react-feather';
import Radium, { StyleRoot } from 'radium';
import { fadeInRight, fadeInDown, fadeInLeft, fadeInUp, fadeInRightBig} from 'react-animations';
import 'scrollpos-styler';
import Ionicon from 'react-ionicons';
import scrollToComponent from 'react-scroll-to-component';
import { ParallaxProvider, Parallax, ParallaxBanner  } from 'react-scroll-parallax';
import Anime from 'react-anime';
@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export class Home extends React.Component{
    render() {
        const { isFilter } = this.props.presentsStore;
        return <ParallaxProvider>
            <div>
            <div className={`${isFilter && 'image-fixed'}  home-image`}>
                    <div className='home-name fromTop'>SURPRISEU</div>
                    <div className='img-1 fromRight' ><img src='https://i.pinimg.com/736x/26/55/32/265532d484558d8230d18de71745ef2e.jpg' /></div>
                    <div className='img-2 fromLeft' ><img src='http://lespartisanes.com/journal/wp-content/uploads/LOOKBOOK-4.jpg' />
                    <div className='home-button'>Знайти подарунок</div>
                </div>
                    <div className='img-3 fromTop' ><img src='https://cheeseit.ru/wp-content/uploads/2017/11/3-07afa11bc01b124f9a57d7ee1ad6e3b6.jpg' /></div>
                    <div className='text-div fromRight'><span className='underline-text'>тут красивая анимация<br />не придумала надпись ахах</span></div>
               
                        <div className='border-back-1 fromTop'></div>
                   
             
                        <div className='img-1-back fromRight' ></div>
             
                        <div className='img-2-back fromLeft' ></div>
                <div className='img-3-back fromTop' ></div>
            </div>
            {isFilter && <Filter />}
            <div className='scroll-to-presents' onClick={() => scrollToComponent(this.Presents, { offset: -80, align: 'top', duration: 500, ease:'inCirc' })}>
                <Ionicon icon="ios-arrow-down" className='ios-down' onClick={this.openSearch} />
            </div>
          
           
            <section ref={(section) => { this.Presents = section; }}><PresentsList /></section>

        </div>
        </ParallaxProvider>;
    }
}
//<ParallaxBanner
//    className='home-parallax'
//    layers={[
//        {
//            image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner.jpg',
//            amount: 0.3,
//            slowerScrollRate: true,
//        },
//    ]}
//    style={{
//        height: '80vh',
//    }}
//>
//    <div className='layer-1'>
//        <h1>Headline Text</h1>
//    </div>
//</ParallaxBanner>

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '0',
            startAge: '',
            endAge: '',
            likesTags: [],
            celebrationTags: [],
            likes: '',
            celebration: '',
            likesAuto: [],
            celebrationAuto: [],
        };
        this.onChange = this.onChange.bind(this);
        this.openFilter = this.openFilter.bind(this);
        this.search = this.search.bind(this);
        this.renderOffers = this.renderOffers.bind(this);
    }
    
    
    addTag = tag => {
        let type = tag.type == '0' ? 'likes' : 'celebration';
        this.state[`${type}Tags`].map(x => x.id).indexOf(tag.id) == -1 && this.setState({
            [`${type}Tags`]: this.state[`${type}Tags`].concat({ id: tag.id, name: tag.name }),
            [type]: '',
            [`${type}Auto`]: []
        });
    }

    deleteTag = tag => {
        let type = this.state.likesTags.map(x => x.id).indexOf(tag.id) != -1 ? 'likes' : 'celebration';
        let tags = this.state[`${type}Tags`];
        tags.splice(tags.findIndex(x => x.id === tag.id), 1);
        this.setState({ [`${type}Tags`]: tags })
    }
    
    openFilter = () => this.props.presentsStore.enableFilter();

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    search = e => {
        e.preventDefault();
        let tags = this.state.likesTags.map(e => Object.assign({}, { id: e.id })).concat(this.state.celebrationTags.map(e => Object.assign({}, { id: e.id})));
        this.props.presentsStore.searchPresents({
            keyWord: this.props.presentsStore.search,
            gender: Number(this.state.gender),
            startAge: Number(this.state.startAge),
            endAge: Number(this.state.endAge),
            tags: tags
        });
    };

    renderOffers = (e) => {
        this.onChange(e);
        const inputValue = e.target.value.trim().toLowerCase(),
            inputLength = inputValue.length,
            suggestions = inputLength === 0 ? [] : this.props.tagsStore[`${e.target.name}Store`].filter(
                item => item.name.toLowerCase().slice(0, inputLength) === inputValue);
        this.setState({ [`${e.target.name}Auto`]: suggestions });
    };


    render() {
        return <div className='filter-form animated fadeInDown '>
                <div className='d-flex w-100 h-75 justify-content-around align-items-center'>
                    <div className='d-flex flex-column align-items-center w-25 h-75'>
                        <input className='text'
                            name="startAge"
                            placeholder="Початковий вік"
                            value={this.state.startAge}
                            onChange={this.onChange} />
                        <input className='text'
                            name="endAge"
                            placeholder="Кінцевий вік"
                            value={this.state.endAge}
                            onChange={this.onChange} />
                        <div className='gender d-flex justify-content-around'>
                            {[
                                { value: 1, gender: "male" },
                                { value: 0, gender: "both" },
                                { value: 2, gender: "female" }
                            ].map((item) => <label key={item.value}>
                                <input type="radio" value={item.value} name="gender" checked={this.state.gender === item.value} onChange={this.onChange} onClick={this.validateField} />
                                <div className={(this.state.gender == item.value) ? (item.gender + ' ' + item.gender + '-checked') : (item.gender)} ></div>
                            </label>)}
                        </div>
                      
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <input className='text-tag'
                        name="likes"
                        placeholder="Подобається"
                        value={this.state.likes}
                        onChange={this.renderOffers} />
                        <div className='popular-tags d-flex flex-wrap justify-content-start align-items-start'>
                        {this.state.likesTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {this.state.likesAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.addTag.bind(this, tag)} />) }
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <input className='text-tag'
                        name="celebration"
                        placeholder="Свята"
                        value={this.state.celebration}
                        onChange={this.renderOffers} />
                        <div className='popular-tags d-flex flex-wrap justify-content-start align-items-start'>
                        {this.state.celebrationTags.map(tag => <HashTag key={tag.id} name={tag.name} check={true} onClick={this.deleteTag.bind(this, tag)} />)}
                        {this.state.celebrationAuto.map(tag => <HashTag key={tag.id} name={tag.name} check={false} onClick={this.addTag.bind(this, tag)} />)}
                        </div>
                    </div>
                </div>
                <div className='w-100 d-flex justify-content-center icons'>
                    <Check className='icon' onClick={this.search} />
                    <X className='icon' onClick={this.openFilter} />
                </div>
        </div>;
    }
}


const styles = {
    fadeInDown: {
        animation: '1s',
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    fadeInRight: {
        animation: '1s',
        animationName: Radium.keyframes(fadeInRight, 'fadeInRight')
    },
    fadeInLeft: {
        animation: '1s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeInUp: {
        animation: '1s',
        animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
    },
    fadeInRightBig: {
        animation: '1s',
        animationName: Radium.keyframes(fadeInRightBig, 'fadeInRightBig')
    }
}

