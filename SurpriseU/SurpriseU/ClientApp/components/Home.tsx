import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <div id="tableBlock"></div>
            <div id="editBlock">
                <p><b>Edit</b></p>
                <table>
                    <tr><td><input type="hidden" id="editId" /></td><td></td></tr>
                    <tr><td><label>Title: </label></td><td><input type="text" id="editName" /></td></tr>
                    <tr><td><label>Smth: </label></td><td><input type="text" id="editAuthor" /></td></tr>
                    <tr><td><label>Smth: </label></td><td><input type="number" id="editYear" /></td></tr>
                </table>
                <button id="editPresent">Save</button>
            </div>
            <div id="createBlock">
                <p><b>Adding</b></p>
                <table>
                    <tr><td><label>Title: </label></td><td><input type="text" id="addName" /></td></tr>
                    <tr><td><label>Smth: </label></td><td><input type="text" id="addAuthor" /></td></tr>
                    <tr><td><label>Smth: </label></td><td><input type="number" id="addYear" /></td></tr>
                </table>
                <button id="addPresent">Save</button>
            </div>

        </div>;
    }
}
