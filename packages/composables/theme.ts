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

/**
 * Border radius overrides for Baklava design tokens.
 * Maps to --bl-border-radius-* CSS variables.
 */
export interface BaklavaThemeBorderRadius {
  xs?: string;
  s?: string;
  m?: string;
  l?: string;
  pill?: string;
  circle?: string;
}

/**
 * Size and spacing overrides for Baklava design tokens.
 * Maps to --bl-size-* CSS variables.
 */
export interface BaklavaThemeSize {
  "4xs"?: string;
  "3xs"?: string;
  "2xs"?: string;
  xs?: string;
  s?: string;
  m?: string;
  l?: string;
  xl?: string;
  "2xl"?: string;
  "3xl"?: string;
  "4xl"?: string;
  "5xl"?: string;
  "6xl"?: string;
}

/**
 * Typography overrides for Baklava design tokens.
 * Maps to --bl-font-* CSS variables.
 */
export interface BaklavaThemeTypography {
  fontFamily?: string;
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, number>;
}

/**
 * Z-index overrides for Baklava design tokens.
 * Maps to --bl-index-* CSS variables.
 */
export interface BaklavaThemeZIndex {
  deep?: number;
  base?: number;
  popover?: number;
  tooltip?: number;
  sticky?: number;
  overlay?: number;
  dialog?: number;
  notification?: number;
}

export interface ApplyThemeOptions {
  /** Built-in preset name ('vue', 'default') or your own preset object */
  preset?: BaklavaThemePreset | BaklavaThemePresetRecord;
  colors?: Partial<BaklavaThemeColors>;
  borderRadius?: Partial<BaklavaThemeBorderRadius>;
  size?: Partial<BaklavaThemeSize>;
  typography?: Partial<BaklavaThemeTypography>;
  zIndex?: Partial<BaklavaThemeZIndex>;
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

const BORDER_RADIUS_MAP: Record<keyof BaklavaThemeBorderRadius, string> = {
  xs: "--bl-border-radius-xs",
  s: "--bl-border-radius-s",
  m: "--bl-border-radius-m",
  l: "--bl-border-radius-l",
  pill: "--bl-border-radius-pill",
  circle: "--bl-border-radius-circle",
};

const SIZE_MAP: Record<keyof BaklavaThemeSize, string> = {
  "4xs": "--bl-size-4xs",
  "3xs": "--bl-size-3xs",
  "2xs": "--bl-size-2xs",
  xs: "--bl-size-xs",
  s: "--bl-size-s",
  m: "--bl-size-m",
  l: "--bl-size-l",
  xl: "--bl-size-xl",
  "2xl": "--bl-size-2xl",
  "3xl": "--bl-size-3xl",
  "4xl": "--bl-size-4xl",
  "5xl": "--bl-size-5xl",
  "6xl": "--bl-size-6xl",
};

const Z_INDEX_MAP: Record<keyof BaklavaThemeZIndex, string> = {
  deep: "--bl-index-deep",
  base: "--bl-index-base",
  popover: "--bl-index-popover",
  tooltip: "--bl-index-tooltip",
  sticky: "--bl-index-sticky",
  overlay: "--bl-index-overlay",
  dialog: "--bl-index-dialog",
  notification: "--bl-index-notification",
};

function buildCssVariables(options: ApplyThemeOptions = {}): string {
  const vars: Record<string, string> = {};
  const { preset, colors, borderRadius, size, typography, zIndex } = options;

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

  if (borderRadius) {
    for (const [key, value] of Object.entries(borderRadius)) {
      if (value && key in BORDER_RADIUS_MAP) {
        vars[BORDER_RADIUS_MAP[key as keyof BaklavaThemeBorderRadius]] = value;
      }
    }
  }

  if (size) {
    for (const [key, value] of Object.entries(size)) {
      if (value && key in SIZE_MAP) {
        vars[SIZE_MAP[key as keyof BaklavaThemeSize]] = value;
      }
    }
  }

  if (typography) {
    if (typography.fontFamily) vars["--bl-font-family"] = typography.fontFamily;
    if (typography.fontSize) {
      for (const [key, value] of Object.entries(typography.fontSize)) {
        if (value) vars[`--bl-font-size-${key}`] = value;
      }
    }
    if (typography.fontWeight) {
      for (const [key, value] of Object.entries(typography.fontWeight)) {
        if (value != null) vars[`--bl-font-weight-${key}`] = String(value);
      }
    }
  }

  if (zIndex) {
    for (const [key, value] of Object.entries(zIndex)) {
      if (value != null && key in Z_INDEX_MAP) {
        vars[Z_INDEX_MAP[key as keyof BaklavaThemeZIndex]] = String(value);
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

    const css = buildCssVariables(options);

    if (!css) return;

    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = css;
    // Move to end of head so we override any lazy-loaded styles (e.g. from VitePress route chunks)
    document.head.appendChild(styleEl);
  };

  return {
    applyTheme,
  };
};
