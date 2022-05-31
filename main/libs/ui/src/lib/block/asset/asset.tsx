import { Alert, IconButton, Typography } from '@mui/material';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import Link from '../../element/link';
import { indigo } from '@mui/material/colors';
import { useDrop } from '../../hooks/use-drop';
import { AssetResponse } from '@main/rest-models';
import { CreatorLink } from '../../element/creator-link/creator-link';

interface Props {
  asset: AssetResponse;
}

export default function AssetInteractable({ asset }: Props) {
  const [drop] = useDrop();
  const socialMediaLinks = ['Instagram', 'Discord', 'Youtube'];
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
        contact={
          <>
            {socialMediaLinks.map((link, index) => (
              <>
                <CreatorLink key={link} to={link} label={link} />
                {index === socialMediaLinks.length - 1 ? null : ' · '}
              </>
            ))}
          </>
        }
        avatarTitle={
          <CreatorLink
            to={asset.links.creator.url}
            label={asset.creator.name}
            sx={{
              fontWeight: 'bold',
            }}
          />
        }
        counter={<LikeCounter asset={asset} />}
        actions={<LikeButton asset={asset} />}
      />
    </>
  );
}
