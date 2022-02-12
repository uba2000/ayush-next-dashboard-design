import React, { Component } from 'react'
import AccountLayout from '../../../components/app/account/AccountLayout'
import FormGroup from '../../../components/app/account/FormGroup'
import styles from '../../../styles/Account.module.css'

export class index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fullName: 'Samantha William',
      email: 'example@gmail.com',
      password: '12345678901234567'
    }
  }

  fullNameHandler = (e) => {
    this.setState({
      fullName: e.target.value
    })
  }

  emailHandler = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  passwordHandler = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <AccountLayout>
        <div className="">
          <FormGroup label='Full Name' labelFor='fullName'>
            <input id='fullName' type="text" value={this.state.fullName} onChange={this.fullNameHandler} placeholder='Full Name' className={styles.formGroupInput} />
          </FormGroup>
          <FormGroup label='Email' labelFor='email'>
            <input id='email' type="text" value={this.state.email} onChange={this.emailHandler} placeholder='Email' className={styles.formGroupInput} />
          </FormGroup>
          <FormGroup label='Password' labelFor='password'>
            <input id='password' type="password" value={this.state.password} onChange={this.passwordHandler} className={styles.formGroupInput} />
          </FormGroup>
          <div className="grid grid-cols-2">
            <FormGroup label='Password' labelFor='password'>
              <select name="" id="">
                option
              </select>
            </FormGroup>
          </div>
        </div>
      </AccountLayout>
    )
  }
}

export default index