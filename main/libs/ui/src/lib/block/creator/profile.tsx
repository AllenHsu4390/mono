import { Avatar, Stack, Typography } from '@mui/material';
import { Creator } from '@main/models';
import { FollowButton } from '../../element/follow/button';
import { MessageButton } from '../../element/message/button';
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
          color="text.secondary"
          paragraph
          sx={{
            padding: '1rem',
          }}
        >
          {desc}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
          facilis! Nobis culpa quod doloremque in soluta? Natus, nihil, aut
          omnis, fuga adipisci delectus vero harum magni nam nobis sapiente
          laudantium.
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
      controls={
        <Stack direction="row" spacing={2} justifyContent="center">
          {<FollowButton />}
        </Stack>
      }
    />
  );
}
