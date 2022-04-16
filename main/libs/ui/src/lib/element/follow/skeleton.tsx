import { FavoriteBorderOutlined } from '@mui/icons-material';
import { IconButton, Skeleton } from '@mui/material';

export const FollowButtonSkeleton = () => {
  return (
    <Skeleton
      animation="pulse"
      sx={{
        width: '6rem',
        height: '2.5rem',
      }}
    />
  );
};
