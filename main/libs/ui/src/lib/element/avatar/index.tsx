import { Creator } from '@main/models';
import { Avatar, useTheme } from '@mui/material';
import Link from '../link';

interface Props {
  creator: Creator;
  linkTo: string;
}

const CreatorAvatar: React.FC<Props> = ({ creator, linkTo }) => {
  const theme = useTheme();
  return (
    <Link to={linkTo}>
      <Avatar
        alt={creator.id}
        src={creator.avatarUrl}
        sx={{
          width: '4rem',
          height: '4rem',
          margin: 'auto',
          my: '1rem',
        }}
      />
    </Link>
  );
};

export default CreatorAvatar;
