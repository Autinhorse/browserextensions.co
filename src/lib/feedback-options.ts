export const feedbackTypes = ['bug', 'feature'] as const;
export type FeedbackType = (typeof feedbackTypes)[number];

export const feedbackApps = [
  {value: 'aichatsnapper', label: 'AI Chat Snapper'},
  {value: 'websnapper', label: 'Web Snapper'},
  {value: 'reviewsnapper', label: 'Review Snapper'},
] as const;
export type FeedbackApp = (typeof feedbackApps)[number]['value'];

export const feedbackPlatforms = [
  'chatgpt',
  'gemini',
  'claude',
  'grok',
  'mistral',
  'doubao',
  'qianwen',
  'kimi',
  'perplexity',
  'deepseek',
] as const;
export type FeedbackPlatform = (typeof feedbackPlatforms)[number];

export const platformLabels: Record<FeedbackPlatform, string> = {
  chatgpt: 'ChatGPT',
  gemini: 'Gemini',
  claude: 'Claude',
  grok: 'Grok',
  mistral: 'Mistral',
  doubao: '豆包',
  qianwen: '千问',
  kimi: 'Kimi',
  perplexity: 'Perplexity',
  deepseek: 'DeepSeek',
};

const appAliases: Record<string, FeedbackApp> = {
  aichatsnapper: 'aichatsnapper',
  'ai-chat-snapper': 'aichatsnapper',
  websnapper: 'websnapper',
  'web-snapper': 'websnapper',
  reviewsnapper: 'reviewsnapper',
  'review-snapper': 'reviewsnapper',
};

const platformAliases: Record<string, FeedbackPlatform> = {
  chatgpt: 'chatgpt',
  chatGPT: 'chatgpt',
  gemini: 'gemini',
  claude: 'claude',
  grok: 'grok',
  mistral: 'mistral',
  '豆包': 'doubao',
  doubao: 'doubao',
  '千问': 'qianwen',
  qianwen: 'qianwen',
  kimi: 'kimi',
  perplexity: 'perplexity',
  deepseek: 'deepseek',
};

export function normalizeFeedbackType(value: unknown): FeedbackType {
  return value === 'feature' ? 'feature' : 'bug';
}

export function normalizeFeedbackApp(value: unknown): FeedbackApp {
  if (typeof value !== 'string') return 'aichatsnapper';
  return appAliases[value.trim().toLowerCase()] ?? 'aichatsnapper';
}

export function normalizeFeedbackPlatform(value: unknown): FeedbackPlatform | '' {
  if (typeof value !== 'string' || !value.trim()) return '';
  return platformAliases[value.trim()] ?? platformAliases[value.trim().toLowerCase()] ?? '';
}

export function singleSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
