import { Favorite } from '@mui/icons-material';
import {
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import Toast from '../toast';

interface Props {
  onClick(): void;
  isLoading: boolean;
  likes: number;
  showToast: boolean;
  toastContent: React.ReactNode;
}

const LikeButton: React.FC<Props> = ({
  onClick,
  likes,
  isLoading,
  showToast,
  toastContent,
}) => {
  const theme = useTheme();
  const textStyle: SxProps<Theme> = {
    color: theme.palette.secondary.light,
    fontWeight: 'bold',
    textShadow: '1px 1px 3px pink',
  };

  return (
    <IconButton
      size="large"
      aria-label="like asset"
      aria-controls="like"
      aria-haspopup="true"
      sx={{
        borderRadius: '0',
        position: 'relative',
        display: 'block',
        textAlign: 'center',
        padding: '1rem',
      }}
      onClick={onClick}
    >
      <Box>
        <Typography
          sx={{
            ...textStyle,
          }}
        >
          {isLoading ? '...' : likes}
        </Typography>
      </Box>
      <Box>
        <Favorite
          fontSize="large"
          sx={{
            mt: '0.2rem',
            display: 'inline-flex',
            ...textStyle,
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            ...textStyle,
          }}
        >
          60 SNP
        </Typography>
      </Box>
      <Toast
        show={showToast}
        color={theme.palette.success.main}
        content={toastContent}
        sx={{
          top: '3rem',
          right: '7.5rem',
          ...textStyle,
        }}
      />
    </IconButton>
  );
};

export default LikeButton;
