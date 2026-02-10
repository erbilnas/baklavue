/**
 * Built-in presets. Use 'vue' to apply Vue.js brand colors.
 */
export type BaklavaThemePreset = "vue" | "default";

/**
 * Custom preset: map of CSS variable names to values.
 * Use this to pass your own preset or compose with built-in presets.
 *
 * @example
 * ```ts
 * const myPreset: BaklavaThemePresetRecord = {
 *   '--bl-color-primary': '#ea4c89',
 *   '--bl-color-primary-highlight': '#d6427a',
 * };
 * applyTheme({ preset: myPreset });
 * ```
 */
export type BaklavaThemePresetRecord = Record<string, string>;

/**
 * Custom color overrides for Baklava design tokens.
 * Maps to --bl-color-* CSS variables.
 */
export interface BaklavaThemeColors {
  primary?: string;
  primaryHighlight?: string;
  primaryContrast?: string;
  success?: string;
  successHighlight?: string;
  successContrast?: string;
  danger?: string;
  dangerHighlight?: string;
  dangerContrast?: string;
  warning?: string;
  warningHighlight?: string;
  warningContrast?: string;
  info?: string;
  infoHighlight?: string;
  infoContrast?: string;
  neutralDarkest?: string;
  neutralDarker?: string;
  neutralDark?: string;
  neutralLight?: string;
  neutralLighter?: string;
  neutralLightest?: string;
  neutralFull?: string;
}

export interface ApplyThemeOptions {
  /** Built-in preset name ('vue', 'default') or your own preset object */
  preset?: BaklavaThemePreset | BaklavaThemePresetRecord;
  colors?: Partial<BaklavaThemeColors>;
}

const VUE_PRESET: Record<string, string> = {
  "--bl-color-primary": "#41b883",
  "--bl-color-primary-highlight": "#3aa876",
  "--bl-color-primary-contrast": "#e7f9ef",
  "--bl-color-success": "#41b883",
  "--bl-color-success-highlight": "#3aa876",
  "--bl-color-success-contrast": "#e7f9ef",
  "--bl-color-neutral-darker": "#34495e",
  "--bl-color-neutral-darkest": "#2c3e50",
};

function buildCssVariables(
  preset?: BaklavaThemePreset | BaklavaThemePresetRecord,
  colors?: Partial<BaklavaThemeColors>
): string {
  const vars: Record<string, string> = {};

  if (preset) {
    if (typeof preset === "string") {
      if (preset === "vue") Object.assign(vars, VUE_PRESET);
    } else {
      Object.assign(vars, preset);
    }
  }

  if (colors) {
    const colorMap: Record<keyof BaklavaThemeColors, string> = {
      primary: "--bl-color-primary",
      primaryHighlight: "--bl-color-primary-highlight",
      primaryContrast: "--bl-color-primary-contrast",
      success: "--bl-color-success",
      successHighlight: "--bl-color-success-highlight",
      successContrast: "--bl-color-success-contrast",
      danger: "--bl-color-danger",
      dangerHighlight: "--bl-color-danger-highlight",
      dangerContrast: "--bl-color-danger-contrast",
      warning: "--bl-color-warning",
      warningHighlight: "--bl-color-warning-highlight",
      warningContrast: "--bl-color-warning-contrast",
      info: "--bl-color-info",
      infoHighlight: "--bl-color-info-highlight",
      infoContrast: "--bl-color-info-contrast",
      neutralDarkest: "--bl-color-neutral-darkest",
      neutralDarker: "--bl-color-neutral-darker",
      neutralDark: "--bl-color-neutral-dark",
      neutralLight: "--bl-color-neutral-light",
      neutralLighter: "--bl-color-neutral-lighter",
      neutralLightest: "--bl-color-neutral-lightest",
      neutralFull: "--bl-color-neutral-full",
    };

    for (const [key, value] of Object.entries(colors)) {
      if (value && key in colorMap) {
        vars[colorMap[key as keyof BaklavaThemeColors]] = value;
      }
    }
  }

  const rules = Object.entries(vars)
    .map(([prop, val]) => `  ${prop}: ${val};`)
    .join("\n");

  return rules ? `:root {\n${rules}\n}` : "";
}

const STYLE_ID = "baklavue-theme-overrides";

/**
 * Composable to overwrite Baklava design system colors.
 * Use the 'vue' preset, pass your own preset object, or override specific colors.
 *
 * @example
 * ```ts
 * import { useBaklavaTheme } from '@baklavue/composables'
 *
 * // Vue preset
 * useBaklavaTheme().applyTheme({ preset: 'vue' })
 *
 * // Custom preset
 * useBaklavaTheme().applyTheme({
 *   preset: {
 *     '--bl-color-primary': '#ea4c89',
 *     '--bl-color-primary-highlight': '#d6427a',
 *   }
 * })
 *
 * // Custom colors
 * useBaklavaTheme().applyTheme({
 *   colors: { primary: '#41B883', primaryHighlight: '#3aa876' }
 * })
 * ```
 */
export const useBaklavaTheme = () => {
  const applyTheme = (options: ApplyThemeOptions = {}): void => {
    if (typeof document === "undefined") return;

    const { preset, colors } = options;
    const css = buildCssVariables(preset, colors);

    if (!css) return;

    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = css;
  };

  return {
    applyTheme,
  };
};
