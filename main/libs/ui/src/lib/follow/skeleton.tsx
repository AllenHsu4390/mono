import { FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton, Skeleton } from '@mui/material';

export const FollowButtonSkeleton = () => {
  return (
    <Skeleton
      animation="pulse"
      sx={{
        width: '100px',
        height: '40px',
      }}
    />
  );
};
