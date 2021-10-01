import React, {Component}  from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import 'tachyons';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '6695c567908a44d48a630f7165382540'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800 
      } 
    }
      }
    }

class App extends Component {
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box:  {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id :'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }
loadUser = (data) =>{
  this.setState({user:{
    id : data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }
 
  })
}

  calculationFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box ;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.leftCol*width,
      topRow: clarifaiFace.topRow*height,
      rightCol: width - (clarifaiFace.rightCol*width),
      bottomRow: height- (clarifaiFace.bottomcol*height)
    }
}
displayFaceBox(box){
  this.setState({box: this.state.box});
}
  OnInputChange = ( event )=>{
    this.setState({input: event.target.value})
    
  }

  OnSubmitButton = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict('45fb9a671625463fa646c3523a3087d5',this.state.input).then(response=>this.displayFaceBox(this.calculationFaceLocation(response)))
    .catch(err => console.log(err));
  }
  onRouteChange =(route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: true})
    }
    else if(route===' home'){
      this.setState({isSignedIn: false})
    }
   this.setState({route: route})
  }
  render() {
    const  { isSignedIn,route,imageUrl,box} = this.state;
  return (
    <div className='myApp'>
      <Particles className='particles'  params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
    {route === 'home'?
    <div>
    <Logo />
    <Rank />
    <ImageLinkForm OnInputChange={this.OnInputChange} OnSubmitButton={this.OnSubmitButton} />
    <FaceRecognition box={box} imageUrl={imageUrl}/>
    </div>
    :(
      route === 'signin'
    ?
    <Signin loadUser={this.loadUser} onRouteChange ={this.onRouteChange}  /> :
    <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    )} 
    </div>
  );
  }
}

export default App;
