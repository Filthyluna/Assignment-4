/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <img src="https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFua3xlbnwwfHwwfHw%3D&w=1000&q=80" alt="bank"/>

        <h1>Bank of React</h1>

        <div className="home-links">
          <Link to="/userProfile">User Profile</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
          <Link to="/credits">Credits</Link>
          <br />
          <Link to="/debits">Debits</Link>
          <br /><br />
        </div>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </div>
    );
  }
}

export default Home;