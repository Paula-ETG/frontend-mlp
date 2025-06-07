export type Login = {
  access_token: string;
  api_key: string;
  token_type: string;
};

export type Account = {
  name: string;
  id: string;
  description: string;
  created_at: string;
  organization_id: string;
  user_id: string;
};

export type Session = {
  id: string;
  title: string;
  summary: string | undefined;
  created_at: string;
  user_id: string;
  organization_id: string;
  assistant_id: string;
  account_id: string;
};
