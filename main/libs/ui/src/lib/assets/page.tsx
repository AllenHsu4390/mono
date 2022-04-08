import { useQuery } from 'react-query';

import { Creator } from '@main/models';

import Page from '../_base/page';
import { CreatorProfile } from '../creator/profile';

import { AssetsGrid } from './grid';
import { AssetsGridSkeleton } from './skeleton';
import { CreatorProfileSkeleton } from '../creator/skeleton';

interface Props {
  creatorId?: string;
}

export default function AlbumPage({ creatorId }: Props) {
  const { data, status } = useQuery<Creator, Error>(
    ['creator', creatorId],
    async () => {
      const res = await fetch(`/api/creators/${creatorId}`);
      return res.json();
    }
  );

  const shouldShowSkeleton =
    status === 'loading' || status === 'error' || !data;

  if (shouldShowSkeleton) {
    return (
      <Page hasFooter={true} hasNavigation={true}>
        <CreatorProfileSkeleton />
        <AssetsGridSkeleton />;
      </Page>
    );
  }

  return (
    <Page hasFooter={true} hasNavigation={true}>
      <CreatorProfile creator={data} />
      <AssetsGrid creator={data} />
    </Page>
  );
}
