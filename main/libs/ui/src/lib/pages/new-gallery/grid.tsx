import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';

export const NewAssetsGrid: React.FC = () => {
  const themes = useTheme();
  return (
    <Grid
      container
      spacing={{
        xs: 2,
        sm: 3,
        md: 4,
      }}
    >
      {new Array(10).fill(null).map((_, index) => (
        <Grid item key={index} xs={12} sm={4} md={4} lg={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 0,
              boxShadow: 'none',
              background: `${themes.palette.secondary.main}`,
              textAlign: 'center',
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography color="text.secondary">{`Add something to the gallery`}</Typography>
                <Box
                  sx={{
                    pt: 2,
                    pb: 1,
                  }}
                >
                  <AddBoxOutlined fontSize="large" />
                </Box>
                <Typography color="text.secondary">{`It can be anything. Image, Video, Music, Link, Text`}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
