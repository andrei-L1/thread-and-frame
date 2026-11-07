
import { useEditorStore } from './store/useEditorStore'
import StitchCanvas from './features/canvas/StitchCanvas'
import AppLayout from './components/layout/AppLayout'

const THREAD_COLORS = [
  '#57534e',
  '#9f1239',
  '#1d4ed8',
  '#15803d',
  '#d97706',
  '#7c3aed',
]

function App() {
  const selectedColor = useEditorStore((state) => state.selectedColor)
  const setSelectedColor = useEditorStore((state) => state.setSelectedColor)

  const stitchCount = useEditorStore(
    (state) => Object.keys(state.stitches).length,
  )

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

          <span className="text-xs text-stone-400">Untitled Project</span>
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
              <span className="text-xs text-stone-400">100% zoom</span>
            </div>

            <StitchCanvas />
          </section>

          {/* Right properties panel */}
          <aside className="hidden w-64 shrink-0 border-l border-stone-200 bg-white p-5 lg:block">
            <h3 className="mb-5 text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Properties
            </h3>

            <div className="space-y-5 text-sm">
              {/* Paper size */}
              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Paper Size
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  A5
                </div>
              </div>

              {/* Orientation */}
              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Orientation
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  Portrait
                </div>
              </div>

              {/* Stitch size */}
              <div>
                <p className="mb-2 font-medium text-stone-700">
                  Stitch Size
                </p>
                <div className="rounded-lg border border-stone-200 px-3 py-2 text-stone-500">
                  5 mm
                </div>
              </div>

              {/* Thread color selector */}
              <div>
                <p className="mb-3 font-medium text-stone-700">
                  Thread Color
                </p>

                <div className="flex flex-wrap gap-2">
                  {THREAD_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      aria-label={`Select thread color ${color}`}
                      aria-pressed={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 transition ${
                        selectedColor === color
                          ? 'border-stone-800 ring-2 ring-stone-300'
                          : 'border-stone-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <p className="mt-2 text-xs text-stone-400">
                  Selected: {selectedColor}
                </p>
              </div>

              {/* Stitch counter */}
              <div className="border-t border-stone-200 pt-4">
                <p className="text-sm text-stone-500">Total Stitches</p>

                <p className="mt-1 text-2xl font-semibold text-stone-800">
                  {stitchCount}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  )
}

export default App
