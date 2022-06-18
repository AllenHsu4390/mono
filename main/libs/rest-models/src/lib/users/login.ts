export interface LoginResponse {
  links: {
    auth: {
      rel: 'auth';
      url: string;
    };
    magic: {
      rel: 'magic';
      url: string;
    };
  };
}
