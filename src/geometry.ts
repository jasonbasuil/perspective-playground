import type { CSSProperties } from "react";
import {
  easingById,
  shapeById,
  type Config,
  type ShapeId,
} from "./presets.ts";

/** Flat size of the plane. Negative end depth means it must start oversized to still fill the frame while staying behind the type. */
export function planeSize(shape: ShapeId, zEnd: number): string {
  const behind = zEnd < 0;
  if (shape === "circle") return behind ? "250cqmin" : "180cqmin";
  return behind ? "160%" : "108%";
}

/** Apparent enlargement from perspective: perspective / (perspective - translateZ). */
export function projection(perspective: number, z: number): number {
  const denom = perspective - z;
  if (denom <= 8) return Number.POSITIVE_INFINITY;
  return perspective / denom;
}

export function formatProjection(value: number): string {
  if (!Number.isFinite(value)) return "past the camera";
  return `${value.toFixed(2)}×`;
}

const APPEAR_MS = 16;
const SHAPE_OUT_MS = 1;

export function sequence(config: Config) {
  const approachDelay = config.shapeDelay + APPEAR_MS;
  const coverDone = approachDelay + config.shapeDuration;
  const retreatDelay = coverDone + config.holdDuration;
  const shapeOutDelay = retreatDelay + config.retreatDuration;

  return {
    appear: APPEAR_MS,
    approachDelay,
    coverDone,
    retreatDelay,
    shapeOut: SHAPE_OUT_MS,
    shapeOutDelay,
  };
}

export function sceneVars(config: Config): CSSProperties {
  const shape = shapeById(config.shape);
  const timing = sequence(config);

  return {
    "--perspective": `${config.perspective}px`,
    "--z-start": `${config.zStart}px`,
    "--z-end": `${config.zEnd}px`,
    "--tilt": `${config.tilt}deg`,
    "--ease": easingById(config.easing).value,
    "--welcome-duration": `${config.welcomeDuration}ms`,
    "--shape-delay": `${config.shapeDelay}ms`,
    "--appear-duration": `${timing.appear}ms`,
    "--approach-delay": `${timing.approachDelay}ms`,
    "--shape-duration": `${config.shapeDuration}ms`,
    "--hold-duration": `${config.holdDuration}ms`,
    "--retreat-duration": `${config.retreatDuration}ms`,
    "--retreat-delay": `${timing.retreatDelay}ms`,
    "--welcome-out-delay": `${timing.coverDone}ms`,
    "--dash-delay": `${timing.coverDone}ms`,
    "--shape-out-duration": `${timing.shapeOut}ms`,
    "--shape-out-delay": `${timing.shapeOutDelay}ms`,
    "--text-z": String(config.textZIndex),
    "--shape-z": String(config.shapeZIndex),
    "--shape-size": planeSize(config.shape, config.zEnd),
    "--radius": shape.radius,
    "--shape-color": config.color,
  } as CSSProperties;
}
