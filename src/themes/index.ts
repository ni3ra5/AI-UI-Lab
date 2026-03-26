import type { Theme } from '@/types/theme';
import { defaultTheme } from './default';
import { emberTheme } from './ember';
import { cyberTheme } from './cyber';
import { crextioTheme } from './crextio';
import { blueprintTheme } from './blueprint';

export const themes: Theme[] = [
  defaultTheme,
  emberTheme,
  cyberTheme,
  crextioTheme,
  blueprintTheme,
];
