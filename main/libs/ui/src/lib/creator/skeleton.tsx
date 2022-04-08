import { Box, Button, Container, Skeleton, Stack } from '@mui/material';
import { FollowButtonSkeleton } from '../follow/skeleton';
import { MessageButtonSkeleton } from '../message/skeleton';

export function CreatorProfileSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
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
        <Skeleton
          animation="pulse"
          variant="circular"
          sx={{
            margin: '40px auto 40px auto',
            width: '150px',
            height: '150px',
          }}
        />
        <Stack
          sx={{
            pt: 4,
          }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <FollowButtonSkeleton />
          <MessageButtonSkeleton />
        </Stack>
      </Container>
    </Box>
  );
}
