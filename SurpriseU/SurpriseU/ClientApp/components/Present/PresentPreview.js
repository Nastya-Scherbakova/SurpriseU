import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from '../Shared/Icons';
import Like from '../Shared/Like';
import { object, bool } from 'prop-types'
import Radium from 'radium';
import Fade from 'react-reveal/Fade';
@Radium
export default class PresentPreview extends React.Component {
    state = {
        data: this.props.present,
        liked: false
    }
    static propTypes = {
        present: object.isRequired,
        liked: bool
    }
    onLike = () => this.setState(prevState => ({ liked: !prevState.liked }));
    readMore = () => this.props.getPresent(this.state.data.id);
    render() {
        const { present } = this.props;
        return <Fade bottom ><div style={styles.present}>
            <img style={styles.photo} src={present.photo} />
            <div style={styles.main}>
                <div style={styles.title}>{present.title}</div>
                <div style={styles.info}>
                    {present.content}
                </div>
                <div style={styles.bottom}>
                    <div onClick={this.readMore} style={styles.more}>
                        Читати далі
                        <Icon name='RightArrow' style={{ marginLeft: '1vh', width: '2vh', height: '2vh'}}/>
                    </div>
                    <div style={styles.likes}>
                        <img src='https://www.handletheheat.com/wp-content/uploads/2015/02/Chocolate-Raspberry-Cupcakes-square.jpg' style={styles.user} />
                        <img src='https://merrybee.com.ua/wp-content/uploads/2017/05/DSC_1829-min.jpg' style={styles.user} />
                        <img src='http://shop.djournal.com.ua/published/publicdata/DMAGAZIN/attachments/SC/products_pictures/oh-my-book-ua-bir-11.jpg' style={styles.user} />
                        <div style={styles.amount}>+10</div> 
                          <Like liked={this.state.liked} onLike={this.onLike} />
                    </div>
                </div>
            </div>
        </div>
        </Fade>;
    }
}


var styles = {
    present: {
        height: '20vh',
        position: 'relative',
        paddingLeft: '10vh',
        '@media (orientation: landscape)': {
            width: '40vw',
            margin: '2vh 2vw'
        },
        '@media (max-width: 800px)': {
            width: '90vw',
            margin: '2vh 5vw'
        },
        '@media(orientation: portrait)': {
            width: '90vw',
            margin: '2vh 5vw'
        }
    },
    photo: {
        height: '20vh',
        width: '20vh',
        position: 'absolute',
        left: '0',
        backgroundSize: 'cover',
        borderRadius: '50%'
    },
    main: {
        width: '100%',
        borderRadius: '0 3vh 3vh 0',
        height: '100%',
        padding: '4vh 2vh 0 13vh',
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '5px 5px 5px -5px rgba(0, 0, 0, 0.3)'
    },
    title: {
        position: 'absolute',
        fontFamily: "'Lobster', cursive",
        fontSize: '4vh',
        top: '-2vh',
        left: '15vh',
        width: '70%',
        textAlign: 'center'
    },
    info: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '70%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center'
    },
    bottom: {
        fontSize: '1.2em',
        color: '#282F49',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        maxHeight: '3vh',
        position: 'relative',
        bottom: '0'
    },
    more: {
        color: '#444C54',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        fontSize: '0.8em',
        letterSpacing: '0.05em',
        fontWeight: '500',
    },
    likes: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.8em',
        fontWeight: '500',
    },
    user: {
        width: '3vh',
        height: '3vh',
        borderRadius: '50%',
        marginRight: '-1vh',
        backgroundSize: 'cover'
    },
    amount: {
        margin: '1vh'
    }
};