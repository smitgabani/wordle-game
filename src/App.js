import Footer from "./Components/Layout/Footer";
import Game from "./Components/Layout/Game";
import Keyboard from "./Components/Layout/Keyboard";

function App() {
  return (
    <div className="App">
      <div className="navbar"><h1>Wordle Game</h1></div>
      <Game/>
      <Footer/>
    </div>
  );
}

export default App;
