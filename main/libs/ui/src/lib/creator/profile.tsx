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
            margin: '40px auto 40px auto',
            width: '150px',
            height: '150px',
          }}
        />
      }
      follow={<FollowButton />}
      message={<MessageButton />}
    />
  );
}
