import { cleanup, render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { VariableTile } from '.';

describe('VariableTile', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should show one number when it has answer digit', () => {
    const { container } = render(
      <VariableTile
        answerDigit={3}
        memoDigits={[4, 2, 8]}
        selectedRow={-1}
        selectedCol={-1}
        curRow={0}
        curCol={0}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show memo when it does not have answer digit', () => {
    const { container } = render(
      <VariableTile
        memoDigits={[4, 2, 8, 7]}
        selectedRow={-1}
        selectedCol={-1}
        curRow={0}
        curCol={0}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be highlighted when it is selected', () => {
    const { container } = render(
      <VariableTile
        memoDigits={[4, 2, 8, 7]}
        selectedRow={3}
        selectedCol={4}
        curRow={3}
        curCol={4}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be half-highlighted when it is not selected but in the same horizontal or vertical line or the same square', () => {
    const { container } = render(
      <>
        <VariableTile
          memoDigits={[4, 2, 8, 7]}
          selectedRow={5}
          selectedCol={4}
          curRow={3}
          curCol={5}
        />
        <VariableTile
          answerDigit={7}
          memoDigits={[5, 1, 4]}
          selectedRow={7}
          selectedCol={0}
          curRow={7}
          curCol={5}
        />
        <VariableTile
          memoDigits={[4, 2, 8, 7]}
          selectedRow={7}
          selectedCol={3}
          curRow={1}
          curCol={3}
        />
      </>
    );
    expect(container).toMatchSnapshot();
  });
});
