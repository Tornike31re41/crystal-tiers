"use client";

import { useMemo, useState } from "react";

function buildAvatarUrl(username: string) {
  const safe = encodeURIComponent(username.trim() || "MHF_Steve");
  return `https://crafatar.com/avatars/${safe}?size=64&overlay&default=MHF_Steve`;
}

const STEVE_FALLBACK = "https://crafatar.com/avatars/MHF_Steve?size=64&overlay";

export function MinecraftAvatar({ username, size = 32 }: { username: string; size?: number }) {
  const initialUrl = useMemo(() => buildAvatarUrl(username), [username]);
  const [src, setSrc] = useState(initialUrl);
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const handleError = () => {
    if (stage === 0) {
      setStage(1);
      setSrc(STEVE_FALLBACK);
      return;
    }
    setStage(2);
  };

  if (stage === 2) {
    return (
      <div
        style={{ width: size, height: size }}
        className="grid place-items-center rounded-md border border-[#334067] bg-[#273055] text-[10px] text-zinc-300 shadow-sm"
      >
        SK
      </div>
    );
  }

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
