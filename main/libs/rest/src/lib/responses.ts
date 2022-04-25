export interface SessionResponse {
  links: {
    rel: 'login' | 'logout';
    url: string;
  }[];
}

export interface UserResponse {
  links: {
    rel: 'new-gallery' | 'logout' | 'edit-account' | 'follows' | 'balance';
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
    rel: 'like' | 'like-count' | 'creator';
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
