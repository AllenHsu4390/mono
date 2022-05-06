export interface ErrorResponse {
  e: Error;
  status: number;
  links: {
    home: {
      rel: 'home';
      url: string;
    };
  };
}
