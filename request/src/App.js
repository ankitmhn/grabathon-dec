import React from "react";
import Speech from "react-speech";

function App() {
  return (
    <div>
      Hello World!
      <Speech text="Hello world from react!" textAsButton={true} />
    </div>
  );
}

export default App;
