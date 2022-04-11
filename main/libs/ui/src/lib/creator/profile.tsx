import { Avatar, Box, Container, Stack, Typography } from '@mui/material';
import { Creator } from '@main/models';
import { FollowButton } from '../follow/button';
import { MessageButton } from '../message/button';
import { CreatorProfileBase } from './base';

interface Props {
  creator: Creator;
}

export function CreatorProfile({ creator }: Props) {
  const { avatarUrl, desc } = creator;
  return (
    <CreatorProfileBase
      description={
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {desc}
        </Typography>
      }
      avatar={
        <Avatar
          alt="Avatar"
          src={avatarUrl}
          sx={{
            margin: '4rem auto 4rem auto',
            width: '10rem',
            height: '10rem',
          }}
        />
      }
      follow={<FollowButton />}
      message={<MessageButton />}
    />
  );
}
