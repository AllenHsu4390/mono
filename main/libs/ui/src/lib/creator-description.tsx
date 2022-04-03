import React from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

interface Props {
  desc: string;
  avatarUrl: string;
}

export function CreatorDescription({ avatarUrl, desc }: Props) {
  return (
    <>
      <Avatar
        alt="Avatar"
        src={avatarUrl}
        sx={{
          margin: '40px auto 40px auto',
          width: '150px',
          height: '150px',
        }}
      />
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {desc}
      </Typography>
      <Stack
        sx={{
          pt: 4,
        }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Button variant="contained">Follow</Button>
        <Button variant="outlined">Message</Button>
      </Stack>
    </>
  );
}
