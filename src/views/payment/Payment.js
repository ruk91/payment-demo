import React from 'react';
import Card from 'react-credit-cards';
import { 
  Button,
  Navbar,
  NavbarBrand 
} from 'reactstrap';
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from './validate';
import './styles.css';
import 'react-credit-cards/es/styles-compiled.css';

import store from '../../redux/store/index'
import { addDetails } from '../../redux/actions/index';

export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      focused: '',
      formData: null,
    };
  }
  
  // handle inputs elements when focus
  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  // handle changes in input elements
  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };
    
  // handle submit 
  handleSubmit = e => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    store.dispatch(
      addDetails(formData.number, formData.name, formData.expiry, formData.cvc)
    );
    this.setState({ formData });
    this.form.reset();

    this.props.history.push('/loading');
  };

    render() {
      const { name, number, expiry, cvc, focused } = this.state;
      return (
        <div key="Payment">
          <Navbar className="navbar-style" light expand="md">
            <NavbarBrand href="#">
              <h5 style={{ color: '#fff' }} >Noetic Payments</h5>
            </NavbarBrand>
          </Navbar>
          <div className="App-payment">
            <h1 style={{ color: '#6dc1c3' }}>React Payment Interface</h1>
            <h4>Please enter your details</h4>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />

            <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </div>

              <div className="form-actions">
                <Button className="btn btn-primary btn-block">PAY</Button>
              </div>

            </form>
          </div>
        </div>
      );
    }
}
