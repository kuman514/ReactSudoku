import { ReactNode } from 'react';

import { UIButton } from '^/shared/ui-button';

interface Props {
  modeLabel: string;
  children?: ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export function ModeButton({
  modeLabel,
  children,
  isActive,
  isDisabled,
  onClick,
}: Props) {
  return (
    <UIButton
      ariaLabel={`mode-button-${modeLabel}`}
      isDisabled={isDisabled}
      variant={isActive ? 'contained' : 'outlined'}
      onClick={onClick}
    >
      {children}
    </UIButton>
  );
}
