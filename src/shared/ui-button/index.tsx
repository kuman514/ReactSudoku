import { Button, SxProps, Theme } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';

interface Props {
  ariaLabel?: string;
  children?: ReactNode;
  customStyle?: SxProps<Theme>;
  variant?: 'text' | 'outlined' | 'contained';
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function UIButton({
  ariaLabel,
  children,
  variant,
  customStyle,
  isDisabled,
  onClick,
}: Props) {
  return (
    <Button
      aria-label={ariaLabel}
      disabled={isDisabled ?? false}
      variant={variant ?? 'outlined'}
      sx={customStyle}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
