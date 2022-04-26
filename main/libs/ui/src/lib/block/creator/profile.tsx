import { Avatar, Typography } from '@mui/material';
import { Creator } from '@main/models';
import { CreatorProfileBase } from './base';

interface Props {
  creator: Creator;
}

export function CreatorProfile({ creator }: Props) {
  const { avatarUrl, desc } = creator;
  return (
    <CreatorProfileBase
      title={
        <Typography
          variant="h4"
          sx={{
            pl: '1rem',
          }}
        >
          {creator.name}
        </Typography>
      }
      description={
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{
            padding: '1rem',
          }}
        >
          {desc}
        </Typography>
      }
      avatar={
        <Avatar
          alt="Avatar"
          src={avatarUrl}
          sx={{
            width: '10rem',
            height: '10rem',
          }}
        />
      }
    />
  );
}
