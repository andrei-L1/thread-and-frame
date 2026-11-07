
import AppLayout from './components/layout/AppLayout'

function App() {
  return (
    <AppLayout>
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Workspace toolbar */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-6">
          <div>
            <h2 className="text-sm font-semibold text-stone-800">
              Design Workspace
            </h2>
            <p className="text-xs text-stone-400">
              Create something worth remembering.
            </p>
          </div>

          <span className="text-xs text-stone-400">
            Untitled Project
          </span>
        </div>

        {/* Editor workspace */}
        <div className="flex min-h-0 flex-1">
          {/* Left toolbar */}
          <aside className="hidden w-64 shrink-0 border-r border-stone-200 bg-white p-5 md:block">
            <h3 className="mb-5 text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Design Tools
            </h3>

            <div className="space-y-2 text-sm text-stone-600">
              <div className="rounded-lg bg-stone-100 px-3 py-3 font-medium text-stone-800">
                Select
              </div>
              <div className="rounded-lg px-3 py-3">Photographs</div>
              <div className="rounded-lg px-3 py-3">Typography</div>
              <div className="rounded-lg px-3 py-3">Patterns</div>
              <div className="rounded-lg px-3 py-3">Decorations</div>
            </div>
          </aside>

          {/* Central canvas area */}
          <section className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-auto bg-stone-100 p-6">
            <div className="mb-4 flex w-full max-w-2xl items-center justify-between">
              <span className="text-xs font-medium text-stone-500">
                CANVAS PREVIEW
              </span>
              <span className="text-xs text-stone-400">
                100% zoom
              </span>
            </div>

            <div
              className="flex aspect-[3/4] w-full max-w-sm items-center justify-center border border-stone-200 bg-white shadow-sm"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #f0ede7 1px, transparent 1px), linear-gradient(to bottom, #f0ede7 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            >
              <div className="bg-white/90 px-6 py-5 text-center">
                <p className="text-lg font-medium text-stone-700">
                  Your design starts here.
                </p>
                <p className="mt-2 text-xs text-stone-400">
                  Your creative space is ready.
                </p>
              </div>
            </div>
          </section>

          {/* Right properties panel */}
          <aside className="hidden w-64 shrink-0 border-l border-stone-200 bg-white p-5 lg:block">
            <h3 className="mb-5 text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Properties
            </h3>

            <div className="space-y-5 text-sm">
              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Paper Size
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  A5
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Orientation
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  Portrait
                </div>
              </div>

              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Stitch Size
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  5 mm
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}

export default App
