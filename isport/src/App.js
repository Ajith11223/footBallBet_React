import HomePage from "./Pages/HomePage/HomePage";
import { Route,Routes } from "react-router-dom";
import Bet from "./Pages/Bet/Bet";

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/bet/:id" element={<Bet/>}/>
      </Routes>
    </div>
  );
}

export default App;
