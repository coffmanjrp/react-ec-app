import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
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
import { history } from 'redux/store/store';

const App = () => {
  const { loading } = useSelector((state) => state);

  return (
    <Main>
      <Router history={history}>
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
