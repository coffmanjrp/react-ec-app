import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import { ProductList } from 'page';

const App = () => {
  return (
    <div className="c-main">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
