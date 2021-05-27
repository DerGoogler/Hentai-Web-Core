// App Pages
import App from './App';

// Regular Modules
import React from "react";
import {
    Page,
    Toolbar,
    Switch,
    ListHeader,
    ListItem,
    List,
    Icon,
    ToolbarButton
} from "react-onsenui";
import { hot } from "react-hot-loader/root";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Settings extends React.Component {
    onAndroidDesignChange(e) {
        cookies.set('useAndroidDesign', e.target.checked, { path: '/' });
    }

    render() {
        return (
            <List>
                <ListHeader>Design</ListHeader>
                <ListItem>
                    <div className="center">
                        Use Android Design
                            </div>
                    <div className="right">
                        <Switch checked={false} onChange={this.handleChange}></Switch>
                    </div>
                </ListItem>
            </List>
        );
    }
}

export default hot(Settings);
