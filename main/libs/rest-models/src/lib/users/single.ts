export interface UserResponse {
  id: string;
  avatarUrl: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
  links: {
    newGallery: {
      rel: 'new-gallery';
      url: string;
    };
    editAccount: {
      rel: 'edit-account';
      url: string;
    };
    follows: {
      rel: 'follows';
      url: string;
    }[];
    balance: {
      rel: 'balance';
      url: string;
    };
  };
}
