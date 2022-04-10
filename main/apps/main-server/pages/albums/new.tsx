import { NextPage } from 'next';
import { NewAlbumPage } from '@main/ui';

const NewAlbumNextPage: NextPage = () => {
  return <NewAlbumPage userUrl={`/api/users/me`} />;
};

export default NewAlbumNextPage;
