import { Button, SxProps, Theme } from '@mui/material';
import { MouseEvent, ReactNode } from 'react';

interface Props {
  ariaLabel?: string;
  children?: ReactNode;
  customStyle?: SxProps<Theme>;
  isColored?: boolean;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Tile({
  ariaLabel,
  children,
  customStyle,
  isColored,
  isDisabled,
  onClick,
}: Props) {
  return (
    <Button
      aria-label={ariaLabel}
      disabled={isDisabled ?? false}
      variant={(isColored ?? false) ? 'contained' : 'outlined'}
      onClick={onClick}
      sx={{
        boxShadow: 'none',
        borderRadius: '0',
        ':hover': {
          boxShadow: 'none',
        },
        ...customStyle,
      }}
    >
      {children}
    </Button>
  );
}
