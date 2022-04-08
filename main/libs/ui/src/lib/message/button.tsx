import { ChatBubbleOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const MessageButton = () => {
  return (
    <IconButton
      size="large"
      aria-label="message creator"
      aria-controls="creator-chat"
      aria-haspopup="true"
      color="inherit"
    >
      <ChatBubbleOutline fontSize="large" />
    </IconButton>
  );
};
