import { GetServerSideProps, NextPage } from 'next';
import { NewGalleryPage } from '@main/ui';
import { auth } from '@main/auth';
import { getUser } from '@main/rest';
import { UserResponse } from '@main/rest-models';
import { z } from 'zod';
import { withRedirect404OnError } from '@main/next-utils';

interface Props {
  user: UserResponse;
}

export const getServerSideProps: GetServerSideProps = withRedirect404OnError(
  async ({ req }) => {
    const { idKey } = z
      .object({
        idKey: z.string(),
      })
      .parse(req.cookies);

    const userId = auth().identity.userId(idKey);
    const user = await getUser(userId);
    const props: Props = {
      user,
    };

    return {
      props,
    };
  }
);

const NewGalleryNextPage: NextPage<Props> = ({ user }) => {
  return <NewGalleryPage user={user} />;
};

export default NewGalleryNextPage;
