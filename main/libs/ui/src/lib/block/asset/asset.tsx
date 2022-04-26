import { Container, Typography } from '@mui/material';
import { Asset, Cost } from '@main/models';
import { AssetResponse } from '@main/rest';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { useBalance } from '../../hooks/balance';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import TopupButton from '../../element/topup-button';
import Link from '../../element/link';
import { indigo } from '@mui/material/colors';

interface Props {
  asset: Asset & AssetResponse;
}

export default function AssetInteractable({ asset }: Props) {
  const { balance } = useBalance();

  return (
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
        <Link to={asset.links.find((l) => l.rel === 'creator')?.url || '/404'}>
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
      actions={
        balance && balance.sum >= Cost.Like ? (
          <LikeButton asset={asset} />
        ) : (
          <TopupButton />
        )
      }
    />
  );
}
