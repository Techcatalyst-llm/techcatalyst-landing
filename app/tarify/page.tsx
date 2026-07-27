import type { Metadata } from 'next';

import { MarketingFooter, MarketingHeader } from '@/components/MarketingChrome';

type Rate = {
  label: string;
  sourcePrice: number;
  unit: string;
};

type Tariff = {
  provider: string;
  model: string;
  rates: Rate[];
};

type TariffGroup = {
  title: string;
  batch?: string;
  tariffs: Tariff[];
};

const discount = 0.9;
const perMillionTokens = 'за 1М токенов';

const tariffGroups: TariffGroup[] = [
  {
    title: 'Языковые модели',
    batch: 'Batch −50%',
    tariffs: [
      { provider: 'Anthropic', model: 'claude-sonnet-5', rates: [{ label: 'Ввод', sourcePrice: 800, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4500, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1000, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 80, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-fable-5', rates: [{ label: 'Ввод', sourcePrice: 2100, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 10500, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 2800, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 210, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-8', rates: [{ label: 'Ввод', sourcePrice: 1516, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7579, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1895, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-7', rates: [{ label: 'Ввод', sourcePrice: 1516, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7579, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1895, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-sonnet-4-6', rates: [{ label: 'Ввод', sourcePrice: 774, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 3866, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 967, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 78, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-6', rates: [{ label: 'Ввод', sourcePrice: 1516, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7579, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1895, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-5', rates: [{ label: 'Ввод', sourcePrice: 1516, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7579, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1895, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-haiku-4-5', rates: [{ label: 'Ввод', sourcePrice: 295, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1474, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 369, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 30, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-sonnet-4-5', rates: [{ label: 'Ввод', sourcePrice: 774, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 3866, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 967, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 78, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-1', rates: [{ label: 'Ввод', sourcePrice: 3866, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 19327, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 4832, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 387, unit: perMillionTokens }] },
      { provider: 'Anthropic', model: 'claude-opus-4-20250514', rates: [{ label: 'Ввод', sourcePrice: 3866, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 19327, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 4832, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 387, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3.1-flash-lite-image', rates: [{ label: 'Ввод', sourcePrice: 76, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 9100, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3-pro-image', rates: [{ label: 'Ввод', sourcePrice: 632, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 36843, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3.1-flash-image', rates: [{ label: 'Ввод', sourcePrice: 76, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 18200, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3.5-flash', rates: [{ label: 'Ввод', sourcePrice: 455, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2730, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 45, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3.1-flash-lite', rates: [{ label: 'Ввод', sourcePrice: 76, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 455, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 7, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3.1-pro-preview', rates: [{ label: 'Ввод', sourcePrice: 600, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 3640, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 58, unit: perMillionTokens }, { label: 'Ввод 200K+', sourcePrice: 1200, unit: perMillionTokens }, { label: 'Вывод 200K+', sourcePrice: 5460, unit: perMillionTokens }, { label: 'Кэш чтение 200K+', sourcePrice: 115, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-3-flash-preview', rates: [{ label: 'Ввод', sourcePrice: 152, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 910, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 14, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 304, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-2.5-flash-image', rates: [{ label: 'Ввод', sourcePrice: 79, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7895, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-2.5-flash-lite', rates: [{ label: 'Ввод', sourcePrice: 26, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 129, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 7, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 104, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-2.5-flash', rates: [{ label: 'Ввод', sourcePrice: 78, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 645, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 9, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 258, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-2.5-pro', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 36, unit: perMillionTokens }, { label: 'Ввод 200K+', sourcePrice: 645, unit: perMillionTokens }, { label: 'Вывод 200K+', sourcePrice: 3866, unit: perMillionTokens }, { label: 'Кэш чтение 200K+', sourcePrice: 72, unit: perMillionTokens }] },
      { provider: 'Google', model: 'gemini-2.0-flash-lite', rates: [{ label: 'Ввод', sourcePrice: 20, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 78, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.6-sol', rates: [{ label: 'Ввод', sourcePrice: 800, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4700, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 80, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 1000, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 1600, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 7050, unit: perMillionTokens }, { label: 'Кэш чтение 272K+', sourcePrice: 160, unit: perMillionTokens }, { label: 'Кэш запись 272K+', sourcePrice: 2000, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.6-terra', rates: [{ label: 'Ввод', sourcePrice: 500, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 3200, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 50, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 625, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 1000, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 4800, unit: perMillionTokens }, { label: 'Кэш чтение 272K+', sourcePrice: 100, unit: perMillionTokens }, { label: 'Кэш запись 272K+', sourcePrice: 1250, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.6-luna', rates: [{ label: 'Ввод', sourcePrice: 300, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1800, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 30, unit: perMillionTokens }, { label: 'Кэш запись', sourcePrice: 375, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 600, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 2700, unit: perMillionTokens }, { label: 'Кэш чтение 272K+', sourcePrice: 60, unit: perMillionTokens }, { label: 'Кэш запись 272K+', sourcePrice: 750, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.5', rates: [{ label: 'Ввод', sourcePrice: 1520, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 9100, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 3040, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 13650, unit: perMillionTokens }, { label: 'Кэш чтение 272K+', sourcePrice: 304, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.5-pro', rates: [{ label: 'Ввод', sourcePrice: 4740, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 28400, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 9500, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 42600, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.4-mini', rates: [{ label: 'Ввод', sourcePrice: 230, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1370, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 23, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.4-nano', rates: [{ label: 'Ввод', sourcePrice: 61, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 380, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 6, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.3-chat-latest', rates: [{ label: 'Ввод', sourcePrice: 530, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4240, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 53, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.4', rates: [{ label: 'Ввод', sourcePrice: 760, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4550, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 76, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 1520, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 6825, unit: perMillionTokens }, { label: 'Кэш чтение 272K+', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.4-pro', rates: [{ label: 'Ввод', sourcePrice: 4740, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 28400, unit: perMillionTokens }, { label: 'Ввод 272K+', sourcePrice: 9500, unit: perMillionTokens }, { label: 'Вывод 272K+', sourcePrice: 42600, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.3-codex', rates: [{ label: 'Ввод', sourcePrice: 530, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4240, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 53, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.2-codex', rates: [{ label: 'Ввод', sourcePrice: 530, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4240, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 53, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.2', rates: [{ label: 'Ввод', sourcePrice: 531, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4245, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 54, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.2-chat-latest', rates: [{ label: 'Ввод', sourcePrice: 531, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 4245, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 54, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.1-codex-max', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.1', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.1-codex', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.1-codex-mini', rates: [{ label: 'Ввод', sourcePrice: 76, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 607, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 7.58, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5.1-chat-latest', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-audio-mini', rates: [{ label: 'Ввод', sourcePrice: 39, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 155, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Аудио вывод', sourcePrice: 5154, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5-codex', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-audio', rates: [{ label: 'Ввод', sourcePrice: 645, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Аудио ввод', sourcePrice: 10211, unit: perMillionTokens }, { label: 'Аудио вывод', sourcePrice: 21053, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5-mini', rates: [{ label: 'Ввод', sourcePrice: 65, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 516, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 6.45, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5-nano', rates: [{ label: 'Ввод', sourcePrice: 13, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 104, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 1.29, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-5-chat-latest', rates: [{ label: 'Ввод', sourcePrice: 323, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 33, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o3-pro', rates: [{ label: 'Ввод', sourcePrice: 2527, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 10106, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o3', rates: [{ label: 'Ввод', sourcePrice: 607, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1685, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 152, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o4-mini', rates: [{ label: 'Ввод', sourcePrice: 284, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1134, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 71, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4.1', rates: [{ label: 'Ввод', sourcePrice: 516, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2062, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 129, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4.1-mini', rates: [{ label: 'Ввод', sourcePrice: 104, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 413, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 26, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4.1-nano', rates: [{ label: 'Ввод', sourcePrice: 26, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 104, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 6.45, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o1-pro', rates: [{ label: 'Ввод', sourcePrice: 16106, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 80527, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4o-search-preview', rates: [{ label: 'Ввод', sourcePrice: 645, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4o-mini-search-preview', rates: [{ label: 'Ввод', sourcePrice: 39, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 155, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'computer-use-preview', rates: [{ label: 'Ввод', sourcePrice: 537, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1289, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 269, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o3-mini', rates: [{ label: 'Ввод', sourcePrice: 284, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 1134, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 142, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'o1', rates: [{ label: 'Ввод', sourcePrice: 2685, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 8053, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 1343, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4o-mini', rates: [{ label: 'Ввод', sourcePrice: 39, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 155, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 20, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4o', rates: [{ label: 'Ввод', sourcePrice: 645, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Кэш чтение', sourcePrice: 323, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4-turbo', rates: [{ label: 'Ввод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7731, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-4-turbo-preview', rates: [{ label: 'Ввод', sourcePrice: 2577, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 7731, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-3.5-turbo', rates: [{ label: 'Ввод', sourcePrice: 129, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 387, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-3.5-turbo-16k', rates: [{ label: 'Ввод', sourcePrice: 269, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 537, unit: perMillionTokens }] },
    ],
  },
  {
    title: 'Генерация изображений',
    tariffs: [
      { provider: 'OpenAI', model: 'gpt-image-2', rates: [{ label: 'Ввод', sourcePrice: 1520, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 9100, unit: perMillionTokens }, { label: 'Изображение ввод', sourcePrice: 2430, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-image-1.5', rates: [{ label: 'Ввод', sourcePrice: 1520, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 9710, unit: perMillionTokens }, { label: 'Изображение ввод', sourcePrice: 2430, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-image-1-mini', rates: [{ label: 'Ввод', sourcePrice: 610, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 2430, unit: perMillionTokens }, { label: 'Изображение ввод', sourcePrice: 760, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'gpt-image-1', rates: [{ label: 'Ввод', sourcePrice: 1520, unit: perMillionTokens }, { label: 'Вывод', sourcePrice: 12130, unit: perMillionTokens }, { label: 'Изображение ввод', sourcePrice: 3040, unit: perMillionTokens }] },
    ],
  },
  {
    title: 'Генерация видео',
    tariffs: [
      { provider: 'Google', model: 'veo-3.1-lite-generate-preview', rates: [{ label: '720p', sourcePrice: 15, unit: 'за 1 секунду' }, { label: '1080p', sourcePrice: 25, unit: 'за 1 секунду' }] },
      { provider: 'Google', model: 'veo-3.1-generate-preview', rates: [{ label: '720p', sourcePrice: 120, unit: 'за 1 секунду' }, { label: '1080p', sourcePrice: 120, unit: 'за 1 секунду' }, { label: '4K', sourcePrice: 180, unit: 'за 1 секунду' }] },
      { provider: 'Google', model: 'veo-3.1-fast-generate-preview', rates: [{ label: '720p', sourcePrice: 30, unit: 'за 1 секунду' }, { label: '1080p', sourcePrice: 35, unit: 'за 1 секунду' }, { label: '4K', sourcePrice: 90, unit: 'за 1 секунду' }] },
      { provider: 'OpenAI', model: 'sora-2-pro', rates: [{ label: '720×1280 или 1280×720', sourcePrice: 69, unit: 'за 1 секунду' }, { label: '1024×1792 или 1792×1024', sourcePrice: 106, unit: 'за 1 секунду' }] },
      { provider: 'OpenAI', model: 'sora-2', rates: [{ label: 'Видео', sourcePrice: 27, unit: 'за 1 секунду' }] },
    ],
  },
  {
    title: 'Создание embedding',
    batch: 'Batch −50%',
    tariffs: [
      { provider: 'OpenAI', model: 'text-embedding-3-small', rates: [{ label: 'Ввод', sourcePrice: 5.16, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'text-embedding-3-large', rates: [{ label: 'Ввод', sourcePrice: 34, unit: perMillionTokens }] },
      { provider: 'OpenAI', model: 'text-embedding-ada-002', rates: [{ label: 'Ввод', sourcePrice: 27, unit: perMillionTokens }] },
    ],
  },
  {
    title: 'Синтез речи (TTS)',
    tariffs: [
      { provider: 'OpenAI', model: 'gpt-4o-mini-tts', rates: [{ label: 'Ввод', sourcePrice: 3093, unit: 'за 1М символов' }] },
      { provider: 'OpenAI', model: 'tts-1', rates: [{ label: 'Ввод', sourcePrice: 3866, unit: 'за 1М символов' }] },
      { provider: 'OpenAI', model: 'tts-1-hd', rates: [{ label: 'Ввод', sourcePrice: 7731, unit: 'за 1М символов' }] },
    ],
  },
  {
    title: 'Распознавание речи',
    tariffs: [
      { provider: 'OpenAI', model: 'gpt-4o-transcribe-diarize', rates: [{ label: 'Входящее аудио', sourcePrice: 1.55, unit: 'за 1 минуту' }] },
      { provider: 'OpenAI', model: 'gpt-4o-transcribe', rates: [{ label: 'Входящее аудио', sourcePrice: 1.55, unit: 'за 1 минуту' }] },
      { provider: 'OpenAI', model: 'gpt-4o-mini-transcribe', rates: [{ label: 'Входящее аудио', sourcePrice: 0.77, unit: 'за 1 минуту' }] },
      { provider: 'OpenAI', model: 'whisper-1', rates: [{ label: 'Входящее аудио', sourcePrice: 1.55, unit: 'за 1 минуту' }] },
    ],
  },
  {
    title: 'Сервисы',
    tariffs: [
      { provider: 'Anthropic', model: 'web-search', rates: [{ label: 'Поиск', sourcePrice: 1, unit: 'за 1 запрос' }] },
      { provider: 'Google', model: 'web-search', rates: [{ label: 'Поиск', sourcePrice: 1.5, unit: 'за 1 запрос' }] },
      { provider: 'OpenAI', model: 'web-search', rates: [{ label: 'Поиск', sourcePrice: 1, unit: 'за 1 запрос' }] },
      { provider: 'OpenAI', model: 'web-search-preview', rates: [{ label: 'Поиск low', sourcePrice: 2.69, unit: 'за 1 запрос' }, { label: 'Поиск medium', sourcePrice: 3.14, unit: 'за 1 запрос' }, { label: 'Поиск high', sourcePrice: 4.48, unit: 'за 1 запрос' }] },
      { provider: 'TechCatalyst', model: 'Логи', rates: [{ label: '3 дня', sourcePrice: 8, unit: 'за 1К запросов' }, { label: '7 дней', sourcePrice: 10, unit: 'за 1К запросов' }, { label: '30 дней', sourcePrice: 12, unit: 'за 1К запросов' }, { label: '365 дней', sourcePrice: 15, unit: 'за 1К запросов' }] },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Тарифы на модели ИИ | TechCatalyst',
  description: 'Тарифы TechCatalyst на LLM, генерацию изображений и видео, embeddings, речь и сервисы. Цены в рублях для корпоративного доступа к моделям ИИ.',
  alternates: { canonical: '/tarify' },
  openGraph: {
    title: 'Тарифы на модели ИИ | TechCatalyst',
    description: 'Тарифы в рублях на модели ИИ для корпоративного доступа TechCatalyst.',
    url: 'https://techcatalyst.ru/tarify',
    type: 'website',
    locale: 'ru_RU',
  },
};

function formatRubles(sourcePrice: number) {
  const value = sourcePrice * discount;

  return new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: value < 10 ? 2 : 1,
  }).format(value);
}

function Wrap({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-7 lg:px-8 ${className}`}>{children}</div>;
}

export default function TariffsPage() {
  return (
    <div className="bg-white text-[#0d1326]">
      <MarketingHeader />

      <main>
        <section className="border-b border-[#e4e8f4] bg-[#f6f8fc] py-14 lg:py-18">
          <Wrap>
            <div className="max-w-[880px]">
              <div className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] before:mr-2 before:content-['//'] text-[#2b46f0]">Тарифы</div>
              <h1 className="mt-4 text-[40px] font-bold leading-[1.08] md:text-[58px]">Тарифы на модели ИИ</h1>
              <p className="mt-5 max-w-[760px] text-[17px] leading-[1.65] text-[#565e78]">
                Цены указаны в рублях для корпоративного доступа к моделям ИИ через TechCatalyst.
              </p>
            </div>
          </Wrap>
        </section>

        <section className="py-12 lg:py-16">
          <Wrap className="grid gap-10">
            {tariffGroups.map((group) => (
              <section key={group.title} id={group.title.toLowerCase().replaceAll(' ', '-')} className="scroll-mt-24">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="text-[28px] font-semibold leading-[1.15] md:text-[36px]">{group.title}</h2>
                    {group.batch ? <p className="mt-2 text-[13px] font-medium text-[#565e78]">{group.batch}</p> : null}
                  </div>
                  <div className="text-[13px] text-[#8d93ab]">{group.tariffs.length} позиций</div>
                </div>

                <div className="overflow-x-auto border border-[#e4e8f4]">
                  <table className="w-full min-w-[820px] border-collapse text-left text-[14px]">
                    <thead className="bg-[#f6f8fc] text-[12px] uppercase tracking-[0.08em] text-[#565e78]">
                      <tr>
                        <th className="w-[170px] border-b border-[#e4e8f4] px-4 py-3 font-semibold">Провайдер</th>
                        <th className="w-[280px] border-b border-[#e4e8f4] px-4 py-3 font-semibold">Модель</th>
                        <th className="border-b border-[#e4e8f4] px-4 py-3 font-semibold">Стоимость TechCatalyst</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4e8f4]">
                      {group.tariffs.map((tariff) => (
                        <tr key={`${group.title}-${tariff.provider}-${tariff.model}`} className="align-top">
                          <td className="px-4 py-4 font-medium text-[#232a42]">{tariff.provider}</td>
                          <td className="px-4 py-4 font-mono text-[13px] text-[#0d1326]">{tariff.model}</td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-2">
                              {tariff.rates.map((rate) => (
                                <span key={`${tariff.model}-${rate.label}`} className="inline-flex items-center gap-1 border border-[#e4e8f4] bg-[#f8f9fc] px-2.5 py-1.5">
                                  <span className="text-[#565e78]">{rate.label}:</span>
                                  <span className="font-semibold text-[#0d1326]">{formatRubles(rate.sourcePrice)} ₽</span>
                                  <span className="text-[#8d93ab]">{rate.unit}</span>
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}
          </Wrap>
        </section>

        <section id="contact" className="border-t border-[#e4e8f4] bg-[#f6f8fc] py-12">
          <Wrap>
            <div className="max-w-[780px]">
              <h2 className="text-[30px] font-semibold leading-[1.15]">Нужен расчёт под объём?</h2>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#565e78]">Пришлите модели, прогноз токенов и режим использования. Посчитаем месячный бюджет и условия доступа.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="mailto:info@2rm.ru" className="inline-flex items-center justify-center rounded-[10px] bg-[#2b46f0] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#1c33d4]">Написать на почту</a>
                <a href="https://t.me/pillardev" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-[10px] border border-[#c9d2ea] bg-white px-6 py-3 text-[14px] font-semibold text-[#232a42] transition hover:border-[#2b46f0] hover:text-[#2b46f0]">Telegram</a>
              </div>
            </div>
          </Wrap>
        </section>
      </main>

      <MarketingFooter note="Тарифы на модели ИИ, поставка доступа и корпоративная интеграция." />
    </div>
  );
}
