
import { create } from 'zustand'
import type { Stitch } from '../types/stitch'

export const PAPER_PRESETS = {
  Passport: { width: 88, height: 125 },
  A6: { width: 105, height: 148 },
  A5: { width: 148, height: 210 },
  B6: { width: 125, height: 176 },
  'B6 Slim': { width: 105, height: 176 },
} as const

export const STITCH_SIZES = [3, 5, 7] as const

export type PaperSize = keyof typeof PAPER_PRESETS
export type Orientation = 'Portrait' | 'Landscape'
export type StitchSize = (typeof STITCH_SIZES)[number]

export type CanvasSettings = {
  paperSize: PaperSize
  orientation: Orientation
  stitchSize: StitchSize
}

const DEFAULT_STITCH_COLOR = '#57534e'

const DEFAULT_CANVAS_SETTINGS: CanvasSettings = {
  paperSize: 'A5',
  orientation: 'Portrait',
  stitchSize: 5,
}

export function getGridDimensions(settings: CanvasSettings) {
  const preset = PAPER_PRESETS[settings.paperSize]

  const widthMm =
    settings.orientation === 'Portrait' ? preset.width : preset.height

  const heightMm =
    settings.orientation === 'Portrait' ? preset.height : preset.width

  return {
    columns: Math.floor(widthMm / settings.stitchSize),
    rows: Math.floor(heightMm / settings.stitchSize),
  }
}

type EditorState = {
  stitches: Record<string, Stitch>
  selectedColor: string
  canvasSettings: CanvasSettings

  toggleStitch: (column: number, row: number) => void
  setSelectedColor: (color: string) => void
  clearStitches: () => void
  setCanvasSettings: (
    settings: Partial<CanvasSettings>,
    discardOverflow?: boolean,
  ) => boolean
}

export const useEditorStore = create<EditorState>((set, get) => ({
  stitches: {},
  selectedColor: DEFAULT_STITCH_COLOR,
  canvasSettings: DEFAULT_CANVAS_SETTINGS,

  toggleStitch: (column, row) =>
    set((state) => {
      const id = `${column}-${row}`
      const updatedStitches = { ...state.stitches }

      if (updatedStitches[id]) {
        delete updatedStitches[id]
      } else {
        updatedStitches[id] = {
          id,
          column,
          row,
          color: state.selectedColor,
        }
      }

      return { stitches: updatedStitches }
    }),

  setSelectedColor: (color) => set({ selectedColor: color }),

  clearStitches: () => set({ stitches: {} }),

  setCanvasSettings: (settings, discardOverflow = false) => {
    const currentState = get()

    const nextSettings = {
      ...currentState.canvasSettings,
      ...settings,
    }

    const { columns, rows } = getGridDimensions(nextSettings)

    const hasOverflow = Object.values(currentState.stitches).some(
      (stitch) => stitch.column >= columns || stitch.row >= rows,
    )

    if (hasOverflow && !discardOverflow) {
      return false
    }

    set((state) => {
      const updatedStitches = Object.fromEntries(
        Object.entries(state.stitches).filter(([, stitch]) => {
          return stitch.column < columns && stitch.row < rows
        }),
      )

      return {
        canvasSettings: nextSettings,
        stitches: updatedStitches,
      }
    })

    return true
  },
}))
