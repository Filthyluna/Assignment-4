/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

let credit = 'https://johnnylaicode.github.io/api/credits.json'
let debit = 'https://johnnylaicode.github.io/api/debits.json'

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
    this.addCredit = this.addCredit.bind(this);
    this.addDebit = this.addDebit.bind(this);
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }
  
  async componentDidMount() {
    let debitRes = await axios.get(credit)
    let creditRes = await axios.get(debit)
    debitRes = debitRes.data;
    creditRes = creditRes.data;

    let debitTotal, creditTotal = 0;
    debitRes.forEach(d => {
      debitTotal += d.amount;
    });
    creditRes.forEach(c => {
      creditTotal += c.amount;
    });

    let newBalance = creditTotal - debitTotal;
    this.setState({debitRes, creditRes, newBalance});
  }

  addDebit = (d) => {
    d.preventDefault();
    const newEntry = {
      amount: Number(d.target[1].value),
      description: d.target[0].value,
      date: d.target[2].value
    }
    this.setState({
      debitList: [...this.state.debitList, newEntry],
      accountBalance: this.state.accountBalance + newEntry.amount});
  }

  addCredit = (c) => {
    c.preventDefault();
    const newEntry = {
      amount: Number(c.target[1].value),
      description: c.target[0].value,
      date: c.target[2].value
    }
    this.setState({
      creditList: [...this.state.creditList, newEntry],
      accountBalance: this.state.accountBalance - newEntry.amount});
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename={'/Assignment-4'}>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
      </Router>
    );
  }
}

export default App;