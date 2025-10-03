export const APP_NAME = 'Slackify';

export const APP_DESCRIPTION = 'A Slack clone built with Next.js, Tailwind CSS, and Shadcn UI';

export const ROUTES = {
  AUTH: '/auth',
  HOME: '/',
  WORKSPACE: (id: string) => `/workspace/${id}`,
} as const;

export const QUERY_KEYS = {
  WORKSPACES: 'workspaces',
  CURRENT_USER: 'current-user',
} as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;
