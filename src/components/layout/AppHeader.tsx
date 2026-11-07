type AppHeaderProps = {
  projectName?: string
}

function AppHeader({ projectName = 'Untitled Project' }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-6">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-lg text-white">
          T
        </div>

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-stone-800">
            Thread & Frame
          </h1>
          <p className="text-[10px] tracking-[0.18em] text-stone-400 uppercase">
            Turn memories into stitches
          </p>
        </div>
      </div>

      {/* Project information */}
      <div className="hidden items-center gap-3 sm:flex">
        <span className="text-sm text-stone-400">Project</span>
        <span className="text-sm font-medium text-stone-700">{projectName}</span>
      </div>

      {/* Workspace status */}
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs text-stone-500">Ready to create</span>
      </div>
    </header>
  )
}

export default AppHeader