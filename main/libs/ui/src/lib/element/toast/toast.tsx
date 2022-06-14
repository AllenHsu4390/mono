import { Box, SxProps, Theme } from '@mui/material';
import { useEffect } from 'react';
import { keyframes } from '@emotion/react';

const fadeInAndOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

interface Props {
  color: string;
  content: React.ReactNode;
  sx: SxProps<Theme>;
  timer: number;
  onDelete?(): void;
}

const Toast = ({ color, content, sx, timer, onDelete }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onDelete && onDelete();
    }, timer);
    return () => {
      clearInterval(interval);
    };
  }, [onDelete, timer]);

  return (
    <Box
      sx={{
        position: 'absolute',
        animation: `${fadeInAndOut} ${timer / 1000}s linear 1 forwards`,
        color,
        ...sx,
      }}
    >
      {content}
    </Box>
  );
};

export default Toast;
