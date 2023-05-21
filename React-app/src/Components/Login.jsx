import React from "react";

const Login = (props) => {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Welcome to Menthol Game Night Voting Dapp</h1>
            <button className="login-button" onClick = {props.connectWallet}>Connect Metamask</button>
            
        </div>
    )
}

export default Login;