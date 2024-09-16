import { Digit } from '^/shared/digit/types';
import { Tile } from '^/shared/tile';

interface Props {
  answerDigit?: Digit;
  memoDigits: Digit[];
  selectedRow: number;
  selectedCol: number;
  curRow: number;
  curCol: number;
  onClick?: () => void;
}

export function VariableTile({
  answerDigit,
  memoDigits,
  selectedRow,
  selectedCol,
  curRow,
  curCol,
  onClick,
}: Props) {
  const squareRow = Math.floor(curRow / 3);
  const squareCol = Math.floor(curCol / 3);
  const isColored = (squareRow + squareCol) % 2 === 0;

  const isHighlighted = curRow === selectedRow && curCol === selectedCol;
  const isHalfHighlighted =
    curRow === selectedRow ||
    curCol === selectedCol ||
    (squareRow === Math.floor(selectedRow / 3) &&
      squareCol === Math.floor(selectedCol / 3));

  const renderTileBody =
    answerDigit && answerDigit > 0 ? (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isHighlighted
            ? '#20cc20'
            : isHalfHighlighted
              ? '#FFFFFF50'
              : 'transparent',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {answerDigit}
      </div>
    ) : (
      (() => {
        const isMemo: Record<Exclude<Digit, 0>, boolean> = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
          8: false,
          9: false,
        };

        memoDigits.forEach((digit) => {
          if (digit === 0) {
            return;
          }
          isMemo[digit] = true;
        });

        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'grid',
              gridTemplateRows: '1fr 1fr 1fr',
              gridTemplateColumns: '1fr 1fr 1fr',
              backgroundColor: isHighlighted
                ? '#20cc20'
                : isHalfHighlighted
                  ? '#FFFFFF50'
                  : 'transparent',
            }}
          >
            {([1, 2, 3, 4, 5, 6, 7, 8, 9] satisfies Digit[]).map((digit) => (
              <div
                key={`memo-tile-${curRow}-${curCol}-${digit}`}
                style={{
                  fontSize: '0.3rem',
                }}
              >
                {isMemo[digit] ? digit : null}
              </div>
            ))}
          </div>
        );
      })()
    );

  return (
    <Tile
      ariaLabel={`tile-${curRow}-${curCol}`}
      isColored={isColored}
      customStyle={{
        minWidth: 'unset',
        padding: 0,
      }}
      onClick={onClick}
    >
      {renderTileBody}
    </Tile>
  );
}
