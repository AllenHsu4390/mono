export interface SessionResponse {
  isLoggedIn: boolean;
  links: {
    login?: {
      rel: 'login';
      url: string;
    };
    logout?: {
      rel: 'logout';
      url: string;
    };
    signup?: {
      rel: 'signup';
      url: string;
    };
    session?: {
      rel: 'session';
      url: string;
    };
  };
}
