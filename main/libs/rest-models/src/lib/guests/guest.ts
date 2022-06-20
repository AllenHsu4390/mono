export interface GuestResponse {
  links: {
    loginPage: {
      rel: 'login-page';
      url: string;
    };
    login: {
      rel: 'login';
      url: string;
    };
    signup: {
      rel: 'signup';
      url: string;
    };
  };
}
