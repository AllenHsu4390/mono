export interface SessionResponse {
  isUsualClient: boolean;
  isLoggedIn: boolean;
  links: {
    login: {
      rel: 'login';
      url: string;
    };
    logout: {
      rel: 'logout';
      url: string;
    };
    session: {
      rel: 'session';
      url: string;
    };
  };
}
