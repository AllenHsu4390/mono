import { User } from '@main/models';
import { UserResponse } from '@main/rest';
import { Container } from '@mui/material';
import Link from '../link';
import Page from '../_base/page';

interface Props {
  user: User & UserResponse;
}

export default function AlbumPage({ user }: Props) {
  return (
    <Page hasFooter={true} hasNavigation={true} user={user}>
      <Container
        sx={{
          pt: 10,
        }}
      >
        {user.links
          .filter((l) => l.rel === 'follows')
          .map((l) => (
            <Link to={l.url}>{l.url}</Link>
          ))}
      </Container>
    </Page>
  );
}
