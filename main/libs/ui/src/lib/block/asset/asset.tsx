import { Container } from '@mui/material';
import { Asset, Cost } from '@main/models';
import { AssetResponse } from '@main/rest';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { useBalance } from '../../hooks/balance';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import TopupButton from '../../element/topup-button';

interface Props {
  asset: Asset & AssetResponse;
}

export default function AssetInteractable({ asset }: Props) {
  const { balance } = useBalance();

  return (
    <Container
      sx={{
        pt: 16,
        pb: 10,
      }}
      maxWidth="md"
    >
      <AssetCardFull
        asset={asset}
        isPreloaded={true}
        avatar={
          <CreatorAvatar
            creator={asset.creator}
            linkTo={asset.links.find((l) => l.rel === 'creator')?.url || '/404'}
          />
        }
        counter={<LikeCounter asset={asset} />}
        actions={
          balance && balance.sum > Cost.Like ? (
            <LikeButton asset={asset} />
          ) : (
            <TopupButton />
          )
        }
      />
    </Container>
  );
}
