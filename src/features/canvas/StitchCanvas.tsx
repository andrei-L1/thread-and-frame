
import { Layer, Line, Rect, Stage } from 'react-konva'
import { useEditorStore } from '../../store/useEditorStore'

const GRID_COLUMNS = 24
const GRID_ROWS = 32
const CELL_SIZE = 15

const CANVAS_WIDTH = GRID_COLUMNS * CELL_SIZE
const CANVAS_HEIGHT = GRID_ROWS * CELL_SIZE

const verticalLines = Array.from(
  { length: GRID_COLUMNS + 1 },
  (_, index) => ({
    key: `vertical-${index}`,
    points: [
      index * CELL_SIZE,
      0,
      index * CELL_SIZE,
      CANVAS_HEIGHT,
    ],
  }),
)

const horizontalLines = Array.from(
  { length: GRID_ROWS + 1 },
  (_, index) => ({
    key: `horizontal-${index}`,
    points: [
      0,
      index * CELL_SIZE,
      CANVAS_WIDTH,
      index * CELL_SIZE,
    ],
  }),
)

function StitchCanvas() {
  const stitches = useEditorStore((state) => state.stitches)
  const toggleStitch = useEditorStore((state) => state.toggleStitch)

  return (
    <div className="overflow-hidden border border-stone-200 bg-white shadow-sm">
      <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
        <Layer>
          {/* Canvas background */}
          <Rect
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="#ffffff"
            listening={false}
          />

          {/* Individual stitch cells */}
          {Array.from({ length: GRID_ROWS }, (_, row) =>
            Array.from({ length: GRID_COLUMNS }, (_, column) => {
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

          {/* Vertical grid lines */}
          {verticalLines.map((line) => (
            <Line
              key={line.key}
              points={line.points}
              stroke="#e7e5e4"
              strokeWidth={1}
              listening={false}
            />
          ))}

          {/* Horizontal grid lines */}
          {horizontalLines.map((line) => (
            <Line
              key={line.key}
              points={line.points}
              stroke="#e7e5e4"
              strokeWidth={1}
              listening={false}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}

export default StitchCanvas
