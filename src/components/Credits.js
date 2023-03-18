/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import axios from 'axios';
let url = 'https://johnnylaicode.github.io/api/credits.json'

class Credits extends Component {
  // Render the list of Debit items and a form to input new Debit item
  constructor(props) {
    super(props);
    this.state = {
      credits: []
    }
  }

  componentDidMount() {
    axios.get(url)
      .then(response => {
        this.setState({ credits: response.data })
      })
      .catch(error => {
        console.log('Error', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Credits</h1>
        <form onSubmit={this.props.addCredit}>
          <label htmlFor="description">Description:
            <input type="text" name="description" />
          </label>
          <label htmlFor="amount">Amount:
            <input type="number" name="amount" />
          </label>
          <label htmlFor="date">Date:
            <input type="date" name="date" />
          </label>
          <button type="submit">Add Credit</button>
        </form>

        <table className='Credits-table'>
          <th>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </th>
          <tbody>
            {this.state.credits.map((credit, index) => {
              return (
                <tr key={index}>
                  <td>{credit.description}</td>
                  <td>${credit.amount}</td>
                  <td>{credit.date.slice(0,10)}</td>
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

export default Credits;