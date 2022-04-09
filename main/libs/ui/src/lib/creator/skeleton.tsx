import { Box, Button, Container, Skeleton, Stack } from '@mui/material';
import { FollowButtonSkeleton } from '../follow/skeleton';
import { MessageButtonSkeleton } from '../message/skeleton';
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
              height: '16px',
              marginBottom: '6px',
              borderRadius: 0,
            }}
          />
          <Skeleton
            animation="pulse"
            sx={{
              width: '80%',
              height: '16px',
              marginBottom: '6px',
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
            margin: '40px auto 40px auto',
            width: '150px',
            height: '150px',
          }}
        />
      }
      follow={<FollowButtonSkeleton />}
      message={<MessageButtonSkeleton />}
    />
  );
}
