import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar } from '@mui/material';
import { User } from '@main/models';
import { Title } from './title';
import { AppBar } from './appbar';
import Link from '../link';

interface UserResponse {
  links: {
    rel: 'new-album' | 'logout' | 'login' | 'edit-account';
    url: string;
  }[];
}

interface Props {
  user: User & UserResponse;
}

const menuLabel = (rel: string) => {
  switch (rel) {
    case 'new-album':
      return 'Create Album';
    case 'logout':
      return 'Logout';
    case 'login':
      return 'Login';
    case 'edit-account':
      return 'Settings';
    default:
      return '';
  }
};

const menuOrder = ['new-album', 'edit-account', 'logout', 'login'];

export default function Navigation({ user }: Props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user.links
        .sort((a, b) => menuOrder.indexOf(a.rel) - menuOrder.indexOf(b.rel))
        .map((l) => (
          <MenuItem key={l.url}>
            <Link to={l.url}>{menuLabel(l.rel)}</Link>
          </MenuItem>
        ))}
    </Menu>
  );

  return (
    <AppBar>
      <Toolbar
        sx={{
          width: ['100%', '100%', '100%', `${theme.breakpoints.values.lg}px`],
          margin: 'auto',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Title />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Badge badgeContent={7} color="error">
              <Avatar
                alt="Avatar"
                src={user.avatarUrl}
                sx={{
                  width: '40px',
                  height: '40px',
                }}
              />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
}
