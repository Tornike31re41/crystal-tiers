"use client";

import { useMemo, useState } from "react";

function buildAvatarUrl(username: string) {
  const safe = encodeURIComponent(username.trim() || "MHF_Steve");
  return `https://crafatar.com/avatars/${safe}?size=64&overlay&default=MHF_Steve`;
}

const STEVE_FALLBACK = "https://crafatar.com/avatars/MHF_Steve?size=64&overlay";
const INLINE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
      <rect width='64' height='64' rx='10' fill='#273055'/>
      <text x='32' y='38' text-anchor='middle' font-family='Arial' font-size='18' fill='#d4d4d8'>SK</text>
    </svg>`,
  );

export function MinecraftAvatar({ username, size = 32 }: { username: string; size?: number }) {
  const initialUrl = useMemo(() => buildAvatarUrl(username), [username]);
  const [src, setSrc] = useState(initialUrl);
  const [triedSteve, setTriedSteve] = useState(false);

  const handleError = () => {
    if (!triedSteve) {
      setTriedSteve(true);
      setSrc(STEVE_FALLBACK);
      return;
    }
    setSrc(INLINE_FALLBACK);
  };

  return (
    <img
      src={src}
      alt={`${username} minecraft avatar`}
      width={size}
      height={size}
      className="rounded-md border border-[#334067] bg-[#273055] object-cover shadow-sm"
      onError={handleError}
      loading="lazy"
      decoding="async"
    />
  );
}
