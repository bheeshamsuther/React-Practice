import {FirebaseApp, providerApp} from './../Firebase/firebase'


function Signup(data,path) {
    console.log(data)
    return (dispatch) => {

        FirebaseApp.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                 console.log(res.user.emailVerified);
                 res.user.sendEmailVerification()
                 .then(()=>{
                     console.log("email has gone");
                     FirebaseApp.firestore().collection("users").doc(res.user.uid).set(data)
                     .then((res) => {
                         console.log(res)
                         dispatch({
                             type: "signupSucess",
 
                         })
                         path.push("/")
                     })
                     .catch((err) => {
                         console.log(err)
                         dispatch({ type: "showSignupErr", payload: err.message });
                         setTimeout(() => { dispatch({ type: "hideSignupErr" }) }, 3000)
                     })
                 })
                 .catch((err)=>{
                     console.log(err)
                 })

            })
            .catch((err) => {
                dispatch({ type: "showSignupErr", payload: err.message });
                setTimeout(() => { dispatch({ type: "hideSignupErr" }) }, 3000)
            })
    }

}


function Login(data,path){
    return(dispatch)=>{
        FirebaseApp.auth().signInWithEmailAndPassword(data.email,data.password)
        .then((res)=>{
            console.log(res);
            if(res.user.emailVerified===false){
                path.push("/emailverified");
            }
            else{
                path.push("/home")
                dispatch({type:"loginSucess",loginMessage:"login Sucessfully"})
                setTimeout(() => { dispatch({ type: "hideloginMessage" }) }, 3000)
            }
           
        })
        .catch((err)=>{
            console.log(err);
            dispatch({type:"loginFailed",loginMessage:err.message})
            setTimeout(() => { dispatch({ type: "hideloginMessage" }) }, 3000)
        })
    }
}

function loginWithFacebook(){
    return async(dispatch)=>{

        await FirebaseApp.auth().signInWithPopup(providerApp)
        .then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
}

export {
    Signup,
    Login,
    loginWithFacebook
}