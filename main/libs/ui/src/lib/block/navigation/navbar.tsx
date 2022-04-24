import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Container, Typography } from '@mui/material';
import { User } from '@main/models';
import { Title } from './title';
import { AppBar } from './appbar';
import Link from '../../element/link';
import { UserResponse } from '@main/rest';
import { FavoriteBorder } from '@mui/icons-material';

interface Props {
  user: User & UserResponse;
}

const menuLabel = (rel: string) => {
  switch (rel) {
    case 'new-gallery':
      return 'My Gallery';
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
        .filter((l) => !!menuLabel(l.rel))
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
          <Container
            sx={{
              color: theme.palette.primary.dark,
              borderRadius: '0.3rem',
              padding: '0.2rem',
            }}
          >
            <FavoriteBorder
              fontSize="small"
              sx={{
                verticalAlign: 'middle',
              }}
            />
            <Typography
              sx={{
                ml: '0.2rem',
                display: 'inline',
                verticalAlign: 'middle',
              }}
              component="p"
            >
              1000 SNP
            </Typography>
          </Container>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              borderRadius: 0,
            }}
          >
            <Avatar
              alt="Avatar"
              src={user.avatarUrl}
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
