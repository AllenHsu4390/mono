import { LoginResponse, SessionResponse } from '@main/rest-models';
import { useQuery } from 'react-query';

interface Props {
  loginAttempt: LoginResponse;
  refetchInterval: number;
}

export const useSession = ({
  refetchInterval,
  loginAttempt,
}: Partial<Props> = {}) => {
  const { data } = useQuery<SessionResponse>(
    ['session'],
    async () => {
      const url = loginAttempt?.links.auth.url || '/api/sessions';
      const res = await fetch(url);
      return res.json();
    },
    {
      refetchInterval,
    }
  );

  return {
    session: data,
  };
};
