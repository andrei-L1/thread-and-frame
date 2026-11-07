
import { useEditorStore } from './store/useEditorStore'
import {
  getGridDimensions,
  PAPER_PRESETS,
  STITCH_SIZES,
  type CanvasSettings,
  type Orientation,
  type PaperSize,
  type StitchSize,
} from './store/useEditorStore'
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
  const clearStitches = useEditorStore((state) => state.clearStitches)
  const setCanvasSettings = useEditorStore(
    (state) => state.setCanvasSettings,
  )

  const stitches = useEditorStore((state) => state.stitches)
  const canvasSettings = useEditorStore((state) => state.canvasSettings)

  const stitchCount = Object.keys(stitches).length

  const { columns, rows } = getGridDimensions(canvasSettings)

  const preset = PAPER_PRESETS[canvasSettings.paperSize]

  const paperWidth =
    canvasSettings.orientation === 'Portrait'
      ? preset.width
      : preset.height

  const paperHeight =
    canvasSettings.orientation === 'Portrait'
      ? preset.height
      : preset.width

  const stitchedWidth = columns * canvasSettings.stitchSize
  const stitchedHeight = rows * canvasSettings.stitchSize

  const handleCanvasSettingChange = (
    settings: Partial<CanvasSettings>,
  ) => {
    const updated = setCanvasSettings(settings)

    if (!updated) {
      const confirmed = window.confirm(
        'Changing these settings will remove stitches that fall outside the new canvas. Do you want to continue?',
      )

      if (confirmed) {
        setCanvasSettings(settings, true)
      }
    }
  }

  const handleClearCanvas = () => {
    if (stitchCount === 0) return

    const confirmed = window.confirm(
      'Are you sure you want to clear all stitches? This action cannot be undone.',
    )

    if (confirmed) {
      clearStitches()
    }
  }

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

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleClearCanvas}
              disabled={stitchCount === 0}
              className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear Canvas
            </button>

            <span className="text-xs text-stone-400">
              Untitled Project
            </span>
          </div>
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
                {columns} × {rows} stitches
              </span>
            </div>

            <StitchCanvas />
          </section>

          {/* Right properties panel */}
          <aside className="hidden w-64 shrink-0 overflow-y-auto border-l border-stone-200 bg-white p-5 md:block">
            <h3 className="mb-5 text-xs font-semibold tracking-wider text-stone-400 uppercase">
              Properties
            </h3>

            <div className="space-y-5 text-sm">
              {/* Paper size */}
              <div>
                <label
                  htmlFor="paper-size"
                  className="mb-2 block font-medium text-stone-700"
                >
                  Paper Size
                </label>

                <select
                  id="paper-size"
                  value={canvasSettings.paperSize}
                  onChange={(event) =>
                    handleCanvasSettingChange({
                      paperSize: event.target.value as PaperSize,
                    })
                  }
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-600 outline-none focus:border-stone-400"
                >
                  {Object.keys(PAPER_PRESETS).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Orientation */}
              <div>
                <label
                  htmlFor="orientation"
                  className="mb-2 block font-medium text-stone-700"
                >
                  Orientation
                </label>

                <select
                  id="orientation"
                  value={canvasSettings.orientation}
                  onChange={(event) =>
                    handleCanvasSettingChange({
                      orientation: event.target.value as Orientation,
                    })
                  }
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-600 outline-none focus:border-stone-400"
                >
                  <option value="Portrait">Portrait</option>
                  <option value="Landscape">Landscape</option>
                </select>
              </div>

              {/* Stitch size */}
              <div>
                <label
                  htmlFor="stitch-size"
                  className="mb-2 block font-medium text-stone-700"
                >
                  Stitch Size
                </label>

                <select
                  id="stitch-size"
                  value={canvasSettings.stitchSize}
                  onChange={(event) =>
                    handleCanvasSettingChange({
                      stitchSize: Number(event.target.value) as StitchSize,
                    })
                  }
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-stone-600 outline-none focus:border-stone-400"
                >
                  {STITCH_SIZES.map((size) => (
                    <option key={size} value={size}>
                      {size} mm
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid dimensions */}
              <div className="space-y-2 border-t border-stone-200 pt-4">
                <p className="font-medium text-stone-700">
                  Canvas Dimensions
                </p>

                <div className="flex justify-between text-xs text-stone-500">
                  <span>Paper</span>
                  <span>
                    {paperWidth} × {paperHeight} mm
                  </span>
                </div>

                <div className="flex justify-between text-xs text-stone-500">
                  <span>Stitched area</span>
                  <span>
                    {stitchedWidth} × {stitchedHeight} mm
                  </span>
                </div>

                <div className="flex justify-between text-xs text-stone-500">
                  <span>Grid</span>
                  <span>
                    {columns} × {rows}
                  </span>
                </div>
              </div>

              {/* Thread color selector */}
              <div className="border-t border-stone-200 pt-4">
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
