import React, { Component } from 'react'

export default class Login extends Component {
  constructor(props){
   super(props)
    console.log(this.props)

  }

  render() {
    return (
      <div className='container mt-5 bg-light py-5 px-5'>
      <h5 className='text-dark mb-5'>Dashboard Login</h5>
        <form className='form' >
    <div className='form-group'>
        <label>Username:</label>
        <input className='form-control border ' type="text" name="username" value={this.props.username} onChange={(e) => {this.props.handleUsernameChange(e)}}/>
    </div>
    <div className='form-group'>
        <label>Password:</label>
        <input className='form-control border ' type="password" name="password" value={this.props.password} onChange={(e) => this.props.handlePasswordChange(e)}/>
    </div>
    <div className='form-group'>{this.props.error}</div>
    <div className='form-group'>
        <div style={{cursor: 'pointer'}} className='btn btn-primary mt-4'  id="submit"   onClick={(e) => this.props.handleSubmit(e)}> Log In</div>
    </div>
</form>
      </div>
    )
  }
}
