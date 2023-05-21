import React from "react";

const Connected = (props) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">You are Connected to Metamask</h1>
            <p className="connected-account">Your Address: {props.account}</p>
            <p className="connected-time">Remaining Time: {props.remainingTime}</p>
            
            <button className="login-button" onClick={props.addNetwork}>Add Volta Network to Metamask</button>
            <br></br>
            
            {props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    <input type="number" placeholder="Enter Index" value={props.number} onChange={props.handleNumberChange}></input>
                    <br />

                    <button className="vote-button" onClick={props.voteFunction}>Vote</button>

                    <br></br>
                    <br></br>

                </div>
            )}

            <table id="myTable" className="candidates-table">
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Game</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {props.candidates.map((candidate, index) => (
                        <tr key={index}>
                            <td>{candidate.index}</td>
                            <td>{candidate.name}</td>
                            <td>{candidate.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Connected;