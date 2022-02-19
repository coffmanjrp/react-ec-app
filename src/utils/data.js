import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';

export const genders = [
  { id: 'all', name: 'All' },
  { id: 'women', name: 'Women' },
  { id: 'men', name: 'Men' },
  { id: 'female', name: 'Women' },
  { id: 'girls', name: 'Girls' },
  { id: 'baby', name: 'Baby' },
];

export const categories = [
  { id: 'shirts', name: 'Shirts' },
  { id: 'bags', name: 'Bags' },
  { id: 'shoes', name: 'Shoes' },
];

export const menus = [
  {
    id: 'register',
    label: 'Register Item',
    value: '/product/edit',
    icon: <AddCircleIcon />,
  },
  {
    id: 'history',
    label: 'Order History',
    value: '/order/history',
    icon: <HistoryIcon />,
  },
];
