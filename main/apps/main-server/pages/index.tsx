import { auth } from '@main/auth';
import { withRedirect404OnError } from '@main/next-utils';
import { getTopAssets, getUserOrNull } from '@main/rest';
import { AssetsResponse, UserResponse } from '@main/rest-models';
import { FeedPage } from '@main/ui';
import { GetServerSideProps, NextPage } from 'next';
import { z } from 'zod';

interface Props {
  user: UserResponse | null;
  assets: AssetsResponse;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req }) => {
    const { idKey } = z
      .object({
        idKey: z.string().optional(),
      })
      .parse(req.cookies);

    const userId = idKey ? auth().identity.userId(idKey) : null;
    const user = userId ? await getUserOrNull(userId) : null;
    const assets = await getTopAssets('1');
    const props: Props = {
      user,
      assets,
    };

    return {
      props,
    };
  }
);

const Home: NextPage<Props> = ({ user, assets }) => {
  return <FeedPage user={user} initialAssets={assets} />;
};

export default Home;
