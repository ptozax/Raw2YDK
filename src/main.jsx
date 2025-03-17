import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalProvider } from "./global_context.jsx";
import './index.css';
import App from './App/App.jsx';
import R2t from './raw_to_ydk/r2t.jsx';
import Card_list from './card/cardList.jsx';

const pageComponents = {
  Cards: <Card_list />,
  Default: <R2t />,
};

function HandlePage() {
  const { pageId } = useParams();
  return pageComponents[pageId] || pageComponents.Default;
}

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/Cards">Cards Info</Link>
    </nav>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <Router>
        <Navigation />
        <Routes>

          <Route path="/" element={<R2t />} />
          <Route path="/:pageId" element={<HandlePage />} />

        </Routes>

      </Router>
    </GlobalProvider>
  </StrictMode>
);
