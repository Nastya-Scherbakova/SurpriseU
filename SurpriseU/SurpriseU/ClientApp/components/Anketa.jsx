import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';
import { PresentsList, NewPresent } from './Present.jsx';


export class Anketa extends React.Component {
    render() {
        return <div className="profile h-100 w-100">
            <NewPresent apiUrl="/api/Presents"/>
        </div>;
    }
}