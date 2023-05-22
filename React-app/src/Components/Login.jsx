import React from "react";

const Login = (props) => {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Welcome to Menthol Game Night Voting Dapp</h1>

            <a href="https://voltafaucet.energyweb.org/" target="_blank" class="footer-link" className="login-button">Get Volta Token</a>
            <br></br>
            <button className="login-button" onClick={props.addNetwork}>Add Volta Network to Metamask</button>
            <br></br>
          
            <button className="login-button" onClick = {props.connectWallet}>Connect Metamask</button>
            
        </div>
    )
}

export default Login;