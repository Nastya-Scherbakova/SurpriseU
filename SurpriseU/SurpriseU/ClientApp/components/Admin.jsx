import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReactDOM } from 'react';
import { PresentsList, Present } from './Present.jsx';
export class Admin extends React.Component {
    render() {
        return <div>
            <div className="container-fluid ">
                <p>Admin</p>
                <PresentsList apiUrl="/api/presents" />
               
            </div>
        </div>;

    }
}
