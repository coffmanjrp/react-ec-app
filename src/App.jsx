import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import { ProductDetail, ProductList } from 'page';

const App = () => {
  return (
    <div className="c-main">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
