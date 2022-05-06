import { Creator } from '@main/rest-models';
import { Avatar, Stack, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import Link from '../link';

interface Props {
  creator: Creator;
  linkTo: string;
}

const CreatorAvatar = ({ creator, linkTo }: Props) => {
  return (
    <Link to={linkTo}>
      <Avatar
        className="avatar"
        alt={creator.name}
        src={creator.avatarUrl}
        sx={{
          width: '3rem',
          height: '3rem',
          margin: 'auto',
          boxSizing: 'border-box',
          border: `2px solid white`,
        }}
      />
    </Link>
  );
};

export default CreatorAvatar;
