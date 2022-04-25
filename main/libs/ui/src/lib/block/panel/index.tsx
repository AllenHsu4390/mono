import { Theme } from '@emotion/react';
import { Box, SxProps } from '@mui/material';

export const rainbowBackground = (opacity = 0.1) => `
  radial-gradient(circle at 50% 0,
    rgba(255, 0, 0, ${opacity}),
    rgba(255, 0, 0, 0) 70.71%),
  radial-gradient(circle at 6.7% 75%,
    rgba(0, 0, 255, ${opacity}),
    rgba(0, 0, 255, 0) 70.71%),
  radial-gradient(circle at 93.3% 75%,
    rgba(0, 255, 0, ${opacity}),
    rgba(0, 255, 0, 0) 70.71%);
`;

interface Props {
  className?: string;
  sx?: SxProps<Theme>;
}

const OverlapPanel: React.FC<Props> = ({ className, sx, children }) => {
  return (
    <Box
      className={className}
      sx={{
        background: rainbowBackground(),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default OverlapPanel;
