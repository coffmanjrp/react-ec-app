import { useCallback, useState } from 'react';
import { makeStyles } from '@mui/styles';
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from '../UIkit';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolBar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 32,
  },
}));

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
  const classes = useStyles();

  const inputKeyword = useCallback(
    (e) => {
      setKeyword(e.target.value);
    },
    [setKeyword]
  );

  console.log(keyword);

  return (
    <nav className={classes.drawer}>
      <Drawer
        anchor="right"
        open={open}
        classes={{ paper: classes.drawerPaper }}
        onClose={(e) => onClose(e)}
      >
        <Box className={classes.searchField}>
          <TextInput
            type={'text'}
            label={'Enter a keyword'}
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
        </Box>
        <Divider />
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
    </nav>
  );
};

export default ClosableDrawer;
