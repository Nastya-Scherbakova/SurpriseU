import * as React from 'react';
import '../css/style.css';
import { $ } from 'jQuery';

const colors = ["#fff", "#fff", "#fff", "#fff", "#fff"];
var rows = [];


class One extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: `${Math.floor(Math.random() * 100)}vw`,
            top: `${Math.floor(Math.random() * 60)}vh`,
            transform: `scale(${Math.random()})`
        };
    }
    render() {
        return <div className="ball"
            style={this.state}> 
        </div >;
    }
};

for (var i = 0; i < 50; i++) {
    rows.push(<One key={i} />);
}

export class Ball extends React.Component {
   
    render() {
       return <div>
           {rows}
        </div>;
    }
}


