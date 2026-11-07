
import { create } from 'zustand'
import type { Stitch } from '../types/stitch'

type EditorState = {
  stitches: Record<string, Stitch>
  selectedColor: string

  toggleStitch: (column: number, row: number) => void
  setSelectedColor: (color: string) => void
  clearStitches: () => void
}

const DEFAULT_STITCH_COLOR = '#57534e'

export const useEditorStore = create<EditorState>((set) => ({
  stitches: {},
  selectedColor: DEFAULT_STITCH_COLOR,

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
}))
