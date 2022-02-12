import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { PrivateRoute } from 'components/Auth';
import { Header } from 'components/Header';
import { Loading } from 'components/UIkit';
import {
  CartList,
  OrderConfirm,
  OrderHistory,
  ProductDetail,
  ProductEdit,
  ProductList,
  Reset,
  SignIn,
  SignUp,
} from 'page';
import { useSelector } from 'react-redux';

const App = () => {
  const { loading } = useSelector((state) => state);

  return (
    <Main>
      <Router>
        {loading && <Loading />}
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signin/reset" element={<Reset />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/edit" element={<ProductEdit />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/cart" element={<CartList />} />
            <Route path="/order/confirm" element={<OrderConfirm />} />
            <Route path="/order/history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
    </Main>
  );
};

const Main = styled('main')({
  padding: '96px 0',
});

export default App;
