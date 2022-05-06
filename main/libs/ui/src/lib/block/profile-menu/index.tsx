import { Menu, MenuProps, styled } from '@mui/material';

const ProfileMenu = styled((props: MenuProps) => <Menu {...props} />)(
  ({ theme }) => ({
    '& .MuiPaper-root': {
      boxShadow: `0 0.1rem 0.1rem 0.01rem ${theme.palette.secondary.dark}`,
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
