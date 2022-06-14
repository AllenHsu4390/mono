import { Alert } from '@mui/material';
import LikeButton from '../../element/like-button';
import CreatorAvatar from '../../element/avatar';
import { AssetCardFull } from './card-full';
import LikeCounter from '../../element/like-counter';
import { useDrop } from '../../hooks/use-drop';
import { AssetResponse, UserResponse } from '@main/rest-models';
import { CreatorLink } from '../../element/creator-link/creator-link';
import DeleteAssetButton from '../../element/delete-asset-button';

interface Props {
  asset: AssetResponse;
  user: UserResponse;
}

export default function AssetInteractable({ asset, user }: Props) {
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
              <span key={link}>
                <CreatorLink to={link} label={link} />
                {index === socialMediaLinks.length - 1 ? null : ' · '}
              </span>
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
        actions={
          <>
            {asset.links.like ? <LikeButton asset={asset} /> : null}
            {asset.links.delete ? <DeleteAssetButton asset={asset} /> : null}
          </>
        }
      />
    </>
  );
}
