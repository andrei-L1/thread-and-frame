
import { Layer, Line, Rect, Stage } from 'react-konva'
import { getGridDimensions, useEditorStore } from '../../store/useEditorStore'

const CELL_SIZE = 15

function StitchCanvas() {
  const stitches = useEditorStore((state) => state.stitches)
  const toggleStitch = useEditorStore((state) => state.toggleStitch)
  const canvasSettings = useEditorStore((state) => state.canvasSettings)

  const { columns, rows } = getGridDimensions(canvasSettings)

  const canvasWidth = columns * CELL_SIZE
  const canvasHeight = rows * CELL_SIZE

  const verticalLines = Array.from({ length: columns + 1 }, (_, index) => (
    <Line
      key={`vertical-${index}`}
      points={[
        index * CELL_SIZE,
        0,
        index * CELL_SIZE,
        canvasHeight,
      ]}
      stroke="#e7e5e4"
      strokeWidth={1}
      listening={false}
    />
  ))

  const horizontalLines = Array.from({ length: rows + 1 }, (_, index) => (
    <Line
      key={`horizontal-${index}`}
      points={[
        0,
        index * CELL_SIZE,
        canvasWidth,
        index * CELL_SIZE,
      ]}
      stroke="#e7e5e4"
      strokeWidth={1}
      listening={false}
    />
  ))

  return (
    <div className="max-w-full overflow-auto border border-stone-200 bg-white shadow-sm">
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {/* Canvas background */}
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill="#ffffff"
            listening={false}
          />

          {/* Individual stitch cells */}
          {Array.from({ length: rows }, (_, row) =>
            Array.from({ length: columns }, (_, column) => {
              const id = `${column}-${row}`
              const stitch = stitches[id]

              return (
                <Rect
                  key={id}
                  x={column * CELL_SIZE}
                  y={row * CELL_SIZE}
                  width={CELL_SIZE}
                  height={CELL_SIZE}
                  fill={stitch?.color ?? 'rgba(0,0,0,0.001)'}
                  onClick={() => toggleStitch(column, row)}
                />
              )
            }),
          )}

          {/* Grid lines */}
          {verticalLines}
          {horizontalLines}
        </Layer>
      </Stage>
    </div>
  )
}

export default StitchCanvas
