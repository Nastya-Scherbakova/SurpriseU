import * as React from 'react';
import { NavMenu } from './NavMenu';
import '../css/style.css';
export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div>
            <div className='container-fluid pad'>
                    <NavMenu />
                </div>
                <div className='container'>
                    { this.props.children }
                </div>
        </div>;
    }
}
