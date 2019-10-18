import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {FirebaseApp} from './../../Config/Firebase/firebase'
import { connect } from 'react-redux'
import { Signup } from './../../Config/Store/action'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody,MDBAnimation } from 'mdbreact';
import './Signup.css'
import {Link} from "react-router-dom"



class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            fullName:"",
            email: '',
            password: ''

        }
        this.textInput=React.createRef();
        this.textInput1=React.createRef();
        this.textInput2=React.createRef();
    }
    imageFunc = async (e) => {
      console.log(e.target.files[0])
      let imagename = e.target.files[0].name
      let ref = FirebaseApp.storage().ref('/').child("image/" + imagename)
      await ref.put(e.target.files[0])
      ref.getDownloadURL().then(url =>{
          console.log(url)
        this.setState({
          file: url,

        })
      }
      )
      .catch((error)=>{
          console.log(error)
      })
    }
 signupFunc=()=>{
    if(this.state.fullName===""){
  this.textInput.current.setFocus()
    }
    else if(this.state.email===""){
        this.textInput1.current.setFocus()
    }
    else if(this.state.password===""){
        this.textInput2.current.setFocus()
    }
    else{
        this.props.sendData(this.state,this.props.history)
    }
 }

    render() {

        return (
            <div>
                <br/><br/><br/>
                <MDBAnimation type="zoomIn">
  <MDBContainer>
      <MDBRow center>
        <MDBCol md="6" lg="5">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                  onChange={(e)=>this.setState({fullName:e.target.value})}
                  ref={this.textInput}
                    label="Full Name"
                    outline
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                    <MDBInput
                    ref={this.textInput1}
                    onChange={(e)=>this.imageFunc(e)}
                    outline
                    group
                    type="file"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    ref={this.textInput1}
                     onChange={(e)=>this.setState({email:e.target.value})}
                    label="Email"
                    outline
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                    <MDBInput
                    ref={this.textInput2}
                     onChange={(e)=>this.setState({password:e.target.value})}
                    label="Password"
                    outline
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center ">
                  <MDBBtn style={{backgroundColor : 'darkcyan' , borderRadius : 50 , width : '50%'}} type="button" onClick={()=>this.signupFunc()}>
                    SignUp
                  </MDBBtn>
                  <br />
                  <hr/>
                  <p style={{float:"right"}}>Already member? &nbsp;<Link to="/">Login</Link></p>
                  <br />
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </MDBAnimation>
                <div id="snackbar" className={this.props.snackBar}>{this.props.signupErr}</div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state, 'state')
    return {
        signupErr: state.SignupErr,
        snackBar: state.snackBar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendData: (data,path) => dispatch(Signup(data,path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

