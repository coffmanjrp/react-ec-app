import { useCallback, useState } from 'react';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '../UIkit';

const menus = [
  {
    id: 'register',
    label: 'Register Item',
    value: '/product/edit',
    icon: <AddCircleIcon />,
  },
  {
    id: 'history',
    label: 'Shop History',
    value: '/order/history',
    icon: <HistoryIcon />,
  },
];

const ClosableDrawer = ({ open, onClose }) => {
  const [keyword, setKeyword] = useState('');

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  console.log(keyword);

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
            <ListItem key={menu.id} button>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
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
