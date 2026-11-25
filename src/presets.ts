export type ShapeId = "card" | "square" | "circle";
export type EasingId = "expo" | "quad" | "inOut" | "vaul" | "linear";
export type PresetId = "cover" | "gentle" | "quick";

export type Config = {
  text: string;
  shape: ShapeId;
  color: string;
  easing: EasingId;
  perspective: number;
  zStart: number;
  zEnd: number;
  tilt: number;
  textZIndex: number;
  shapeZIndex: number;
  welcomeDuration: number;
  shapeDelay: number;
  shapeDuration: number;
  holdDuration: number;
  retreatDuration: number;
};

export type Preset = {
  id: PresetId;
  name: string;
  config: Config;
};

export const easings = [
  {
    id: "expo",
    label: "Ease-out expo",
    value: "cubic-bezier(0.19, 1, 0.22, 1)",
  },
  {
    id: "quad",
    label: "Ease-out quad",
    value: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  {
    id: "inOut",
    label: "Ease-in-out",
    value: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
  {
    id: "vaul",
    label: "Vaul",
    value: "cubic-bezier(0.32, 0.72, 0, 1)",
  },
  {
    id: "linear",
    label: "Linear",
    value: "linear",
  },
] as const;

export const shapes = [
  { id: "card", label: "Card", radius: "40px" },
  { id: "square", label: "Square", radius: "0px" },
  { id: "circle", label: "Circle", radius: "50%" },
] as const;

export const swatches = ["#1e3a4c", "#3e5c76", "#3f6f64", "#4a5168", "#4a453c"];

const PERSPECTIVE_MIN = 360;
const PERSPECTIVE_MAX = 1600;
const Z_START_MIN = -3600;
const Z_END_MIN = -800;

export const perspectiveBounds = {
  min: PERSPECTIVE_MIN,
  max: PERSPECTIVE_MAX,
};

export const durationBounds = {
  min: 400,
  max: 2800,
};

export const holdBounds = {
  min: 0,
  max: 2800,
};

export const welcomeBounds = {
  min: 0,
  max: 4000,
};

export function zStartBounds(perspective: number) {
  return { min: Z_START_MIN, max: perspective - 40 };
}

export function zEndBounds(perspective: number) {
  return { min: Z_END_MIN, max: perspective - 40 };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function easingById(id: EasingId) {
  return easings.find((easing) => easing.id === id) ?? easings[0];
}

export function shapeById(id: ShapeId) {
  return shapes.find((shape) => shape.id === id) ?? shapes[0];
}

export function normalize(config: Config): Config {
  const perspective = clamp(
    Math.round(config.perspective),
    PERSPECTIVE_MIN,
    PERSPECTIVE_MAX,
  );
  const startBounds = zStartBounds(perspective);
  const endBounds = zEndBounds(perspective);

  return {
    ...config,
    text: config.text.slice(0, 48),
    perspective,
    zStart: clamp(Math.round(config.zStart), startBounds.min, startBounds.max),
    zEnd: clamp(Math.round(config.zEnd), endBounds.min, endBounds.max),
    textZIndex: clamp(Math.round(config.textZIndex), 0, 5),
    shapeZIndex: clamp(Math.round(config.shapeZIndex), 0, 5),
  };
}

export const presets: readonly Preset[] = [
  {
    id: "cover",
    name: "Balanced",
    config: {
      text: "Welcome",
      shape: "card",
      color: "#1e3a4c",
      easing: "expo",
      perspective: 880,
      zStart: 0,
      zEnd: 160,
      tilt: 22,
      textZIndex: 1,
      shapeZIndex: 2,
      welcomeDuration: 780,
      shapeDelay: 960,
      shapeDuration: 1400,
      holdDuration: 480,
      retreatDuration: 1100,
    },
  },
  {
    id: "gentle",
    name: "Gentle",
    config: {
      text: "Welcome",
      shape: "card",
      color: "#1e3a4c",
      easing: "quad",
      perspective: 880,
      zStart: 0,
      zEnd: 160,
      tilt: 12,
      textZIndex: 1,
      shapeZIndex: 2,
      welcomeDuration: 1040,
      shapeDelay: 1280,
      shapeDuration: 1900,
      holdDuration: 640,
      retreatDuration: 1500,
    },
  },
  {
    id: "quick",
    name: "Quick",
    config: {
      text: "Welcome",
      shape: "card",
      color: "#1e3a4c",
      easing: "expo",
      perspective: 880,
      zStart: 0,
      zEnd: 160,
      tilt: 22,
      textZIndex: 1,
      shapeZIndex: 2,
      welcomeDuration: 480,
      shapeDelay: 600,
      shapeDuration: 780,
      holdDuration: 280,
      retreatDuration: 620,
    },
  },
];

export function presetById(id: PresetId) {
  return presets.find((preset) => preset.id === id) ?? presets[0];
}
