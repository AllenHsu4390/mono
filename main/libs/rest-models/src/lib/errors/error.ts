export interface ErrorResponse {
  message: string;
  status: number;
  links: {
    home: string;
  };
}
