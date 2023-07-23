import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/menus/Header/Header";
import Footer from "./components/menus/Footer/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";

const Home = React.lazy(() => import("./pages/Home"));
const N = React.lazy(() => import("./pages/N/N"));
const League = React.lazy(() => import("./pages/League/League"));
const Doom = React.lazy(() => import("./pages/Doom/Doom"));
const Games = React.lazy(() => import("./pages/Games/Games"));
const Zine = React.lazy(() => import("./pages/Zine/Zine"));
const Support = React.lazy(() => import("./pages/Support"));
const Shop = React.lazy(() => import("./pages/Shop"));
const About = React.lazy(() => import("./pages/About"));
const Cards = React.lazy(() => import("./pages/Cards/Cards"));
const BanjosArcade = React.lazy(() => import("./pages/Games/BanjosArcade"));
const Bwc = React.lazy(() => import("./pages/BWC/BWC"));

const routes = [
  { path: "/", mainClass: "", Component: Home },
  { path: "/games", mainClass: "-games", Component: Games },
  { path: "/0dg/banjos-arcade", mainClass: "-games", Component: BanjosArcade },
  { path: "/0dgames", mainClass: "-games", Component: Games },
  { path: "/doom", mainClass: "-doom", Component: Doom },
  { path: "/banjodoom", mainClass: "-doom", Component: Doom },
  { path: "/n/*", mainClass: "-n", Component: N },
  { path: "/league", mainClass: "-league", Component: League },
  { path: "/zine", mainClass: "-zine", Component: Zine },
  { path: "/thank-you", mainClass: "", Component: Support },
  { path: "/shop", mainClass: "", Component: Shop },
  { path: "/about", mainClass: "", Component: About },
  { path: "/bfd", mainClass: "-cards", Component: Cards },
  { path: "/bfd/:cardId", mainClass: "-cards", Component: Cards },
  { path: "/bwc", mainClass: "-bwc", Component: Bwc },
];

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Suspense
        fallback={
          <div className="main">
            <div className="page">
              <div className="loading">
                <img src="/img/orb.gif" alt="orb" loading="lazy" />
                <br />
                Loading...
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          {routes.map(({ path, mainClass, Component }) => (
            <Route
              path={path}
              key={path}
              element={
                <main className={`main${mainClass}`}>
                  <div className="page">
                    <Component />
                  </div>
                </main>
              }
            />
          ))}
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
