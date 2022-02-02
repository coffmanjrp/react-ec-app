import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import {
  CartList,
  OrderConfirm,
  OrderHistory,
  ProductDetail,
  ProductEdit,
  ProductList,
  SignIn,
  SignUp,
} from 'page';

const App = () => {
  return (
    <div className="c-main">
      <Router>
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/cart" element={<CartList />} />
          <Route path="/order/confirm" element={<OrderConfirm />} />
          <Route path="/order/history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
