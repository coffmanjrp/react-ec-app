import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {
  Box,
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
import { fetchCategories } from 'redux/categories/actions';
import { signOut } from 'redux/users/actions';
import { menus } from 'utils/data';

const ClosableDrawer = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <StyledDrawer>
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
          <IconButton onClick={(e) => onClose(e)}>
            <SearchIcon />
          </IconButton>
        </SearchField>
        <Box onClick={(e) => onClose(e)}>
          <List>
            {menus.map((menu) => (
              <ListItem
                key={menu.id}
                button
                onClick={() => navigate(menu.value)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {list?.map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={(e) => {
                  navigate(`/?category=${item.id}`);
                  onClose(e);
                }}
              >
                <ListItemText primary={item.name} onClick={(e) => onClose(e)} />
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
        </Box>
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
