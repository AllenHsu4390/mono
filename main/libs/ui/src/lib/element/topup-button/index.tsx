import { Add } from '@mui/icons-material';
import { IconButton, Typography, useTheme } from '@mui/material';

const TopupButton = () => {
  const theme = useTheme();

  return (
    <IconButton
      size="large"
      aria-label="like asset"
      aria-controls="like"
      aria-haspopup="true"
      sx={{
        borderRadius: '0',
        textAlign: 'center',
        padding: '1rem',
        color: theme.palette.primary.main,
      }}
    >
      <Add
        fontSize="small"
        sx={{
          verticalAlign: 'middle',
        }}
      />
    </IconButton>
  );
};

export default TopupButton;
