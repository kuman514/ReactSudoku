import { DigitButton } from '^/features/digit-button';
import { ModeButton } from '^/features/mode-button';
import { VariableTile } from '^/features/variable-tile';
import { Digit } from '^/shared/digit/types';
import { useState } from 'react';

function memoDigit({
  row,
  col,
  digit,
  memoTile,
}: {
  row: number;
  col: number;
  digit: Digit;
  memoTile: Digit[][][];
}) {
  const newMemoTile: Digit[][][] = JSON.parse(JSON.stringify(memoTile));
  switch (digit) {
    case 0:
      newMemoTile[row][col] = [];
      break;
    default: {
      const memoIndex = newMemoTile[row][col].findIndex(
        (digitToFind) => digitToFind === digit
      );
      if (memoIndex === -1) {
        newMemoTile[row][col].push(digit);
      } else {
        newMemoTile[row][col].splice(memoIndex, 1);
      }
      break;
    }
  }
  return newMemoTile;
}

function inputDigit({
  row,
  col,
  digit,
  answerTile,
}: {
  row: number;
  col: number;
  digit: Digit;
  answerTile: Digit[][];
}) {
  const newAnswerTile: Digit[][] = JSON.parse(JSON.stringify(answerTile));
  newAnswerTile[row][col] = digit;
  return newAnswerTile;
}

export function App() {
  const [mode, setMode] = useState<'answer' | 'memo'>('answer');

  const [selectedPos, setSelectedPos] = useState<{
    row: number;
    col: number;
  }>({
    row: -1,
    col: -1,
  });

  const [answerTile, setAnswerTile] = useState<Digit[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [memoTile, setMemoTile] = useState<Digit[][][]>([
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ]);

  function handleOnClickDigitButton(digit: Digit) {
    if (selectedPos.row < 0 || selectedPos.col < 0) {
      return;
    }

    switch (mode) {
      case 'answer':
        setAnswerTile(
          inputDigit({
            ...selectedPos,
            digit,
            answerTile,
          })
        );
        break;
      case 'memo':
        setMemoTile(
          memoDigit({
            ...selectedPos,
            digit,
            memoTile,
          })
        );
        break;
      default:
        break;
    }
  }

  return (
    <main>
      <div
        style={{
          width: 300,
          height: 300,
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gridTemplateRows: 'repeat(9, 1fr)',
        }}
      >
        {Array.from({ length: 81 }).map((_, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          return (
            <VariableTile
              key={`${row},${col}`}
              answerDigit={answerTile[row][col]}
              memoDigits={memoTile[row][col]}
              selectedRow={selectedPos.row}
              selectedCol={selectedPos.col}
              curRow={row}
              curCol={col}
              onClick={() => {
                setSelectedPos({
                  row,
                  col,
                });
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          width: 300,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
          }}
        >
          <ModeButton
            modeLabel="answer"
            isActive={mode === 'answer'}
            onClick={() => {
              setMode('answer');
            }}
          >
            Answer
          </ModeButton>
          <ModeButton
            modeLabel="memo"
            isActive={mode === 'memo'}
            onClick={() => {
              setMode('memo');
            }}
          >
            Memo
          </ModeButton>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateAreas: `
            "a b c"
            "d e f"
            "g h i"
            ". j ."
          `,
            alignItems: 'center',
          }}
        >
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 0] satisfies Digit[]).map(
            (digit: Digit) => (
              <DigitButton
                key={`digit-button-${digit}`}
                digit={digit}
                isActive={(() => {
                  if (
                    selectedPos.row < 0 ||
                    selectedPos.col < 0 ||
                    digit === 0
                  ) {
                    return false;
                  }

                  switch (mode) {
                    case 'answer':
                      return (
                        answerTile[selectedPos.row][selectedPos.col] === digit
                      );
                    case 'memo':
                      return memoTile[selectedPos.row][
                        selectedPos.col
                      ].includes(digit);
                    default:
                      return false;
                  }
                })()}
                onClick={handleOnClickDigitButton}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
