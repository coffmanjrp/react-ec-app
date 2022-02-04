import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '../UIkit';
import { signOut } from 'redux/users/usersActions';
import { menus } from 'utils/data';

const ClosableDrawer = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const handleSignOut = (e) => {
    onClose(e);
    dispatch(signOut());
    navigate('/signin');
  };

  return (
    <StyledDrawer component="nav">
      <Drawer
        anchor="right"
        open={open}
        sx={classes.drawerPaper}
        onClose={(e) => onClose(e)}
      >
        <SearchField>
          <TextInput
            type="text"
            label="Enter a keyword"
            fullWidth={false}
            multiple={false}
            rows={1}
            required={false}
            value={keyword}
            onChange={inputKeyword}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </SearchField>
        <List>
          {menus.map((menu) => (
            <ListItem key={menu.id} button onClick={() => navigate(menu.value)}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Out'} />
          </ListItem>
        </List>
      </Drawer>
    </StyledDrawer>
  );
};

const StyledDrawer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    flexShrink: 0,
    width: 256,
  },
}));

const SearchField = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 32,
});

const classes = {
  drawerPaper: {
    width: 256,
  },
};

export default ClosableDrawer;
