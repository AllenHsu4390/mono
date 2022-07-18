import { AddBoxOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import type { AssetsResponse, CreatorResponse } from '@main/rest-models';
import { useAddAsset } from '../../hooks/use-add-asset';
import { useRouter } from '../../hooks/use-router';
import { FileDrop } from '../file-drop';

interface Props {
  creator: CreatorResponse;
  assets: AssetsResponse;
}

export const AddAssetCard = ({ creator, assets }: Props) => {
  const themes = useTheme();
  const router = useRouter();
  const { addAsset } = useAddAsset({ creator, assets });

  const onFileChange = async (file: File) => {
    const result = await addAsset(file);
    router.push(result.links.asset);
  };

  return (
    <Card
      sx={{
        textAlign: 'center',
        borderRadius: 0,
        boxShadow: 'none',
      }}
    >
      <CardActionArea>
        <FileDrop onFileChange={onFileChange}>
          <CardContent
            sx={{
              height: '25vh',
              lineHeight: '25vh',
              padding: 0,
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                verticalAlign: 'middle',
                lineHeight: 'normal',
              }}
            >
              <Typography color="text.secondary">
                Drag a new image here to add to the gallery
              </Typography>
            </Box>
          </CardContent>
        </FileDrop>
      </CardActionArea>
    </Card>
  );
};
