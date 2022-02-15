import { Avatar } from '@mui/material';

const UserAvatar = ({ username }) => {
  const stringToColor = (string) => {
    let hash = 0;
    let color = '#';

    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  return (
    <Avatar
      sx={{
        bgcolor: stringToColor(username),
        width: 24,
        height: 24,
        fontSize: 16,
      }}
    >
      {username[0]?.toUpperCase()}
      {username[1]?.toLowerCase()}
    </Avatar>
  );
};

export default UserAvatar;
