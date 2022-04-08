import { useQuery } from 'react-query';

import { Creator } from '@main/models';

import Page from '../_base/page';
import { CreatorProfile } from '../creator/profile';

import { AssetsGrid } from './grid';
import { AssetsGridSkeleton } from './skeleton';
import { CreatorProfileSkeleton } from '../creator/skeleton';

interface Props {
  creatorUrl: string;
}

interface CreatorResponse {
  links: [
    {
      rel: 'assets';
      url: string;
    }
  ];
}

export default function AlbumPage({ creatorUrl }: Props) {
  const { data, isLoading, isError } = useQuery<
    Creator & CreatorResponse,
    Error
  >(creatorUrl, async () => {
    const res = await fetch(creatorUrl);
    return res.json();
  });

  const shouldShowSkeleton = isLoading || isError || !data;

  if (shouldShowSkeleton) {
    return (
      <Page hasFooter={true} hasNavigation={true}>
        <CreatorProfileSkeleton />
        <AssetsGridSkeleton />;
      </Page>
    );
  }

  const { links } = data;

  return (
    <Page hasFooter={true} hasNavigation={true}>
      <CreatorProfile creator={data} />
      <AssetsGrid
        creator={data}
        assetsUrl={links.find((link) => link.rel === 'assets')?.url || '/404'}
      />
    </Page>
  );
}
