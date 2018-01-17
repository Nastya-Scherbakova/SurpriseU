import * as React from 'react';
import '../css/style.css';
import '../css/bootstrap.css';
import { PresentsList, Present } from './Present.jsx';

export class Anketa extends React.Component {
    render() {
        return <div>
            <div className="home-image">

            </div>
            <PresentsList apiUrl="/api/Presents" />

        </div>;

    }
}
