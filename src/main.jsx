import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App/App.jsx';
import R2t from './raw_to_ydk/r2t.jsx';
import Card_list from './card/card_db.jsx';

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
      <Link to="/Raw2YDK/">Home</Link> | <Link to="/Raw2YDK/Cards">Cards Info</Link>
    </nav>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/Raw2YDK/" element={<R2t />} />
        <Route path="/Raw2YDK/:pageId" element={<HandlePage />} />
      </Routes>
    </Router>
  </StrictMode>
);
