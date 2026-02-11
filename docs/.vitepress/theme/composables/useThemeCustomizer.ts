import type { ApplyThemeOptions } from "@baklavue/composables";
import { useBaklavaTheme } from "@baklavue/composables";
import { useData } from "vitepress";
import { onMounted, ref, watch } from "vue";

const STORAGE_KEY = "baklavue-theme-customizer";

export interface ThemeCustomizerState {
  primary: string;
  neutral: string;
  radius: string;
  font: string;
  colorMode: "system" | "light" | "dark";
  customPrimaryColor: string;
  customFontFamily: string;
}

export interface PrimaryPreset {
  id: string;
  label: string;
  primary: string;
  primaryHighlight: string;
  primaryContrast: string;
  success: string;
  successHighlight: string;
  successContrast: string;
}

export interface NeutralPreset {
  id: string;
  label: string;
  neutralDarker: string;
  neutralDarkest: string;
}

export interface FontPreset {
  id: string;
  label: string;
  fontFamily: string;
}

// Primary color presets (primary, highlight, contrast + success + neutral)
export const PRIMARY_PRESETS: PrimaryPreset[] = [
  {
    id: "green",
    label: "Green",
    primary: "#41b883",
    primaryHighlight: "#3aa876",
    primaryContrast: "#e7f9ef",
    success: "#41b883",
    successHighlight: "#3aa876",
    successContrast: "#e7f9ef",
  },
  {
    id: "orange",
    label: "Orange",
    primary: "#f27a1a",
    primaryHighlight: "#ef6114",
    primaryContrast: "#fef2e8",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "red",
    label: "Red",
    primary: "#ef4444",
    primaryHighlight: "#dc2626",
    primaryContrast: "#fef2f2",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "blue",
    label: "Blue",
    primary: "#3b82f6",
    primaryHighlight: "#2563eb",
    primaryContrast: "#eff6ff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "indigo",
    label: "Indigo",
    primary: "#6366f1",
    primaryHighlight: "#4f46e5",
    primaryContrast: "#eef2ff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "violet",
    label: "Violet",
    primary: "#8b5cf6",
    primaryHighlight: "#7c3aed",
    primaryContrast: "#f5f3ff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "purple",
    label: "Purple",
    primary: "#a855f7",
    primaryHighlight: "#9333ea",
    primaryContrast: "#faf5ff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "pink",
    label: "Pink",
    primary: "#ec4899",
    primaryHighlight: "#db2777",
    primaryContrast: "#fdf2f8",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "rose",
    label: "Rose",
    primary: "#f43f5e",
    primaryHighlight: "#e11d48",
    primaryContrast: "#fff1f2",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "amber",
    label: "Amber",
    primary: "#f59e0b",
    primaryHighlight: "#d97706",
    primaryContrast: "#fffbeb",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "yellow",
    label: "Yellow",
    primary: "#eab308",
    primaryHighlight: "#ca8a04",
    primaryContrast: "#fefce8",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "lime",
    label: "Lime",
    primary: "#84cc16",
    primaryHighlight: "#65a30d",
    primaryContrast: "#f7fee7",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "emerald",
    label: "Emerald",
    primary: "#10b981",
    primaryHighlight: "#059669",
    primaryContrast: "#ecfdf5",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "teal",
    label: "Teal",
    primary: "#14b8a6",
    primaryHighlight: "#0d9488",
    primaryContrast: "#f0fdfa",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "cyan",
    label: "Cyan",
    primary: "#06b6d4",
    primaryHighlight: "#0891b2",
    primaryContrast: "#ecfeff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "sky",
    label: "Sky",
    primary: "#0ea5e9",
    primaryHighlight: "#0284c7",
    primaryContrast: "#f0f9ff",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
  {
    id: "black",
    label: "Black",
    primary: "#0f172a",
    primaryHighlight: "#020617",
    primaryContrast: "#f8fafc",
    success: "#0bc15c",
    successHighlight: "#0aa854",
    successContrast: "#e7f9ef",
  },
];

// Neutral presets (Slate, Gray, Zinc, Neutral, Stone)
export const NEUTRAL_PRESETS: NeutralPreset[] = [
  {
    id: "slate",
    label: "Slate",
    neutralDarker: "#475569",
    neutralDarkest: "#334155",
  },
  {
    id: "gray",
    label: "Gray",
    neutralDarker: "#6b7280",
    neutralDarkest: "#4b5563",
  },
  {
    id: "zinc",
    label: "Zinc",
    neutralDarker: "#71717a",
    neutralDarkest: "#52525b",
  },
  {
    id: "neutral",
    label: "Neutral",
    neutralDarker: "#737373",
    neutralDarkest: "#525252",
  },
  {
    id: "stone",
    label: "Stone",
    neutralDarker: "#78716c",
    neutralDarkest: "#57534e",
  },
];

// Radius presets (rem values)
export const RADIUS_PRESETS = [
  { id: "0", label: "0", value: "0" },
  { id: "0.125", label: "0.125", value: "0.125rem" },
  { id: "0.25", label: "0.25", value: "0.25rem" },
  { id: "0.375", label: "0.375", value: "0.375rem" },
  { id: "0.5", label: "0.5", value: "0.5rem" },
];

// Font presets
export const FONT_PRESETS: FontPreset[] = [
  {
    id: "public-sans",
    label: "Public Sans",
    fontFamily: "'Public Sans', sans-serif",
  },
  { id: "inter", label: "Inter", fontFamily: "'Inter', sans-serif" },
  { id: "rubik", label: "Rubik", fontFamily: '"Rubik Variable", sans-serif' },
  { id: "system", label: "System", fontFamily: "system-ui, sans-serif" },
];

const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

function isValidHex(hex: string): boolean {
  return HEX_REGEX.test(hex);
}

function parseHex(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    return [
      parseInt(clean[0]!, 16) * 17,
      parseInt(clean[1]!, 16) * 17,
      parseInt(clean[2]!, 16) * 17,
    ];
  }
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function darkenHex(hex: string, amount: number): string {
  const [r, g, b] = parseHex(hex);
  return `#${[r, g, b]
    .map((x) => Math.max(0, Math.min(255, x - amount)))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
}

function lightenHex(hex: string, whitePercent: number): string {
  const [r, g, b] = parseHex(hex);
  return `#${[r, g, b]
    .map((x) => Math.round(x + (255 - x) * (whitePercent / 100)))
    .map((x) => Math.min(255, x).toString(16).padStart(2, "0"))
    .join("")}`;
}

function buildThemeOptions(
  primaryId: string,
  neutralId: string,
  radiusId: string,
  fontId: string,
  customPrimaryColor: string,
  customFontFamily: string,
): ApplyThemeOptions {
  const neutralPreset =
    NEUTRAL_PRESETS.find((n) => n.id === neutralId) ?? NEUTRAL_PRESETS[0];
  const radiusPreset =
    RADIUS_PRESETS.find((r) => r.id === radiusId) ?? RADIUS_PRESETS[2];
  const fontPreset =
    FONT_PRESETS.find((f) => f.id === fontId) ?? FONT_PRESETS[2];

  const radiusValue = radiusPreset.value;

  const useCustomPrimary = customPrimaryColor && isValidHex(customPrimaryColor);
  const primaryPreset =
    PRIMARY_PRESETS.find((p) => p.id === primaryId) ?? PRIMARY_PRESETS[0];
  const primaryColors = useCustomPrimary
    ? {
        primary: customPrimaryColor,
        primaryHighlight: darkenHex(customPrimaryColor, 20),
        primaryContrast: lightenHex(customPrimaryColor, 92),
        success: primaryPreset.success,
        successHighlight: primaryPreset.successHighlight,
        successContrast: primaryPreset.successContrast,
      }
    : {
        primary: primaryPreset.primary,
        primaryHighlight: primaryPreset.primaryHighlight,
        primaryContrast: primaryPreset.primaryContrast,
        success: primaryPreset.success,
        successHighlight: primaryPreset.successHighlight,
        successContrast: primaryPreset.successContrast,
      };

  const fontFamily = customFontFamily.trim()
    ? customFontFamily.trim()
    : fontPreset.fontFamily;

  return {
    colors: {
      ...primaryColors,
      neutralDarker: neutralPreset.neutralDarker,
      neutralDarkest: neutralPreset.neutralDarkest,
    },
    borderRadius: {
      xs: radiusValue,
      s: radiusValue,
      m: radiusValue,
      l: radiusValue,
    },
    typography: {
      fontFamily,
    },
  };
}

export { isValidHex };

function loadState(): ThemeCustomizerState {
  try {
    const raw =
      typeof localStorage !== "undefined" && localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ThemeCustomizerState>;
      return {
        primary: parsed.primary ?? "green",
        neutral: parsed.neutral ?? "slate",
        radius: parsed.radius ?? "0.25",
        font: parsed.font ?? "rubik",
        colorMode: parsed.colorMode ?? "system",
        customPrimaryColor: parsed.customPrimaryColor ?? "",
        customFontFamily: parsed.customFontFamily ?? "",
      };
    }
  } catch {
    // ignore
  }
  return {
    primary: "green",
    neutral: "slate",
    radius: "0.25",
    font: "rubik",
    colorMode: "system",
    customPrimaryColor: "",
    customFontFamily: "",
  };
}

function saveState(state: ThemeCustomizerState) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // ignore
  }
}

let instance: ReturnType<typeof createThemeCustomizer> | null = null;

function createThemeCustomizer() {
  const { isDark } = useData();
  const { applyTheme } = useBaklavaTheme();

  const primary = ref(loadState().primary);
  const neutral = ref(loadState().neutral);
  const radius = ref(loadState().radius);
  const font = ref(loadState().font);
  const colorMode = ref<ThemeCustomizerState["colorMode"]>(
    loadState().colorMode,
  );
  const customPrimaryColor = ref(loadState().customPrimaryColor);
  const customFontFamily = ref(loadState().customFontFamily);

  function applyCurrentTheme() {
    const opts = buildThemeOptions(
      primary.value,
      neutral.value,
      radius.value,
      font.value,
      customPrimaryColor.value,
      customFontFamily.value,
    );
    applyTheme(opts);
  }

  function getState(): ThemeCustomizerState {
    return {
      primary: primary.value,
      neutral: neutral.value,
      radius: radius.value,
      font: font.value,
      colorMode: colorMode.value,
      customPrimaryColor: customPrimaryColor.value,
      customFontFamily: customFontFamily.value,
    };
  }

  function syncColorMode() {
    if (colorMode.value === "light") {
      isDark.value = false;
    } else if (colorMode.value === "dark") {
      isDark.value = true;
    } else {
      if (typeof window !== "undefined" && window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        isDark.value = mq.matches;
      }
    }
  }

  watch(
    [primary, neutral, radius, font, customPrimaryColor, customFontFamily],
    () => {
      applyCurrentTheme();
      saveState(getState());
    },
    { immediate: false },
  );

  watch(colorMode, () => {
    syncColorMode();
    saveState(getState());
  });

  onMounted(() => {
    applyCurrentTheme();
    syncColorMode();

    if (typeof window !== "undefined" && colorMode.value === "system") {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", syncColorMode);
    }
  });

  return {
    primary,
    neutral,
    radius,
    font,
    colorMode,
    customPrimaryColor,
    customFontFamily,
    applyCurrentTheme,
    syncColorMode,
  };
}

export function useThemeCustomizer() {
  if (!instance) {
    instance = createThemeCustomizer();
  }
  return instance;
}
