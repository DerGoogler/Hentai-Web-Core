// Regular Modules
import React from "react";
import {
    List,
    ListItem,
    ListHeader,
    Switch
  } from "react-onsenui";
import { hot } from "react-hot-loader/root";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    onAbdroidSettingChane(event) {
        this.setState({ checked: event.target.checked });
        if (this.state.checked) {
            cookies.set('useAndroidDesign', true, { path: '/' });
        } else {
            cookies.set('useAndroidDesign', false, { path: '/' });
        }
    }

    render() {
        /*if (cookies.get('useAndroidDesign') === true) {
            this.setState({ checked: true });
        } else if (cookies.get('useAndroidDesign') === true
            || cookies.get('useAndroidDesign') === undefined
            || cookies.get('useAndroidDesign') === '') {
                this.setState({ checked: false });
        }*/

        return (
            <>
                <List>
                    <ListHeader>Design</ListHeader>
                    <ListItem>
                        <div className="center">
                            Use Android UI
                        </div>
                        <div className="right">
                            <Switch checked={this.state.checked} onChange={this.onAbdroidSettingChane}></Switch>
                        </div>
                    </ListItem>
                </List>
            </>
        );
    }
}


export default hot(Settings);