import { useState } from "react";
import { Controls } from "./Controls.tsx";
import { normalize, presetById, presets, type Config, type PresetId } from "./presets.ts";
import { Stage } from "./Stage.tsx";

export default function App() {
  const [config, setConfig] = useState<Config>(presets[0].config);
  const [presetId, setPresetId] = useState<PresetId | null>("cover");
  const [played, setPlayed] = useState<Config>(presets[0].config);
  const [runId, setRunId] = useState(1);
  const [showCode, setShowCode] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  function play() {
    setShowGuide(false);
    setPlayed(config);
    setRunId((current) => current + 1);
  }

  function edit(patch: Partial<Config>) {
    setPresetId(null);
    setConfig((current) => normalize({ ...current, ...patch }));
  }

  function applyPreset(id: PresetId) {
    setPresetId(id);
    setConfig(normalize(presetById(id).config));
  }

  return (
    <main className="app">
      <Stage
        config={played}
        playing
        runId={runId}
        guide={showGuide}
        onPlay={play}
      />
      <aside className="side">
        <header className="masthead">
          <h1>Perspective Playground</h1>
          <p className="credit">
            Made by{" "}
            <a href="https://jsonb.dev/" target="_blank" rel="noopener noreferrer">
              jsonb
            </a>
          </p>
        </header>
        <Controls
          config={config}
          presetId={presetId}
          showCode={showCode}
          onChange={edit}
          onPreset={applyPreset}
          onToggleCode={() => setShowCode((open) => !open)}
        />
      </aside>
    </main>
  );
}
