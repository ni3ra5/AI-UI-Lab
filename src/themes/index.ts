import type { Theme } from '@/types/theme';
import { emberTheme } from './ember';
import { defaultTheme } from './default';
import { cyberTheme } from './cyber';
import { crextioTheme } from './crextio';
import { blueprintTheme } from './blueprint';
import { terminal84Theme } from './terminal84';

export const themes: Theme[] = [
  emberTheme,
  defaultTheme,
  cyberTheme,
  crextioTheme,
  blueprintTheme,
  terminal84Theme,
];
