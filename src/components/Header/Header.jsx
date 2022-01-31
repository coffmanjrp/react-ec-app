import { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Box, Toolbar } from '@mui/material';
import { ClosableDrawer, HeaderMenus } from '.';
import logo from 'assets/img/logo.png';

const useStyles = makeStyles({
  root: { flexGrow: 1 },
  toolBar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1024,
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
});

const Header = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleDrawerToggle = useCallback(
    (e) => {
      if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
        return;
      }

      setOpen((prevState) => !prevState);
    },
    [open, setOpen]
  );

  return (
    <Box className={classes.root}>
      <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#444' }}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="Logo" width="128px" />
          <Box className={classes.iconButtons}>
            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
          </Box>
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </Box>
  );
};

export default Header;
