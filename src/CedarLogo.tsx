type CedarLogoProps = {
  word?: string;
};

export function CedarLogo({ word = "Cedar" }: CedarLogoProps) {
  return (
    <span className="cedar-logo">
      <svg className="cedar-mark" viewBox="0 0 64 64" aria-hidden="true">
        <g fill="currentColor">
          <ellipse cx="32" cy="12" rx="4.4" ry="7.4" transform="rotate(-8 32 12)" />
          <ellipse cx="22.5" cy="19.5" rx="9.2" ry="3.8" transform="rotate(-26 22.5 19.5)" />
          <ellipse cx="41.5" cy="20" rx="8" ry="3.5" transform="rotate(22 41.5 20)" />
          <ellipse cx="19" cy="30" rx="11.5" ry="4.1" transform="rotate(-18 19 30)" />
          <ellipse cx="45" cy="30.5" rx="10" ry="3.8" transform="rotate(16 45 30.5)" />
          <ellipse cx="21" cy="41.5" rx="12.2" ry="4.3" transform="rotate(-12 21 41.5)" />
          <ellipse cx="44" cy="42" rx="10.4" ry="4" transform="rotate(12 44 42)" />
          <path d="M29.2 20.5c1 8 .5 16.5-.6 25.2-.2 1.6.8 2.8 2.6 2.8 1.9 0 2.9-1.2 2.6-2.9-.8-9-1.2-17.4-.2-25.4-1.4.2-3 .2-4.4.3z" />
        </g>
      </svg>
      {word ? <span className="cedar-word">{word}</span> : null}
    </span>
  );
}
