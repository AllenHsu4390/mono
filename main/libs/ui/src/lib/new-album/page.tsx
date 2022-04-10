import Page from '../_base/page';

import { NewAssetsGrid } from './grid';

interface Props {
  userUrl: string;
}

export default function NewAlbumPage({ userUrl }: Props) {
  return (
    <Page hasFooter={true} hasNavigation={true} userUrl={userUrl}>
      <NewAssetsGrid />
    </Page>
  );
}
