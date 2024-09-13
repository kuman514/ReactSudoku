import { DigitButton } from '^/features/digit-button';
import { Digit } from '^/features/digit-button/types';
import { useState } from 'react';

export function App() {
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
    </main>
  );
}
