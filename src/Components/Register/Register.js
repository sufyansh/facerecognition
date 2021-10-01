import React from 'react';
import Tilty from 'react-tilty'
class Register extends React.Component {
constructor(props){
super(props);
this.state = {
  email: '',
  password: '',
  name: '' 
  
}

}
onEmailChange = (event )=>{
  this.setState({email: event.target.value})
  }
  onPasswordChange =(event) =>{
 this.setState({password: event.target.value})
  }
  onNameChange = (event )=>{
    this.setState({name: event.target.value})
    }
 
    onSubmitSignIn = ()=> {
      fetch('http://localhost:3001/register',{
        method :'post',
        header:{'Content-Type': 'application/json'},
        body:  JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        })
      })
      .then((response) => response.json())
      .then(user=>{
        if(user){
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
     
    }
  render(){
   
return(

  <Tilty className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" options={{ max : 55 }} style={{ height: 500, width: 500 }} >
  <main className="pa4 black-80">
  <div className="measure ">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div className=" mt3">
        <label className="db fw6 lh-copy f3"  htmlFor="name">Name</label>
        <input className="b3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="name"  id="name"
        onChange={this.onNameChange}
        />
      </div>
      <div className=" mt3">
        <label className="db fw6 lh-copy f3"  htmlFor="email-address">Email</label>
        <input className="b3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
        onChange={this.onEmailChange}
        />
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f3"  htmlFor="password">Password</label>
        <input className="b3 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
         type="password" name="password"  id="password"
         onChange={this.onPasswordChange}
         />
      </div>
    </fieldset>
    <div className="">
      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f2 dib" 
      onClick={this.onSubmitSignIn}
      type="submit" value="Register"/>
    </div>
  </div>
</main>
    </Tilty>
);
  }
}
export default Register;