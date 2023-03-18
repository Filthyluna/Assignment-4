/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import axios from 'axios';
let url = 'https://johnnylaicode.github.io/api/debits.json'


class Debits extends Component {
  // Render the list of Debit items and a form to input new Debit item
  constructor(props) {
    super(props);
    this.state = {
      debits: []
    }
  }

  componentDidMount() {
    axios.get(url)
      .then(response => {
        this.setState({ debits: response.data })
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Debits</h1>
        <form onSubmit={this.props.addDebit}>
          <label htmlFor="description">Description:
            <input type="text" name="description" />
          </label>
          <label htmlFor="amount">Amount:
            <input type="number" name="amount" />
          </label>
          <label htmlFor="date">Date:
            <input type="date" name="date" />
          </label>
          <button type="submit">Add Debit</button>
        </form>

        <table className='Debits-table'>
            <tr className='labels'>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          <tbody>
            {/* Creates table list of debits from API */}
            {this.state.debits.map((debit, index) => {
              return (
                <tr key={index}>
                  <td>{debit.description}</td>
                  <td>${debit.amount}</td>
                  <td>{debit.date.slice(0,10)}</td>
                </tr>
              )
            })}
            {/* Adds new debits to list */}
            {this.props.debits.map((debit, index) => {
              return (
                <tr key={index}>
                  <td>{debit.description}</td>
                  <td>${debit.amount}</td>
                  <td>{debit.date.slice(0,10)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits;