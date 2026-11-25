import { useState } from "react";
import { buildSnippet } from "./codeSnippet.ts";
import { formatProjection, projection } from "./geometry.ts";
import { Tip } from "./Tip.tsx";
import {
  easings,
  durationBounds,
  holdBounds,
  perspectiveBounds,
  welcomeBounds,
  presets,
  shapes,
  swatches,
  zEndBounds,
  zStartBounds,
  type Config,
  type EasingId,
  type PresetId,
  type ShapeId,
} from "./presets.ts";

type ControlsProps = {
  config: Config;
  presetId: PresetId | null;
  showCode: boolean;
  onChange: (patch: Partial<Config>) => void;
  onPreset: (id: PresetId) => void;
  onToggleCode: () => void;
};

export function Controls({
  config,
  presetId,
  showCode,
  onChange,
  onPreset,
  onToggleCode,
}: ControlsProps) {
  const snippet = buildSnippet(config);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const copied = copiedSnippet === snippet;
  const start = zStartBounds(config.perspective);
  const end = zEndBounds(config.perspective);
  const endScale = formatProjection(projection(config.perspective, config.zEnd));

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedSnippet(snippet);
    } catch {
      setCopiedSnippet(null);
    }
  }

  return (
    <div className="controls">
      <div className="field">
        <div className="field-label">
          <LabelTip label="Presets" text={tips.presets} />
          <span>{presetId ? "Preset" : "Custom"}</span>
        </div>
        <div className="preset-grid">
          {presets.map((preset) => (
            <Tip key={preset.id} label={preset.name} text={presetTips[preset.id]}>
              {(describedBy) => (
                <button
                  type="button"
                  className="preset"
                  aria-pressed={presetId === preset.id}
                  aria-describedby={describedBy}
                  onClick={() => onPreset(preset.id)}
                >
                  {preset.name}
                </button>
              )}
            </Tip>
          ))}
        </div>
      </div>

      <label className="field">
        <span className="field-label">
          <LabelTip label="Welcome text" text={tips.welcome} />
        </span>
        <input
          className="text-input"
          value={config.text}
          maxLength={48}
          spellCheck={false}
          onChange={(event) => onChange({ text: event.target.value })}
        />
      </label>

      <div className="field">
        <span className="field-label">
          <LabelTip label="Shape" text={tips.shape} />
        </span>
        <div className="segment" role="group" aria-label="Shape">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              type="button"
              aria-pressed={config.shape === shape.id}
              onClick={() => onChange({ shape: shape.id as ShapeId })}
            >
              {shape.label}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="field-label">
          <LabelTip label="Color" text={tips.color} />
        </span>
        <div className="swatches">
          {swatches.map((color) => (
            <button
              key={color}
              type="button"
              className="swatch"
              style={{ background: color }}
              aria-label={color}
              aria-pressed={config.color.toLowerCase() === color}
              onClick={() => onChange({ color })}
            />
          ))}
        </div>
      </div>

      <label className="field">
        <span className="field-label">
          <LabelTip label="Easing" text={tips.easing} />
        </span>
        <select
          className="text-input"
          value={config.easing}
          onChange={(event) =>
            onChange({ easing: event.target.value as EasingId })
          }
        >
          {easings.map((easing) => (
            <option key={easing.id} value={easing.id}>
              {easing.label}
            </option>
          ))}
        </select>
      </label>

      <Slider
        label="Welcome visible"
        tip={tips.welcomeVisible}
        min={welcomeBounds.min}
        max={welcomeBounds.max}
        step={10}
        value={config.shapeDelay}
        display={`${(config.shapeDelay / 1000).toFixed(2)}s`}
        onChange={(shapeDelay) => onChange({ shapeDelay })}
      />
      <Slider
        label="Shape grows"
        tip={tips.comingIn}
        min={durationBounds.min}
        max={durationBounds.max}
        step={10}
        value={config.shapeDuration}
        display={`${(config.shapeDuration / 1000).toFixed(2)}s`}
        onChange={(shapeDuration) => onChange({ shapeDuration })}
      />
      <Slider
        label="Cover holds"
        tip={tips.hold}
        min={holdBounds.min}
        max={holdBounds.max}
        step={10}
        value={config.holdDuration}
        display={`${(config.holdDuration / 1000).toFixed(2)}s`}
        onChange={(holdDuration) => onChange({ holdDuration })}
      />
      <Slider
        label="Shape shrinks"
        tip={tips.comingOut}
        min={durationBounds.min}
        max={durationBounds.max}
        step={10}
        value={config.retreatDuration}
        display={`${(config.retreatDuration / 1000).toFixed(2)}s`}
        onChange={(retreatDuration) => onChange({ retreatDuration })}
      />
      <Slider
        label="Perspective"
        tip={tips.perspective}
        min={perspectiveBounds.min}
        max={perspectiveBounds.max}
        step={10}
        value={config.perspective}
        display={`${config.perspective}px`}
        onChange={(perspective) => onChange({ perspective })}
      />
      <Slider
        label="Start depth"
        tip={tips.startDepth}
        min={start.min}
        max={start.max}
        step={10}
        value={config.zStart}
        display={`${config.zStart}px`}
        onChange={(zStart) => onChange({ zStart })}
      />
      <Slider
        label="End depth"
        tip={tips.endDepth}
        min={end.min}
        max={end.max}
        step={10}
        value={config.zEnd}
        display={`${config.zEnd}px`}
        onChange={(zEnd) => onChange({ zEnd })}
      />
      <Slider
        label="Message z-index"
        tip={tips.messageZ}
        min={0}
        max={5}
        step={1}
        value={config.textZIndex}
        display={String(config.textZIndex)}
        onChange={(textZIndex) => onChange({ textZIndex })}
      />
      <Slider
        label="Shape z-index"
        tip={tips.shapeZ}
        min={0}
        max={5}
        step={1}
        value={config.shapeZIndex}
        display={String(config.shapeZIndex)}
        onChange={(shapeZIndex) => onChange({ shapeZIndex })}
      />

      <p className="readout">
        Starts from nothing in the center and grows to {endScale}. The welcome
        and the app share one plane. z-index only changes paint order.
      </p>
      <p className="hint">Applies on the next play.</p>

      <div className="code-row">
        <button
          type="button"
          className="code-toggle"
          aria-expanded={showCode}
          onClick={onToggleCode}
        >
          {showCode ? "Hide code" : "Show code"}
        </button>
        <Tip label="Show code" text={tips.code} />
      </div>

      {showCode ? (
        <div className="code-panel">
          <button type="button" className="copy" onClick={() => void copy()}>
            {copied ? "Copied" : "Copy"}
          </button>
          <pre className="code">
            <code>{snippet}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function LabelTip({ label, text }: { label: string; text: string }) {
  return (
    <span className="label-with-tip">
      <span>{label}</span>
      <Tip label={label} text={text} />
    </span>
  );
}

function Slider({
  label,
  tip,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  label: string;
  tip: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field">
      <span className="field-label">
        <LabelTip label={label} text={tip} />
        <span className="slider-value">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

const presetTips: Record<PresetId, string> = {
  cover:
    "A strong ease-out, a short full-screen beat, then a slightly quicker shrink to the button.",
  gentle:
    "The same move with a softer curve, less tilt, and more time to read. The shrink stays shorter than the grow.",
  quick:
    "The same move, tightened. The welcome, the cover, and the shrink all get out of the way sooner.",
};

const tips = {
  presets:
    "Three speeds of the same handoff. Camera distance, shape, and stacking stay on the sliders.",
  welcome:
    "The line that arrives first. It sits on the same plane as the app, and fades out once the shape has covered the screen.",
  welcomeVisible:
    "How long the welcome stays on screen before the shape starts to grow.",
  shape:
    "The silhouette of the plane: card, square, or circle. It still grows from nothing in the center.",
  color:
    "The primary color. The shape, the store mark, and the dashboard button all use it.",
  easing:
    "How the speed changes. Ease-out starts fast and settles. The same curve plays on the way back.",
  comingIn:
    "How long the shape takes to grow from the center and cover the screen.",
  hold: "How long the shape stays full-screen before it shrinks away.",
  comingOut:
    "How long the shape takes to shrink from the full cover back to nothing in the center.",
  perspective:
    "Camera distance in pixels. A lower value makes the same forward travel look more dramatic.",
  startDepth:
    "Where the point sits in depth. Zero keeps it on the welcome and the app. Farther back sinks it behind that plane.",
  endDepth:
    "How close the shape comes as it grows. Closer looks larger. It stays short of the camera so the plane does not flip.",
  messageZ:
    "Paint order of the welcome and the app, which share this plane. It does not change the shape’s size.",
  shapeZ:
    "Paint order of the plane. Higher paints in front of the shared plane when depth does not already decide.",
  code: "The CSS for the current setup. Nothing here is shown until you open it.",
};

