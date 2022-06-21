export interface User {
  id: string;
  avatarUrl: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
  creatorId: string;
  hasDailyTopUp: boolean;
}

export type UserResponse = User & {
  links: {
    editAccount: {
      rel: 'edit-account';
      url: string;
    };
    balance: {
      rel: 'balance';
      url: string;
    };
    gallery: {
      rel: 'gallery';
      url: string;
    };
    me: {
      rel: 'me';
      url: string;
    };
    creator: {
      rel: 'creator';
      url: string;
    };
    logoutPage: {
      rel: 'logout-page';
      url: string;
    };
    dailyTopUp?: {
      rel: 'daily-top-up';
      url: string;
    };
  };
};
