export interface SessionResponse {
  isUsualClient: boolean;
  links: {
    login: {
      rel: 'login';
      url: string;
    };
    logout: {
      rel: 'logout';
      url: string;
    };
  };
}
