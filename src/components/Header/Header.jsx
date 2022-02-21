import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ClosableDrawer, HeaderMenus } from '.';
import logo from 'assets/img/logo.png';
import { fetchProducts } from 'redux/products/actions';

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.users);

  const handleDrawerToggle = useCallback(
    (e) => {
      if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
        return;
      }

      setOpen((prevState) => !prevState);
    },
    [setOpen]
  );

  const handleClick = () => {
    navigate('/');
    dispatch(fetchProducts());
  };

  return (
    <Box setIndex={classes.root}>
      <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#444' }}>
        <Toolbar sx={classes.toolBar}>
          <Logo onClick={handleClick}>
            <img src={logo} alt="Logo" width="128px" />
          </Logo>
          {uid && (
            <Box sx={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </Box>
  );
};

const Logo = styled('div')({
  cursor: 'pointer',
});

const classes = {
  root: { flexGrow: 1 },
  toolBar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1024,
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
};

export default Header;
