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
  links: {
    rel: 'like' | 'like-count';
    url: string;
  }[];
}

export interface AssetsResponse {
  links: {
    rel: 'next' | 'asset';
    url: string;
  }[];
}
export interface FollowsResponse {
  links: {
    rel: 'next' | 'follow';
    url: string;
  }[];
}