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
    editAccount: string;
    balance: string;
    gallery: string;
    me: string;
    creator: string;
    logoutPage: string;
    dailyTopUp?: string;
  };
};
