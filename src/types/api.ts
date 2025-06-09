export type Base = {
  id: string;
  created_at: string;
};

export type SenderType = "assistant" | "user";

export type User = {
  email: string;
  id: string;
  role: string;
  organization: string;
  profile: Profile;
};

export type Profile = {
  first_name?: string;
  last_name?: string;
  nickname?: string;
};

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

export type Tool = {
  name: string;
  type: string;
};

export type ToolConfig = {
  tools: Tool[];
};

export type Assistant = {
  name: string;
  internal_name: string;
  description: string;
  tool_config: ToolConfig;
  testing: boolean;
  version: string;
  developer_prompt: string;
  model: string;
  id: string;
  created_at: string;
};

type MessageInput = {
  content: string;
};

type MessageOutputContent = {
  text: string;
  type: string;
};

type MessageOutput = {
  id: string;
  content: MessageOutputContent[];
  role: string;
  status: string;
  type: string;
};

export type Messages = {
  id: string;
  output?: MessageOutput;
  input?: MessageInput;
  sender: SenderType;
  created_at: string;
  user_id: string;
  organization_id: string;
  session_id: string;
  assistant_id: string;
  account_id: string;
};
