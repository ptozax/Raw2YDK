import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalProvider } from "./global_context.jsx";
import './index.css';
import App from './App/App.jsx';
import R2t from './raw_to_ydk/r2t.jsx';
import Card_list from './card/cardList.jsx';
import Home from './home/home.jsx';
import AppNavbar from './Component/AppNavbar.jsx';

const pageComponents = {
  Cards: <Card_list />,
  Convert:<R2t/>,
  Default: <Home/>,
};

function HandlePage() {
  const { pageId } = useParams();
  return pageComponents[pageId] || pageComponents.Default;
}

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/Cards">Cards Info</Link> | <Link to="/Convert">Convert Text To YDK</Link>
    </nav>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <Router>
        <AppNavbar/>
        {/* <Navigation /> */}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/:pageId" element={<HandlePage />} />

        </Routes>

      </Router>
    </GlobalProvider>
  </StrictMode>
);
