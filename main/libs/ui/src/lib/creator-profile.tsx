import React from 'react';
import { Box, Container } from '@mui/material';
import { Creator } from '@main/models';
import { CreatorDescription } from './creator-description';

interface Props {
  creator: Creator;
}

export function CreatorProfile({ creator }: Props) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <CreatorDescription {...creator} />
      </Container>
    </Box>
  );
}
