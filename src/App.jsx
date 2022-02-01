import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import { CartList, ProductDetail, ProductEdit, ProductList } from 'page';

const App = () => {
  return (
    <div className="c-main">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/cart" element={<CartList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
