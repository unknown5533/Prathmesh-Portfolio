export function CanvasFallback() {
  return (
    <div
      className="relative w-full h-full min-h-[380px] flex items-center justify-center select-none"
      aria-label="3D Film Aperture Sculpture (2D Fallback)"
    >
      {/* Outer Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#E74747]/20 via-transparent to-white/10 blur-3xl pointer-events-none" />

      {/* Sculptural Chrome Film Frame Simulation */}
      <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl p-[2px] bg-gradient-to-br from-white/60 via-zinc-400/20 to-zinc-900 border border-white/20 shadow-2xl shadow-black/80 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-700 ease-out">
        {/* Inner Chamfered Bevel */}
        <div className="w-full h-full rounded-[14px] bg-[#0c0e12] p-4 flex flex-col justify-between relative overflow-hidden">
          {/* Chrome Specular Highlights */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#E74747]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Film Registration Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] tracking-widest font-mono text-zinc-400">
            <span>PJ•EDITORIAL</span>
            <span className="text-[#E74747]">● REC</span>
            <span>2.39:1 DCI</span>
          </div>

          {/* Central Sculptural Aperture Core */}
          <div className="relative flex items-center justify-center my-auto">
            {/* Concentric Chrome Rings */}
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-white/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.15)]">
              <div className="w-28 h-28 md:w-34 md:h-34 rounded-full border border-white/40 flex items-center justify-center bg-gradient-to-br from-zinc-800/80 to-zinc-950/90">
                <div className="w-16 h-16 rounded-full border border-white/60 flex items-center justify-center shadow-lg shadow-black">
                  <span className="font-display font-extrabold text-2xl text-white tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                    J
                  </span>
                </div>
              </div>
            </div>

            {/* Crosshair Viewfinder Tick Marks */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-[1px] bg-white/10" />
              <div className="absolute h-full w-[1px] bg-white/10" />
            </div>
          </div>

          {/* Bottom Film Sprockets Simulation */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] tracking-widest font-mono text-zinc-500">
            <span>ISO 800</span>
            <span>FRAME 0024</span>
            <span className="text-zinc-400">5600K</span>
          </div>
        </div>
      </div>
    </div>
  );
}
