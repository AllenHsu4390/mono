export interface SessionResponse {
  isLoggedIn: boolean;
  links: {
    session: string;
  };
}
