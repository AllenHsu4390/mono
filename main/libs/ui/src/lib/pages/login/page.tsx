import LoginForm from '../../block/login-form';
import Page from '../_base/page';

interface Props {
  loginUrl: string;
}

export default function LoginPage({ loginUrl }: Props) {
  return (
    <Page hasFooter={false}>
      <LoginForm loginUrl={loginUrl} />
    </Page>
  );
}
