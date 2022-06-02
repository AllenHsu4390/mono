import { CreatorResponse } from '@main/rest-models';
import { Avatar, Typography, Button } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { Box, useTheme } from '@mui/system';
import { CreatorLink } from '../../element/creator-link/creator-link';
import Link from '../../element/link';
import { CreatorProfileBase } from './base';

interface Props {
  creator: CreatorResponse;
}

export function CreatorProfile({ creator }: Props) {
  const { avatarUrl, desc } = creator;
  const socialMediaLinks = ['Instagram', 'Discord', 'Youtube'];
  return (
    <CreatorProfileBase
      title={
        <Typography
          variant="h4"
          sx={{
            pl: '1rem',
            pb: '1rem',
          }}
        >
          {creator.name}
        </Typography>
      }
      description={
        <Typography
          variant="h5"
          color="text.secondary"
          paragraph
          sx={{
            pl: '1rem',
            pt: '1rem',
          }}
        >
          {desc}
        </Typography>
      }
      contact={
        <Box
          sx={{
            pl: '1rem',
          }}
        >
          {socialMediaLinks.map((link, index) => (
            <>
              <CreatorLink
                key={link}
                to={link}
                label={link}
                sx={{
                  fontSize: '1.2rem',
                }}
              />
              {index === socialMediaLinks.length - 1 ? null : ' · '}
            </>
          ))}
        </Box>
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
    />
  );
}
