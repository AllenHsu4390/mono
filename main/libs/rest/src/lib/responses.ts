export interface UserResponse {
  links: {
    rel: 'new-album' | 'logout' | 'login' | 'edit-account' | 'follows';
    url: string;
  }[];
}
export interface CreatorResponse {
  links: {
    rel: 'assets';
    url: string;
  }[];
}
export interface AssetResponse {
  links: [];
}

export interface AssetsResponse {
  links: {
    rel: 'next' | 'asset';
    url: string;
  }[];
}
