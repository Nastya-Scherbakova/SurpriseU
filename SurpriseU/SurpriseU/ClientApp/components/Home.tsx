import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {ReactDOM } from 'react';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div className="container-fluid ">
              
                <p>Home</p>
                </div>
        </div>;

    }
}

