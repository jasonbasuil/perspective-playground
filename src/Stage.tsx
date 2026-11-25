import { useLayoutEffect, useRef } from "react";
import { CedarLogo } from "./CedarLogo.tsx";
import { Dashboard } from "./Dashboard.tsx";
import { sceneVars } from "./geometry.ts";
import type { Config } from "./presets.ts";

type StageProps = {
  config: Config;
  playing: boolean;
  runId: number;
  onPlay: () => void;
};

export function Stage({ config, playing, runId, onPlay }: StageProps) {
  const motion = playing ? "is-playing" : "";
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const welcome = scene?.querySelector(".welcome");
    const target = scene?.querySelector(".app-button");
    if (!scene || !welcome || !target) return;

    const point = (box: DOMRect, sceneBox: DOMRect) => {
      const x = ((box.left + box.width / 2 - sceneBox.left) / sceneBox.width) * 100;
      const y = ((box.top + box.height / 2 - sceneBox.top) / sceneBox.height) * 100;
      return { x, y };
    };

    const place = () => {
      const sceneBox = scene.getBoundingClientRect();
      if (sceneBox.width === 0 || sceneBox.height === 0) return;
      const enter = point(welcome.getBoundingClientRect(), sceneBox);
      const exit = point(target.getBoundingClientRect(), sceneBox);
      scene.style.setProperty("--enter-x", `${enter.x}%`);
      scene.style.setProperty("--enter-y", `${enter.y}%`);
      scene.style.setProperty("--exit-x", `${exit.x}%`);
      scene.style.setProperty("--exit-y", `${exit.y}%`);
    };

    place();
    const observer = new ResizeObserver(place);
    observer.observe(scene);
    observer.observe(welcome);
    observer.observe(target);
    return () => observer.disconnect();
  }, [runId]);

  return (
    <div className="stage-frame">
      <div className="stage" style={sceneVars(config)}>
        <div className={`scene ${motion}`.trim()} ref={sceneRef} key={runId}>
          <Dashboard key={`dash-${runId}`} playing={playing} />
          <div
            key={`welcome-${runId}`}
            className={`welcome ${motion}`.trim()}
          >
            <CedarLogo />
            <span className="welcome-text">{config.text}</span>
          </div>
          <div
            key={`shape-${runId}`}
            className={`shape ${motion}`.trim()}
            data-shape={config.shape}
          />
        </div>
        <button type="button" className="play" onClick={onPlay}>
          {playing ? "Replay" : "Play"}
        </button>
      </div>
    </div>
  );
}
