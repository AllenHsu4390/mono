export interface User {
  id: string;
  avatarUrl: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export type UserResponse = User & {
  links: {
    newGallery: {
      rel: 'new-gallery';
      url: string;
    };
    editAccount: {
      rel: 'edit-account';
      url: string;
    };
    balance: {
      rel: 'balance';
      url: string;
    };
    me: {
      rel: 'me';
      url: string;
    };
    dailyTopUp?: {
      rel: 'daily-top-up';
      url: string;
    };
  };
};
