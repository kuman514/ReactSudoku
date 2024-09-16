import { cleanup } from '@testing-library/react';
import { beforeEach, describe, it } from 'vitest';

describe('VariableTile', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should show one number when it has answer digit', () => {});

  it('should show memo when it does not have answer digit', () => {});

  it('should be highlighted when it is selected', () => {});

  it('should be half-highlighted when it is not selected but in the same horizontal or vertical line or the same square', () => {});
});
