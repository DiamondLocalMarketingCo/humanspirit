export default function EyeVisual() {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-48px_rgba(8,13,22,0.75)] sm:p-8">
      <div className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%)] opacity-80" />
      <div className="relative mx-auto flex h-[320px] w-full max-w-[420px] items-center justify-center">
        <div className="relative h-72 w-full max-w-[320px] rounded-[2rem] border border-white/10 bg-[#070c12] p-6 shadow-[inset_0_0_180px_rgba(56,189,248,0.08)] sm:p-8">
          <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_45%)]" />
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-gradient-to-br from-[#102a36] via-[#031013] to-[#0b1320] shadow-[0_0_90px_rgba(56,189,248,0.14)]">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(41,136,185,0.35),transparent_52%)] opacity-95" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#79c2ff]/15 border border-[#7dd3fc]/30 shadow-[0_0_30px_rgba(125,211,252,0.28)]" />
            <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#eaf5ff]/30 shadow-[0_0_28px_rgba(255,255,255,0.2)]" />
            <div className="absolute inset-x-6 top-[38%] h-2 rounded-full bg-white/10 blur-sm" />
            <div className="absolute inset-x-0 bottom-10 h-1 rounded-full bg-white/5" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(circle,_rgba(56,189,248,0.12),transparent_60%)]" />
        </div>
      </div>
    </div>
  );
}
