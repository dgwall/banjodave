import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/menus/Header/Header";
import Footer from "./components/menus/Footer/Footer";
import ScrollToTop from "./components/shared/ScrollToTop";

const Home = React.lazy(() => import("./pages/Home"));
const Rootootoot = React.lazy(() => import("./pages/N/Rootootoot"));
const Sol = React.lazy(() => import("./pages/N/Sol"));
const PlusPlus = React.lazy(() => import("./pages/N/PlusPlus"));
const Dw40 = React.lazy(() => import("./pages/N/Dw40"));
const N = React.lazy(() => import("./pages/N/N"));
const League = React.lazy(() => import("./pages/League/League"));
const Doom = React.lazy(() => import("./pages/Doom/Doom"));
const Games = React.lazy(() => import("./pages/Games/Games"));
const Zine = React.lazy(() => import("./pages/Zine/Zine"));
const Support = React.lazy(() => import("./pages/Support"));
const Shop = React.lazy(() => import("./pages/Shop"));
const About = React.lazy(() => import("./pages/About"));
const BanjosArcade = React.lazy(() => import("./pages/Games/BanjosArcade"));

const routes = [
  { path: "/", mainClass: "", Component: Home },
  { path: "/games", mainClass: "-games", Component: Games },
  { path: "/0dg/banjos-arcade", mainClass: "-games", Component: BanjosArcade },
  { path: "/0dgames", mainClass: "-games", Component: Games },
  { path: "/doom", mainClass: "-doom", Component: Doom },
  { path: "/banjodoom", mainClass: "-doom", Component: Doom },
  { path: "/n/rootootoot", mainClass: "-n", Component: Rootootoot },
  { path: "/n/sol", mainClass: "-n", Component: Sol },
  { path: "/n/plusplus", mainClass: "-n", Component: PlusPlus },
  { path: "/n/DW40", mainClass: "-n", Component: Dw40 },
  { path: "/n", mainClass: "-n", Component: N },
  { path: "/league", mainClass: "-league", Component: League },
  { path: "/zine", mainClass: "-zine", Component: Zine },
  { path: "/thank-you", mainClass: "", Component: Support },
  { path: "/shop", mainClass: "", Component: Shop },
  { path: "/about", mainClass: "", Component: About },
];

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
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
