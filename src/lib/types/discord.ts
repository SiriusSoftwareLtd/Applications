export interface OAuthResponse {
  name: string;
  value: string;
}

export interface DiscordAccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_at?: number;
}

export interface DiscordConnection {
  type: string;
  id: string;
  name: string;
  visibility: number;
  friend_sync: boolean;
  show_activity: boolean;
  verified: boolean;
  two_way_link: boolean;
  metadata_visibility: number;
}
