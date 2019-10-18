import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import TextField from '../../Components/TextField/textfield'
import Footer from '../../Components/Footer/footer'
import Appbar from '../../Components/Appbar/appBar'
import {FirebaseApp} from './../../Config/Firebase/firebase'
import Navbar from '../../Components/Appbar/navbar'

class Home extends React.Component{
    constructor(){
        super()
        this.state = {
            todo : [],
            value : ''
        }
    }
    
    value = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.value] : e.target.value
        })
    }
    addTodo(){
        alert('Add')
    }

    componentDidMount=()=>{
        
    FirebaseApp.auth().onAuthStateChanged((user)=>{
        if (user) {
       this.props.history.push("/home")
        } else {
            this.props.history.push("/")  
        }
    });
    }
    Logout=()=>{
        FirebaseApp.auth().signOut()
        .then(()=>{
            this.props.history.push("/")  
        })
        .catch((err)=>{
             console.log(err)
        })
    }
    render(){
        console.log(this.state)
        return(
            <div>
            {/* <Appbar /> */}
            <Navbar path={this.props.history} logout={this.Logout}/>
           
           
          
            </div>
        )
    }
}
export default Home