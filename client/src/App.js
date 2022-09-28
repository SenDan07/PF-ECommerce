import NavBar from "./components/NavBar";
import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <BookList />
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
