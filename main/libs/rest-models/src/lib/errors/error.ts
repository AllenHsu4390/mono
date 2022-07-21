
export const managedErrorMessages = {
  newUserError: '[Managed Error] - New User',
}

export interface ErrorResponse {
  message: string;
  status: number;
  links: {
    home: string;
  };
}
