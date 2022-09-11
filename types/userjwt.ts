export interface Name {
  familyName: string;
  givenName: string;
}

export interface Email {
  value: string;
  verified: boolean;
}

export interface Photo {
  value: string;
}

export interface Json {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}

export interface Profile {
  id: string;
  displayName: string;
  name: Name;
  emails: Email[];
  photos: Photo[];
  provider: string;
  _raw: string;
  _json: Json;
}

export interface User {
  _id: string;
  user_id: string;
  access_token: string;
  refresh_token: string;
  profile: Profile;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Session {
  sub: string;
  user: User;
  iat: number;
  exp: number;
}
