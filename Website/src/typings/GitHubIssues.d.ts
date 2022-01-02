interface GitHubIssuesInterface {
  url?: string;
  repository_url?: string;
  labels_url?: string;
  comments_url?: string;
  events_url?: string;
  html_url?: string;
  id?: number;
  node_id?: string;
  number?: number;
  title?: string;
  user?: User;
  labels?: Label[];
  state?: string;
  locked?: boolean;
  assignee?: null;
  assignees?: any[];
  milestone?: null;
  comments?: number;
  created_at?: Date;
  updated_at?: Date;
  closed_at?: null;
  author_association?: string;
  active_lock_reason?: null;
  body?: string | undefined;
  reactions?: Reactions;
  timeline_url?: string;
  performed_via_github_app?: null;
}

interface Label {
  id?: number;
  node_id?: string;
  url?: string;
  name?: string;
  color?: string;
  default?: boolean;
  description?: string;
}

interface Reactions {
  url?: string;
  total_count?: number;
  "+1"?: number;
  "-1"?: number;
  laugh?: number;
  hooray?: number;
  confused?: number;
  heart?: number;
  rocket?: number;
  eyes?: number;
}

interface User {
  login?: string;
  id?: number;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
}

// For comments

interface GitHubIssuesComments {
  url?: string;
  html_url?: string;
  issue_url?: string;
  id?: number;
  node_id?: string;
  user?: User;
  created_at?: Date;
  updated_at?: Date;
  author_association?: string;
  body?: string;
  reactions?: Reactions;
  performed_via_github_app?: null;
}

export { GitHubIssuesInterface, Label, Reactions, User, GitHubIssuesComments };
