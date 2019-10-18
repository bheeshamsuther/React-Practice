import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '../../Components/TextField/textfield'
import Button from '@material-ui/core/Button';
import Appbar from '../../Components/Appbar/appBar'
import { Login, loginWithFacebook } from './../../Config/Store/action'
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBAnimation, MDBIcon } from 'mdbreact';
import { FaFacebookF } from "react-icons/fa";
import { FirebaseApp } from './../../Config/Firebase/firebase'
import { Link } from 'react-router-dom'
import Logo from '../../Images/logo.png'
import { FacebookLoginButton } from "react-social-login-buttons";


class UserLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      className: "snackBar",
      message: ""
    }
    this.textInput1 = React.createRef()
    this.textInput2 = React.createRef()
  }

  LoginFunc = () => {
    if (this.state.email === "") {
      this.setState({ className: "show", message: "❌❌email is required" })
      this.textInput1.current.setFocus();

    }
    else if (this.state.password === "") {
      this.setState({ className: "show", message: "❌❌password is required" })
      this.textInput2.current.setFocus()
    }
    else {
      this.props.sendData(this.state, this.props.history)
    }

    setTimeout(() => {
      this.setState({ className: "snackBar", message: "" })
    }, 2000)
  }

  componentDidMount = () => {

    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified === true) {

          this.props.history.push("/home")
        }
        else {
          this.props.history.push("/emailverified")
        }
      } else {
        this.props.history.push("/")
      }
    });
  }


  render() {
    return (
      <div>
        <br /><br /><br />

        <MDBAnimation type='zoomIn'>

          <MDBContainer>
            <MDBRow center>
              <MDBCol md="6" lg="5">
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <div style={{ textAlign: 'center' }}>
                        <MDBBtn size="lg" color="#0d47a1" social="fb" 
                        onClick={() => this.props.loginWithFacebook()}
                        style={{ borderRadius: 50, width: '70%', backgroundColor: "#0d47a1", color: 'white' }}>
                        
                          <FaFacebookF />&nbsp; &nbsp;login with Facebook
                        </MDBBtn>
                        {/* <FacebookLoginButton onClick={() => alert("Hello")}>
                          <span style={{marginLeft : 50}}>Login with Facebook</span>
                        </FacebookLoginButton> */}
                        {/* <Button style={{ backgroundColor: "#0d47a1", color: "#fff" }} onClick={() => this.props.loginWithFacebook()}>
                          <FaFacebookF /> &nbsp; &nbsp;login with Facebook
                  </Button> */}
                        <hr />

                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span>------ OR ------</span>
                      </div>
                      <div className="grey-text">
                        <MDBInput
                          ref={this.textInput1}
                          onChange={(e) => this.setState({ email: e.target.value })}
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
                          onChange={(e) => this.setState({ password: e.target.value })}
                          label="Password"
                          outline
                          group
                          type="password"
                          validate
                        />
                      </div>
                      <div className="text-center ">
                        <MDBBtn style={{ backgroundColor: 'darkcyan',borderRadius : 50, width:'50%' }} type="button" onClick={() => this.LoginFunc()}>
                          Login
                  </MDBBtn> <br />
                        <hr />
                        <p style={{ float: "right", color: 'gray' }}>Not a member yet? &nbsp;<Link to="/signup">Signup</Link></p>
                        <br />

                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBAnimation>
        <div id="snackbar" className={this.state.className} >{this.state.message}</div>
        <div id="snackbar" className={this.props.snackBar} >{this.props.LoginMessage}</div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'state')
  return {
    ...state,
    LoginMessage: state.loginMessage,
    snackBar: state.snackBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (data, path) => dispatch(Login(data, path)),
    loginWithFacebook: () => dispatch(loginWithFacebook())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);