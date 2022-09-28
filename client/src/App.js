import NavBar from "./components/NavBar";
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>

        </Routes>
      </BrowserRouter>

    </div >
  );
}

export default App;


