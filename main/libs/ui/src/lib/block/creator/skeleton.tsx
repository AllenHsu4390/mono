import { Box, Button, Container, Skeleton, Stack } from '@mui/material';
import { FollowButtonSkeleton } from '../../element/follow/skeleton';
import { MessageButtonSkeleton } from '../../element/message/skeleton';
import { CreatorProfileBase } from './base';

export function CreatorProfileSkeleton() {
  return (
    <CreatorProfileBase
      description={
        <>
          <Skeleton
            animation="pulse"
            sx={{
              width: '100%',
              height: '1rem',
              marginBottom: '0.4rem',
              borderRadius: 0,
            }}
          />
          <Skeleton
            animation="pulse"
            sx={{
              width: '80%',
              height: '1rem',
              marginBottom: '0.4rem',
              borderRadius: 0,
            }}
          />
        </>
      }
      avatar={
        <Skeleton
          animation="pulse"
          variant="circular"
          sx={{
            margin: '4rem auto 4rem auto',
            width: '10rem',
            height: '10rem',
          }}
        />
      }
      follow={<FollowButtonSkeleton />}
      message={<MessageButtonSkeleton />}
    />
  );
}
