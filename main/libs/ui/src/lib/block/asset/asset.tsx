import { Alert, IconButton, Typography } from '@mui/material';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import Link from '../../element/link';
import { indigo } from '@mui/material/colors';
import { useDrop } from '../../hooks/drop';
import { AssetResponse } from '@main/rest-models';

interface Props {
  asset: AssetResponse;
}

export default function AssetInteractable({ asset }: Props) {
  const [drop] = useDrop();
  return (
    <>
      {drop.isDropped && (
        <Alert severity="success">
          You got a drop! Asset id: {drop.assetId}
        </Alert>
      )}
      <AssetCardFull
        asset={asset}
        avatar={
          <CreatorAvatar
            creator={asset.creator}
            linkTo={asset.links.creator.url}
          />
        }
        avatarTitle={
          <Link to={asset.links.creator.url}>
            <Typography
              fontWeight={'bold'}
              sx={{
                transition: 'color 0.6s ease',
                ':hover': {
                  color: indigo[600],
                  textDecoration: 'underline',
                },
              }}
            >
              {asset.creator.name}
            </Typography>
          </Link>
        }
        counter={<LikeCounter asset={asset} />}
        actions={<LikeButton asset={asset} />}
      />
    </>
  );
}
