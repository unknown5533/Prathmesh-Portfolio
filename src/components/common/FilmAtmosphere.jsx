export function FilmAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 35mm Analog Film Grain Filter */}
      <div className="film-grain" />

      {/* Deep Anamorphic Vignette */}
      <div className="cinematic-vignette" />

      {/* Subtle Cinematic Ambient Backlight Glow (Deep Red #E74747) */}
      <div
        className="absolute top-1/3 -right-24 h-[500px] w-[500px] rounded-full blur-[140px] opacity-15 md:opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(231,71,71,0.8) 0%, rgba(231,71,71,0.1) 60%, transparent 100%)",
        }}
      />

      {/* Cold Rim Glow on Top Left */}
      <div
        className="absolute -top-32 -left-32 h-[450px] w-[450px] rounded-full blur-[160px] opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(148,163,184,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Viewfinder Safe-Area Framing Markers (10% opacity) */}
      <div className="absolute inset-4 md:inset-8 border border-white/[0.04] rounded-sm pointer-events-none">
        {/* Top-left corner tick */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/20" />
        {/* Top-right corner tick */}
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white/20" />
        {/* Bottom-left corner tick */}
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white/20" />
        {/* Bottom-right corner tick */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/20" />

        {/* Optical center micro-crosshair */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
          <div className="w-3 h-[1px] bg-white/40 -translate-x-1" />
          <div className="h-3 w-[1px] bg-white/40 -translate-y-2 -translate-x-[2px]" />
        </div>
      </div>
    </div>
  );
}
