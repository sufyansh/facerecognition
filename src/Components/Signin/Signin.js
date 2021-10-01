import React from 'react';
import Tilty from 'react-tilty'
class  Signin extends React.Component{
  constructor() {
    super();
    this.state= {
     signInEmail: '',
     signInPassword: '' 
     
    }
  }
  onEmailChange = (event )=>{
  this.setState({signInEmail: event.target.value})
  }
  onPasswordChange =(event) =>{
 this.setState({signInPassword: event.target.value})
  }
onSubmitSignIn = ()=> {
  fetch('http://localhost:3001/signin',{
    method :'post',
    header:{'Content-Type': 'application/json'},
    body:  JSON.stringify({
      email: this.state.onEmailChange,
      password: this.state.onPasswordChange
    })
  })
  .then(response => response.json())
  .then(user=>{
    if(user.id){
      this.props.loadUser(user)
      this.props.onRouteChange('home');
    }
  })
 
}
  render()
  {
    const { onRouteChange } = this.props;
return(
<Tilty className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" options={{ max : 55 }} style={{ height: 500, width: 500 }} >
  <main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className=" mt3">
        <label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
        <input
        className="b3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
        type="email" 
        name="email-address" 
         id="email-address"
         onChange={this.onEmailChange} />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f3"  htmlFor="password">Password</label>
        <input 
        className="b3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="password"
          name="password"
            id="password"
            onChange={this.onPasswordChange} />
      </div>
    </fieldset>
    <div className="">
      <input 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f2 dib" 
      onClick={this.onSubmitSignIn}
      type="submit" value="Sign in"/>
    </div>
    <div className="lh-copy mt3">
      <p onClick={()=>onRouteChange('register')} className="f4 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer dib">Register</p>
    </div>
  </div>
</main>
    </Tilty>
);
}
}
export default Signin;