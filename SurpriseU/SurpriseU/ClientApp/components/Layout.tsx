import * as React from 'react';
import { Menu } from './Menu.jsx';
import '../css/style.css';
export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <div className='container-fluid pad'>
                    <Menu />
                </div>
            <div>
                    { this.props.children }
                </div>
        </div>;
    }
}
