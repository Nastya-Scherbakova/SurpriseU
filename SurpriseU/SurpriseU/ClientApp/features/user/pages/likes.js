import * as React from 'react';
import { inject, observer } from 'mobx-react';
import styled, { css } from 'styled-components'
import { ProfileTemplate } from '../../../ui/templates'
import { Cloud, Icon, IconLink } from '../../../ui/atoms'
import { Link, withRouter } from 'react-router-dom'
@inject('userStore')
@withRouter
@observer
export default class Likes extends React.Component {
    render() {
        const { currentUser } = this.props.userStore;
        const link = this.props.match.url;
        return <ProfileTemplate>
            <Cloud>
            </Cloud>
        </ProfileTemplate>;
    }
}
