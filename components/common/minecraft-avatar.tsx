"use client";

import { useMemo, useState } from "react";

function buildAvatarUrl(username: string) {
  const safe = encodeURIComponent(username.trim() || "MHF_Steve");
  return `https://crafatar.com/avatars/${safe}?size=64&overlay&default=MHF_Steve`;
}

const STEVE_FALLBACK = "https://crafatar.com/avatars/MHF_Steve?size=64&overlay";
function buildMcHeadsUrl(username: string) {
  const safe = encodeURIComponent(username.trim() || "MHF_Steve");
  return `https://mc-heads.net/avatar/${safe}/64`;
}
const MC_HEADS_STEVE = "https://mc-heads.net/avatar/MHF_Steve/64";

export function MinecraftAvatar({ username, size = 32 }: { username: string; size?: number }) {
  const initialUrl = useMemo(() => buildAvatarUrl(username), [username]);
  const [src, setSrc] = useState(initialUrl);
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);

  const handleError = () => {
    if (stage === 0) {
      setStage(1);
      setSrc(STEVE_FALLBACK);
      return;
    }
    if (stage === 1) {
      setStage(2);
      setSrc(buildMcHeadsUrl(username));
      return;
    }
    if (stage === 2) {
      setStage(3);
      setSrc(MC_HEADS_STEVE);
      return;
    }
    setStage(4);
  };

  if (stage === 4) {
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
