import { Box, SxProps, Theme } from '@mui/material';
import { useEffect } from 'react';
import { keyframes } from '@emotion/react';

const fadeInAndOut = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

interface Props {
  content: React.ReactNode;
  sx: SxProps<Theme>;
  timer: number;
  color?: string;
  onDelete?(): void;
}

const useTimer = ({ onDone, timer }: { onDone?(): void; timer: number }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onDone && onDone();
    }, timer);
    return () => {
      clearInterval(interval);
    };
  }, [onDone, timer]);
};

const Toast = ({ color, content, sx, timer, onDelete }: Props) => {
  useTimer({ timer, onDone: onDelete });

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
