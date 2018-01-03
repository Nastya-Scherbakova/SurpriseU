import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from './Menu.jsx';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <Menu />;
    }
}
