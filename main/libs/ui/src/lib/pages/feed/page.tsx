import { Follows, User } from '@main/models';
import { FollowsResponse, UserResponse } from '@main/rest';
import { Avatar, Container } from '@mui/material';
import Link from '../../element/link';
import Page from '../_base/page';

interface Props {
  user: User & UserResponse;
  follows: Follows & FollowsResponse;
}

export default function FeedPage({ user, follows }: Props) {
  const creatorLinks = follows.links.filter((l) => l.rel === 'follow');

  return (
    <Page hasFooter={true} hasNavigation={true} user={user}>
      <Container
        sx={{
          pt: 16,
        }}
      >
        {creatorLinks.map((l, index) => (
          <Link key={index} to={l.url}>
            <Avatar
              alt="Avatar"
              src={follows.follows[index].creator.avatarUrl}
              sx={{
                width: '4rem',
                height: '4rem',
              }}
            />
          </Link>
        ))}
      </Container>
    </Page>
  );
}
