import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import { ProductDetail, ProductEdit, ProductList } from 'page';

const App = () => {
  return (
    <div className="c-main">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
