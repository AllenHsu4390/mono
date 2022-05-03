import { Alert, Typography } from '@mui/material';
import { Asset, Creator } from '@main/models';
import { AssetResponse } from '@main/rest';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import Link from '../../element/link';
import { indigo } from '@mui/material/colors';
import { useDrop } from '../../hooks/drop';

interface Props {
  asset: Asset & AssetResponse;
}

export default function AssetInteractable({ asset }: Props) {
  const [drop, setDrop] = useDrop();
  return (
    <>
      {drop.isDropped && (
        <Alert severity="success">
          You got a drop! Asset id: {drop.assetId}
        </Alert>
      )}
      <AssetCardFull
        asset={asset}
        isPreloaded={true}
        avatar={
          <CreatorAvatar
            creator={asset.creator}
            linkTo={asset.links.find((l) => l.rel === 'creator')?.url || '/404'}
          />
        }
        avatarTitle={
          <Link
            to={asset.links.find((l) => l.rel === 'creator')?.url || '/404'}
          >
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
