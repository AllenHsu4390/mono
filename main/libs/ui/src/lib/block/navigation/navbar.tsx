import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Button, Container } from '@mui/material';
import { Title } from './title';
import { AppBar } from './appbar';
import Link from '../../element/link';
import BalanceLabel from '../../element/balance';
import ProfileMenu from '../profile-menu';
import { useSendMint } from '../../hooks/mint';
import { useBalance } from '../../hooks/balance';
import { page } from '../../providers/theme';
import { UserResponse } from '@main/rest-models';

interface Props {
  user?: UserResponse;
}

export default function Navigation({ user }: Props) {
  const theme = useTheme();
  const { sendMint } = useSendMint({
    onError: () => console.log('mint failed'),
  });
  const { refetchBalance } = useBalance();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = user
    ? [
        <MenuItem key={user.links.newGallery.url}>
          <Link to={user.links.newGallery.url}>{user.name}</Link>
        </MenuItem>,
        <MenuItem key={user.links.editAccount.url}>
          <Link to={user.links.editAccount.url}>{'Settings'}</Link>
        </MenuItem>,
        <MenuItem key={'/users/logout'}>
          <Link to={'/users/logout'}>{'Logout'}</Link>
        </MenuItem>,
      ]
    : [
        <MenuItem key={'/users/login'}>
          <Link to={'/users/login'}>Login</Link>
        </MenuItem>,
      ];

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
      {menuItems}
    </ProfileMenu>
  );

  return (
    <AppBar>
      <Toolbar
        sx={{
          width: page.maxWidth,
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
            {user ? (
              <Button
                onClick={async () => {
                  await sendMint();
                  await refetchBalance();
                }}
              >
                <BalanceLabel user={user} />
              </Button>
            ) : null}
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
