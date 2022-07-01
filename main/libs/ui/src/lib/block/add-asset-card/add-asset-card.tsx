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
        background: `${themes.palette.secondary.main}`,
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
            <Typography color="text.secondary">{`Drag a new image here`}</Typography>
          </CardContent>
        </FileDrop>
      </CardActionArea>
    </Card>
  );
};
