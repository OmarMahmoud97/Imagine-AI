import Landing from "./components/landing/landing";
import NavPage from "./components/navbar/navbar";
import WhatweDo from "./components/whatWeDo/WhatWeDo";
import "./styles/partials/_resets.scss";
function App() {
  return (
    <div className="App">
      <NavPage />
      <Landing />
      <WhatweDo />
    </div>
  );
}

export default App;
