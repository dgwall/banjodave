import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import your components
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Footer from "./components/Footer/Footer";
import N from "./components/N/N";
import League from "./components/League/League";
import Doom from "./components/Doom/Doom";
import Games from "./components/Games/Games";
import Zine from "./components/Zine/Zine";
import Support from "./components/Support";
import Shop from "./components/Shop";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/games"
          element={
            <main className="main-games">
              <div className="page">
                <Games />
              </div>
            </main>
          }
        />
        <Route
          path="/doom"
          element={
            <main className="main-doom">
              <div className="page">
                <Doom />
              </div>
            </main>
          }
        />
        <Route
          path="/n"
          element={
            <main className="main-n">
              <div className="page">
                <N />
              </div>
            </main>
          }
        />
        <Route
          path="/league"
          element={
            <main className="main-league">
              <div className="page">
                <League />
              </div>
            </main>
          }
        />
        <Route
          path="/zine"
          element={
            <main className="main-zine">
              <div className="page">
                <Zine />
              </div>
            </main>
          }
        />
        <Route
          path="/thank-you"
          element={
            <main className="main">
              <div className="page">
                <Support />
              </div>
            </main>
          }
        />
        <Route
          path="/shop"
          element={
            <main className="main">
              <div className="page">
                <Shop />
              </div>
            </main>
          }
        />
        <Route
          path="/about"
          element={
            <main className="main">
              <div className="page">
                <About />
              </div>
            </main>
          }
        />
        <Route
          path="/"
          element={
            <main className="main">
              <div className="page">
                <Home />
              </div>
            </main>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
