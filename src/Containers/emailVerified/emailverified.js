import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBNav,MDBContainer } from "mdbreact";
import {FirebaseApp} from './../../Config/Firebase/firebase'





class PanelPage extends React.Component {



componentDidMount=()=>{

    FirebaseApp.auth().onAuthStateChanged((user)=>{
        if (user) {
           console.log(user.emailVerified)
           if(user.emailVerified===true){
               this.props.history.push("/home");
           }
           else{
               alert("Verify Your Email")
           }
        } else {
            
        }
    });
}
    render(){

        return (
            <MDBContainer>
  <MDBCard className="text-center">
  
    <MDBCardHeader>
  
      <MDBNav header>
       <h3>Thar Tiger Batch 1</h3>
      </MDBNav>
     
    </MDBCardHeader>
    
    <MDBCardBody>
       
      <MDBCardTitle>
          Verify Your Email
          </MDBCardTitle>
      <MDBCardText>
       If you have verified your email adress click on button
      </MDBCardText>
      <MDBBtn color="primary">Refresh your page</MDBBtn>
    </MDBCardBody>
  </MDBCard>
</MDBContainer>
);
}
};

export default PanelPage;