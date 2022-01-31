import { makeStyles } from '@mui/styles';
import { AppBar, Box, Toolbar } from '@mui/material';
import logo from 'assets/img/logo.png';

const useStyles = makeStyles({
  toolBar: {
    margin: '0 auto',
    width: '100%',
    maxWidth: 1024,
  },
  iconButton: {
    margin: '0 0 0 auto',
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#fff', color: '#444' }}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="Logo" width="128px" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
