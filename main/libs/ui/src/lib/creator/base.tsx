import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import { Creator } from '@main/models';
import { FollowButton } from '../follow/button';
import { MessageButton } from '../message/button';
import React from 'react';

interface Props {
  description: React.ReactNode;
  avatar: React.ReactNode;
  follow: React.ReactNode;
  message: React.ReactNode;
}

export function CreatorProfileBase({
  description,
  avatar,
  follow,
  message,
}: Props) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 18,
        pb: 10,
      }}
    >
      <Container maxWidth="sm">
        {description}
        {avatar}
        <Stack
          sx={{
            pt: 2,
          }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {follow}
          {message}
        </Stack>
      </Container>
    </Box>
  );
}
