// import logo from './logo.svg';
import './App.css';
import InvestorsHome from './InvestorsHome';
import Investor from './Investor';
import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<InvestorsHome />}
          />

        <Route
            exact
            path="/investor/:id"
            element={<Investor />}
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
