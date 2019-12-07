import React from "react";
import Speech from "react-speech";
import { getMicrophone, startDecode } from "./dtmf";
// import { Provider } from "react-redux";
// console.log(dtmf);
getMicrophone();
function App() {
  return (
    <div className="App">
      <Speech text="Welcome to Grab payments" textAsButton={true} />
    </div>
  );
}

export default App;
