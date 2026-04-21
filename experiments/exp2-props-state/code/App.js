import React, { useState } from "react";

function Toggle() {
  const [status, setStatus] = useState("OFF");

  const toggleStatus = () => {
    setStatus(status === "OFF" ? "ON" : "OFF");
  };

  return (
    <div>
      <h2>Status: {status}</h2>
      <button onClick={toggleStatus}>Toggle</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Props and State Example</h1>
      <Toggle />
    </div>
  );
}

export default App;