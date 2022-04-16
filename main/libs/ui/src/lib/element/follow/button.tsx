import { FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const FollowButton = () => {
  return (
    <IconButton
      size="large"
      aria-label="follow creator"
      aria-controls="creator-follow"
      aria-haspopup="true"
      color="inherit"
      sx={{
        borderRadius: 0,
      }}
    >
      <FavoriteBorderOutlined fontSize="large" />
    </IconButton>
  );
};
