import React, { Component } from "react";
import Speech from "react-speech";
import { getMicrophone } from "./dtmf";
// import { Provider } from "react-redux";
// console.log(dtmf);
getMicrophone();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioPermission: false,
      messages: []
    };
    setTimeout(this.displayWelcomeMessage, 3000);
  }
  displayAuthenticationMessage = () => {
    const message = {
      type: "speech",
      text: "Please enter your PIN using your keypad followed by # key"
    };
    this.setState({
      ...this.state,
      messages: [...this.state.messages, message]
    });
  };
  displayWelcomeMessage = () => {
    const message = {
      type: "speech",
      text: "Welcome to Grab Pay"
    };
    // this.state.messages.push(message);
    this.setState({
      ...this.state,
      messages: [...this.state.messages, message]
    });
    setTimeout(this.displayAuthenticationMessage, 3000);
  };
  startAudioDecode = () => {
    console.log("Audio decode");
    this.setState({ ...this.state, audioPermission: true });
  };
  render() {
    return (
      <div className="App">
        {this.state.messages.map((message, key) => {
          return (
            <div>
              {message.type === "dtmf" ? (
                <p className="DTMF">message.text</p>
              ) : (
                <Speech
                  className="message"
                  text={message.text}
                  textAsButton={true}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
