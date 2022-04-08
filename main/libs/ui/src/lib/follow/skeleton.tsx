import { FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const FollowButtonSkeleton = () => {
  return (
    <IconButton
      size="large"
      aria-label="follow creator"
      aria-controls="creator-follow"
      aria-haspopup="true"
      color="inherit"
      disabled={true}
    >
      <FavoriteBorderOutlined fontSize="large" />
    </IconButton>
  );
};
