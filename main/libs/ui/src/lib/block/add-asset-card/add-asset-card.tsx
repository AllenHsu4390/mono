import { AddBoxOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { CreatorResponse } from '@main/rest-models';
import { useAddAsset } from '../../hooks/use-add-asset';
import { useRouter } from 'next/router';

interface Props {
  creator: CreatorResponse;
}

export const AddAssetCard = ({ creator }: Props) => {
  const themes = useTheme();
  const router = useRouter();
  const { addAsset } = useAddAsset({ creator });

  return (
    <Card
      sx={{
        background: `${themes.palette.secondary.main}`,
        textAlign: 'center',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <CardActionArea
        onClick={async () => {
          await addAsset();
          router.push(creator.links.gallery.url);
        }}
      >
        <CardContent
          sx={{
            height: '25vh',
            pt: '4rem',
          }}
        >
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
  );
};
