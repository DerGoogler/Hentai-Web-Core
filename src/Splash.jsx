// App Pages
import App from './App';

// Regular Modules
import React from "react";
import {
  Page,
  Toolbar,
  Button,
  Icon,
  ToolbarButton,
  Input
} from "react-onsenui";
import { hot } from "react-hot-loader/root";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Splash extends React.Component {
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
  handleClick() {
    if (cookies.get('username') === 'bob' && cookies.get('password') === 'bob') {
      cookies.set('age18', true, { path: '/' });
      location.reload();
    }
    else {
      ons.notification.alert('Username or password incorrect!');
    }
  }

  handleUsernameChange(e) {
    cookies.set('username', e.target.value, { path: '/' });
  }

  handlePasswordChange(e) {
    cookies.set('password', e.target.value, { path: '/' });
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <section style={{ textAlign: 'center' }}>
          <p>
            <Input
              value={cookies.get('username')}
              onChange={this.handleUsernameChange}
              modifier='underbar'
              float
              placeholder='Username' />
          </p>
          <p>
            <Input
              value={cookies.get('password')}
              onChange={this.handlePasswordChange}
              modifier='underbar'
              type='password'
              float
              placeholder='Password' />
          </p>
          <p>
            <Button onClick={this.handleClick}>Sign in</Button>
          </p>
        </section>
      </Page>
    );
  }
}

export default hot(Splash);