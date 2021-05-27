// App Pages
import App from './App';

// Regular Modules
import React from "react";
import {
  Page,
  Toolbar,
  Button,
  Icon,
  ToolbarButton
} from "react-onsenui";
import { hot } from "react-hot-loader/root";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Splash extends React.Component {
  ageConfim() {
    try {
      cookies.set('age18', true, { path: '/' });
      var mountNode = document.getElementById("app");
      ReactDOM.render(<App />, mountNode);
    } catch (error) {
      alert(error);
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Hentai Web</div>
        <div className='right'>

          <ToolbarButton
            onClick={() => {
              location.reload();
            }}
          >
            <Icon icon="md-refresh"></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <p style={{ textAlign: 'center' }}>
          <Button onClick={this.ageConfim}>
            Are you 18 years?
            </Button>
        </p>
      </Page>
    );
  }
};

export default hot(Splash);
