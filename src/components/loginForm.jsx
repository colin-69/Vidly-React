import React, { Component } from "react";
class LoginForm extends Component {
   username = React.createRef();
   handelSubmit = (e) => {
      e.preventDefault();
      const username = this.username.current.value;
      console.log("submitted");
   };
   render() {
      return (
         <div>
            <h1>Login</h1>
            <form onSubmit={this.handelSubmit}>
               <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <input
                     ref={this.username}
                     id='username'
                     type='text'
                     className='form-control'
                  />
               </div>
               <div className='form-group'>
                  <label htmlFor='password'></label>Password
                  <input id='password' type='text' className='form-control' />
               </div>
               <button className='btn btn-primary'>Login</button>
            </form>
         </div>
      );
   }
}

export default LoginForm;
