import { Box, SxProps, Theme } from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  show: boolean;
  color: string;
  content: React.ReactNode;
  sx: SxProps<Theme>;
}

const Toast = ({ show, color, content, sx }: Props) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    return () => {
      setIsVisible(false);
    };
  }, [show, isVisible, setIsVisible]);

  return (
    <Box
      sx={{
        position: 'absolute',
        opacity: `${isVisible ? '1' : '0'}`,
        transition: isVisible ? `opacity 3s linear` : `opacity 3s ease-out`,
        color: color,
        ...sx,
      }}
    >
      {content}
    </Box>
  );
};

export default Toast;
