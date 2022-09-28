import Home from "./components/Home";
import FormBook from "./components/FormBook"
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact path="/"
            element={<Home />} />

          <Route
            exact path="/createbook"
            element={<FormBook />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
