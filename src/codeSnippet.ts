import { planeSize, sequence } from "./geometry.ts";
import { easingById, shapeById, type Config } from "./presets.ts";

/** Keep the keyframe structure aligned with src/styles.css. */
export function buildSnippet(config: Config): string {
  const ease = easingById(config.easing).value;
  const size = planeSize(config.shape, config.zEnd);
  const radius = shapeById(config.shape).radius;
  const timing = sequence(config);

  return `/* .is-playing starts this sequence.
   The welcome and the dashboard share translateZ(0) and the same z-index.
   Depth behind that plane is hidden by it, and depth in front only
   makes a shape larger. scale(0) at the center is the point of nothing.
   The shape scales up from that point as it comes forward, then
   scales back to nothing at the center. The app is already behind it. */

.scene {
  perspective: ${config.perspective}px;
  transform-style: preserve-3d;
}

.welcome {
  z-index: ${config.textZIndex};
  opacity: 0;
}

.welcome.is-playing {
  animation:
    welcome-in ${config.welcomeDuration}ms ${ease} both,
    welcome-out 180ms ease ${timing.coverDone}ms forwards;
}

.shape {
  z-index: ${config.shapeZIndex};
  width: ${size};
  height: ${size};
  background: ${config.color};
  border-radius: ${radius};
  opacity: 0;
}

.shape.is-playing {
  animation:
    shape-in ${timing.appear}ms ${ease} ${config.shapeDelay}ms both,
    approach ${config.shapeDuration}ms ${ease} ${timing.approachDelay}ms both,
    retreat ${config.retreatDuration}ms ${ease} ${timing.retreatDelay}ms forwards,
    shape-out ${timing.shapeOut}ms ease ${timing.shapeOutDelay}ms forwards;
}

/* Shown while the shape is still full-bleed, so the retreat uncovers it. */
.dashboard.is-playing {
  animation: reveal 1ms linear ${timing.coverDone}ms forwards;
}

@keyframes welcome-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.96) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1) translateZ(0);
  }
}

@keyframes shape-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes approach {
  0% {
    transform: translate(-50%, -50%) translateZ(${config.zStart}px) rotateX(${config.tilt}deg) scale(0);
    animation-timing-function: linear;
  }
  8% {
    transform: translate(-50%, -50%) translateZ(${config.zStart}px) rotateX(${config.tilt}deg) scale(0.04);
    animation-timing-function: ${ease};
  }
  100% {
    transform: translate(-50%, -50%) translateZ(${config.zEnd}px) rotateX(0deg) scale(1);
  }
}

@keyframes retreat {
  from {
    left: var(--enter-x);
    top: var(--enter-y);
    transform: translate(-50%, -50%) translateZ(${config.zEnd}px) rotateX(0deg) scale(1);
  }
  to {
    left: var(--exit-x);
    top: var(--exit-y);
    transform: translate(-50%, -50%) translateZ(${config.zEnd}px) rotateX(0deg) scale(0);
  }
}

@keyframes welcome-out { to { opacity: 0; } }
@keyframes shape-out { to { opacity: 0; } }
@keyframes reveal { to { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .welcome.is-playing {
    animation:
      fade 200ms ease both,
      welcome-out 180ms ease ${timing.coverDone}ms forwards;
  }

  .shape {
    inset: 0;
    width: auto;
    height: auto;
    transform: none;
  }

  .shape.is-playing {
    animation:
      fade 240ms ease ${config.shapeDelay}ms both,
      shape-out 200ms ease ${timing.retreatDelay}ms forwards;
  }

  .dashboard.is-playing {
    animation: fade 240ms ease ${timing.retreatDelay}ms both;
  }
}

@keyframes fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
`;
}
