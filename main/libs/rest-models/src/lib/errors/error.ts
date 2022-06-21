export interface ErrorResponse {
  e: Error;
  status: number;
  links: {
    home: string;
  };
}
