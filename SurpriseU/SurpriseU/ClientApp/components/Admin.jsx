import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ReactDOM } from 'react';
import { PresentsList, Present } from './Present.jsx';

import '../css/style.css';

export class Admin extends React.Component {
    render() {
        return <div>
            <section className="menu-grad">
                <p className="line-1 anim-typewriter">PRIVET NASTYA </p>
            </section>
            <PresentsList apiUrl="/api/Presents" />,
        </div>;

    }
}
