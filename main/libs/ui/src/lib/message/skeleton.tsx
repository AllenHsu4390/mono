import { ChatBubbleOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const MessageButtonSkeleton = () => {
  return (
    <IconButton
      size="large"
      aria-label="message creator"
      aria-controls="creator-chat"
      aria-haspopup="true"
      color="inherit"
      disabled={true}
    >
      <ChatBubbleOutline fontSize="large" />
    </IconButton>
  );
};
