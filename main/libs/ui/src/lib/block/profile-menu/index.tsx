import { Menu, MenuProps, styled } from '@mui/material';

const ProfileMenu = styled((props: MenuProps) => <Menu {...props} />)(
  ({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 0,
      border: `1px solid ${theme.palette.secondary.dark}`,
      padding: 0,
    },
    '& .MuiMenu-list': {
      padding: 0,
    },
    '& .MuiMenuItem-root': {
      padding: '0.8rem',
    },
  })
);

export default ProfileMenu;
