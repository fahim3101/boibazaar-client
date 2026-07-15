// Deterministic "book cover" illustration generator.
// Since no real product photos are available, every book gets a generated
// cloth-bound cover in the BoiBazaar palette (ink / amber / sage / paper only),
// varied by a simple geometric pattern keyed off the book's title.
// This doubles as the "multiple images" gallery on the details page via the
// `variant` prop: cover | spine | back.

const PALETTE = {
  ink: "#1B2A4A",
  inkLight: "#2C4270",
  amber: "#E8A33D",
  amberDark: "#C77F1F",
  sage: "#3F6659",
  sageLight: "#5C8A7A",
  paper: "#F6F4EF",
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getPatternIndex(seed: string): number {
  return hashString(seed) % 6;
}

interface CoverProps {
  title: string;
  subject: string;
  author?: string;
  edition?: string;
  variant?: "cover" | "spine" | "back";
  className?: string;
}

export default function BookCoverSVG({
  title,
  subject,
  author = "",
  edition = "",
  variant = "cover",
  className = "",
}: CoverProps) {
  const seed = title + subject;
  const pattern = getPatternIndex(seed);
  const initials = title
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || title.slice(0, 2).toUpperCase();

  const schemes = [
    { bg: PALETTE.ink, fg: PALETTE.paper, accent: PALETTE.amber },
    { bg: PALETTE.sage, fg: PALETTE.paper, accent: PALETTE.amber },
    { bg: PALETTE.paper, fg: PALETTE.ink, accent: PALETTE.sage },
    { bg: PALETTE.inkLight, fg: PALETTE.paper, accent: PALETTE.amber },
    { bg: PALETTE.amber, fg: PALETTE.ink, accent: PALETTE.ink },
    { bg: PALETTE.sageLight, fg: PALETTE.paper, accent: PALETTE.paper },
  ];
  const scheme = schemes[pattern];

  if (variant === "spine") {
    return (
      <svg
        viewBox="0 0 60 300"
        className={className}
        role="img"
        aria-label={`Spine of ${title}`}
      >
        <rect width="60" height="300" fill={scheme.bg} />
        <rect x="6" y="20" width="48" height="3" fill={scheme.accent} />
        <rect x="6" y="277" width="48" height="3" fill={scheme.accent} />
        <text
          x="30"
          y="150"
          fill={scheme.fg}
          fontSize="15"
          fontFamily="var(--font-space-grotesk), sans-serif"
          fontWeight="600"
          textAnchor="middle"
          transform="rotate(90 30 150)"
        >
          {title.length > 26 ? title.slice(0, 24) + "…" : title}
        </text>
      </svg>
    );
  }

  if (variant === "back") {
    const bars = Array.from({ length: 22 });
    return (
      <svg
        viewBox="0 0 240 320"
        className={className}
        role="img"
        aria-label={`Back cover of ${title}`}
      >
        <rect width="240" height="320" fill={scheme.bg} />
        <rect x="20" y="24" width="200" height="2" fill={scheme.accent} opacity="0.5" />
        <foreignObject x="20" y="40" width="200" height="140">
          <div
            style={{
              color: scheme.fg,
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              lineHeight: 1.5,
              opacity: 0.85,
            }}
          >
            A well-loved copy of {title} by {author || "the original author"}, passed on
            through BoiBazaar to its next reader.
          </div>
        </foreignObject>
        <g transform="translate(20 210)">
          {bars.map((_, i) => (
            <rect
              key={i}
              x={i * 9}
              y="0"
              width={i % 3 === 0 ? 4 : 2}
              height="50"
              fill={scheme.fg}
              opacity="0.85"
            />
          ))}
        </g>
        <text
          x="20"
          y="290"
          fill={scheme.fg}
          fontSize="10"
          fontFamily="var(--font-jetbrains), monospace"
          opacity="0.7"
        >
          BOIBAZAAR · {edition || "1st"} EDITION
        </text>
      </svg>
    );
  }

  // Front cover — pattern varies by index 0-5
  return (
    <svg
      viewBox="0 0 240 320"
      className={className}
      role="img"
      aria-label={`Cover of ${title}`}
    >
      <rect width="240" height="320" fill={scheme.bg} />

      {pattern === 0 && (
        <>
          <rect x="0" y="260" width="240" height="14" fill={scheme.accent} />
          <polygon points="240,0 240,60 180,0" fill={scheme.accent} opacity="0.4" />
        </>
      )}
      {pattern === 1 && (
        <circle cx="200" cy="60" r="34" fill={scheme.accent} opacity="0.5" />
      )}
      {pattern === 2 && (
        <>
          <rect x="14" y="14" width="212" height="292" fill="none" stroke={scheme.fg} strokeWidth="2" />
          <rect x="0" y="230" width="240" height="18" fill={scheme.accent} transform="skewY(-3)" opacity="0.7" />
        </>
      )}
      {pattern === 3 && (
        <g opacity="0.35">
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 6 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={20 + c * 40} cy={20 + r * 40} r="3" fill={scheme.fg} />
            ))
          )}
        </g>
      )}
      {pattern === 4 && (
        <g opacity="0.5">
          <polygon points="0,40 40,0 80,40 40,80" fill={scheme.accent} />
          <polygon points="160,280 200,240 240,280 200,320" fill={scheme.accent} />
        </g>
      )}
      {pattern === 5 && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={-40 + i * 40} y="0" width="16" height="320" fill={scheme.fg} opacity="0.08" transform="skewX(-10)" />
          ))}
        </>
      )}

      <rect x="18" y="18" width="204" height="284" fill="none" stroke={scheme.accent} strokeWidth="1" opacity="0.6" />

      <foreignObject x="28" y="120" width="184" height="110">
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 700,
            fontSize: title.length > 40 ? "15px" : "18px",
            color: scheme.fg,
            lineHeight: 1.25,
          }}
        >
          {title}
        </div>
      </foreignObject>

      <text
        x="28"
        y="270"
        fill={scheme.fg}
        opacity="0.75"
        fontSize="11"
        fontFamily="var(--font-inter), sans-serif"
      >
        {author.length > 28 ? author.slice(0, 26) + "…" : author}
      </text>

      <text
        x="212"
        y="40"
        fill={scheme.accent}
        fontSize="22"
        fontWeight="700"
        fontFamily="var(--font-space-grotesk), sans-serif"
        textAnchor="end"
      >
        {initials}
      </text>

      <text
        x="28"
        y="288"
        fill={scheme.fg}
        opacity="0.55"
        fontSize="9"
        letterSpacing="0.05em"
        fontFamily="var(--font-jetbrains), monospace"
      >
        {subject.toUpperCase()}
      </text>
    </svg>
  );
}
