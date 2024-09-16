import { Digit } from '^/shared/digit/types';
import { UIButton } from '^/shared/ui-button';

import { GRID_AREA } from './grid-area';

interface Props {
  digit: Digit;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: (clickedDigit: Digit) => void;
}

export function DigitButton({ digit, isActive, isDisabled, onClick }: Props) {
  return (
    <UIButton
      ariaLabel={`digit-button-${digit}`}
      isDisabled={isDisabled}
      variant={isActive ? 'contained' : 'outlined'}
      onClick={() => {
        onClick?.(digit);
      }}
      customStyle={{
        minWidth: 'unset',
        gridArea: GRID_AREA[digit],
      }}
    >
      {digit}
    </UIButton>
  );
}
