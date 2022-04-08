import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Creator } from '@main/models';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  ChatBubbleOutline,
  ChatBubbleOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from '@mui/icons-material';
import { FollowButton } from '../follow/button';
import { MessageButton } from '../message/button';

interface Props {
  creator: Creator;
}

export function CreatorProfile({ creator }: Props) {
  const { avatarUrl, desc } = creator;
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          {desc}
        </Typography>
        <Avatar
          alt="Avatar"
          src={avatarUrl}
          sx={{
            margin: '40px auto 40px auto',
            width: '150px',
            height: '150px',
          }}
        />
        <Stack
          sx={{
            pt: 2,
          }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <FollowButton />
          <MessageButton />
        </Stack>
      </Container>
    </Box>
  );
}
