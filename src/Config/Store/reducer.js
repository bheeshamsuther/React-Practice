const ALL_STATE = {
    isRegister: false,
    isSigned: false,
    isLogin: false,
    SignupErr: false,
    snackBar: 'snackbar',
    loginMessage :false

}
function reducer(state = ALL_STATE, action) {
    console.log(action)


    switch (action.type) {
        case "signupSucess":
            return { ...state }
            break;
        case "showSignupErr":
            state.SignupErr = action.payload
            state.snackBar = "show"
            return {
                ...state, snackBar: state.snackBar, SignupErr: state.SignupErr.concat()
            }
            break;
        case "hideSignupErr":
            state.SignupErr = ""
            state.snackBar = "snackBar"
            return {
                ...state, snackBar: state.snackBar, SignupErr: state.SignupErr.concat()
            }
            break;

        case "loginSucess" : 
        state.loginMessage = action.loginMessage
        state.snackBar = "show"
        return{
            ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
        }
        break;
        case "loginFailed" : 
        state.loginMessage = action.loginMessage
        state.snackBar = "show"
        return{
            ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
        }
        break;
        case "hideloginMessage" :
                state.loginMessage =""
                state.snackBar = "snackBar"
                return{
                    ...state, snackBar:state.snackBar,loginMessage:state.loginMessage.concat()
                }

        default: {
            return state
        }
    }
}

export default reducer