import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Container } from '@mui/material';
import { User } from '@main/models';
import { Title } from './title';
import { AppBar } from './appbar';
import Link from '../../element/link';
import { UserResponse } from '@main/rest';
import BalanceLabel from '../../element/balance';
import ProfileMenu from '../profile-menu';

interface Props {
  user?: User & UserResponse;
}

const menuLabel = (rel: string, creatorName: string) => {
  switch (rel) {
    case 'new-gallery':
      return `${creatorName}`;
    case 'logout':
      return 'Logout';
    case 'edit-account':
      return 'Settings';
    default:
      return '';
  }
};

const menuOrder = ['new-gallery', 'edit-account', 'logout'];

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

  const renderMenu = (
    <ProfileMenu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        user.links
          .filter((l) => !!menuLabel(l.rel, user.name))
          .sort((a, b) => menuOrder.indexOf(a.rel) - menuOrder.indexOf(b.rel))
          .map((l) => (
            <MenuItem key={l.url}>
              <Link to={l.url}>{menuLabel(l.rel, user.name)}</Link>
            </MenuItem>
          ))
      ) : (
        <MenuItem key={'/users/login'}>
          <Link to={'/users/login'}>Login</Link>
        </MenuItem>
      )}
    </ProfileMenu>
  );

  return (
    <AppBar>
      <Toolbar
        sx={{
          width: '100%',
          margin: 'auto',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Title />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Container
            sx={{
              color: theme.palette.primary.dark,
              borderRadius: '0.3rem',
              padding: '0.2rem',
            }}
          >
            {user ? <BalanceLabel user={user} /> : null}
          </Container>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              borderRadius: 0,
            }}
          >
            <Avatar
              alt="Avatar"
              src={user && user.avatarUrl}
              sx={{
                width: '2.5rem',
                height: '2.5rem',
              }}
            />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
}
