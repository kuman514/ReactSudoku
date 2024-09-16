import { DigitButton } from '^/features/digit-button';
import { ModeButton } from '^/features/mode-button';
import { Digit } from '^/shared/digit/types';
import { useState } from 'react';

export function App() {
  const [mode, setMode] = useState<'answer' | 'memo'>('answer');
  const [digitActiveStatus, setDigitActiveStatus] = useState<
    Record<Digit, boolean>
  >({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  function handleOnClickDigitButton(clickedDigit: Digit) {
    setDigitActiveStatus({
      ...digitActiveStatus,
      [clickedDigit]: !digitActiveStatus[clickedDigit],
    });
  }

  return (
    <main>
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
                isActive={digitActiveStatus[digit]}
                onClick={handleOnClickDigitButton}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
