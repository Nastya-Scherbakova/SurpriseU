import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {ReactDOM } from 'react';
import { PresentsList, Present } from './Present.jsx';
import '../css/style.css';
var test = {
        title: "Капкейки",
        content: "Красивые капкейки - украшение любого праздника. Мы предлагаем наборы оригинальных капкейков на любой вкус, а так же на заказ.",
        gender: 0,
        photo: "https://avatars.mds.yandex.net/get-pdb/51720/a98cbb00-060c-4d87-b5fa-ef7500a58dd5/s800",
        age: [0, 100],
        likes: ["asdds", "Asdfsds"],
        hobbies: ["asdds", "Asdfsds"],
        celebration: 0,
        id: 1
    }


export class Home extends React.Component{
    render() {
        return <div>
		<div className="home-image">
		<div className="menu-grad">
		<p className="line-1 anim-typewriter">WE KNOW WHAT YOU WANT</p>
		</div>
		<div className="d-flex flex-row  flex-wrap justify-content-around">
                <Present present={test} />
                <Present present={test} />
                <Present present={test} />
                <Present present={test} />
				  <Present present={test} />
                <Present present={test} />
                <Present present={test} />
                <Present present={test} />
				  <Present present={test} />
                <Present present={test} />
                <Present present={test} />
                <Present present={test} />
                </div>
		</div>
        </div>;

    }
}

