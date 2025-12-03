export const Shortcut = ({ keys }: { keys: string[] }) => {
  return (
    <div className="flex gap-1">
      {keys.map((k) => (
        <kbd key={k} className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
          {k}
        </kbd>
      ))}
    </div>
  )
}