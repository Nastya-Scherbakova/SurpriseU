import * as React from 'react';
import { Input, Icon, Button } from '../atoms'
import { LoginForm , PresentForm} from '../organisms'
import { observer } from 'mobx-react';
import { ProfileTemplate} from '../templates'
import { Form, LoginField } from '../molecules'
import { Login } from '../../features'
import { Menu, Filter } from '../organisms'
@observer
export default class Anketa extends React.Component {
    render() {
        return <Login />;
    }
}

