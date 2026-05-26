import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import {
  ContextProvider,
  useAppState,
  useDebounce,
  useOnScreen,
  useOnTrackObjectChange,
  usePosition,
  usePrevious,
  useTrackObject,
  useWindowScroll,
  useWindowSize,
} from '../index.js';

describe('hooks index', () => {
  it('exports all hook helpers', () => {
    expect(useAppState).toEqual(expect.any(Function));
    expect(useDebounce).toEqual(expect.any(Function));
    expect(useOnScreen).toEqual(expect.any(Function));
    expect(usePosition).toEqual(expect.any(Function));
    expect(usePrevious).toEqual(expect.any(Function));
    expect(useWindowScroll).toEqual(expect.any(Function));
    expect(useWindowSize).toEqual(expect.any(Function));
  });
});

describe('useAppState', () => {
  it('shares state through ContextProvider', () => {
    function Example() {
      const [value, setValue] = useAppState('count', 1);

      return <button onClick={() => setValue(2)}>{value}</button>;
    }

    render(
      <ContextProvider>
        <Example />
      </ContextProvider>,
    );

    expect(screen.getByRole('button')).toHaveTextContent('1');
    act(() => screen.getByRole('button').click());
    expect(screen.getByRole('button')).toHaveTextContent('2');
  });
});

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('delays value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 'first' } },
    );

    expect(result.current).toBe('first');
    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('second');
  });
});

describe('usePrevious', () => {
  it('returns the previous render value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    expect(result.current).toBeUndefined();
    rerender({ value: 'second' });
    expect(result.current).toBe('first');
  });
});

describe('useWindowSize', () => {
  it('tracks resize events', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        value: 800,
      });
      Object.defineProperty(window, 'innerHeight', {
        configurable: true,
        value: 600,
      });
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 800, height: 600 });
  });
});

describe('useWindowScroll', () => {
  it('tracks scroll position', () => {
    const { result } = renderHook(() => useWindowScroll());

    act(() => {
      Object.defineProperty(window, 'pageXOffset', {
        configurable: true,
        value: 12,
      });
      Object.defineProperty(window, 'pageYOffset', {
        configurable: true,
        value: 34,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toEqual({ x: 12, y: 34 });
  });
});

describe('useOnScreen', () => {
  const originalObserver = window.IntersectionObserver;

  afterEach(() => {
    window.IntersectionObserver = originalObserver;
  });

  it('updates when the observed element intersects', () => {
    let observerCallback: IntersectionObserverCallback | undefined;

    window.IntersectionObserver = jest.fn((callback) => {
      observerCallback = callback;
      return {
        disconnect: jest.fn(),
        observe: jest.fn(),
        takeRecords: jest.fn(),
        unobserve: jest.fn(),
      };
    }) as any;

    function Example() {
      const [ref, visible] = useOnScreen();

      return (
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          {visible ? 'visible' : 'hidden'}
        </div>
      );
    }

    render(<Example />);

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(screen.getByText('visible')).toBeInTheDocument();
  });
});

describe('usePosition', () => {
  it('returns zero position when the ref has no element', () => {
    const ref = { current: null };
    const { result } = renderHook(() => usePosition(ref));

    expect(result.current).toEqual({ top: 0, left: 0 });
  });
});

describe('useTrackObject', () => {
  it('logs changed object properties', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ value }) => useTrackObject('demo', value),
      { initialProps: { value: { a: 1 } } },
    );

    rerender({ value: { a: 2 } });

    expect(log).toHaveBeenCalledWith('[demo] updated', { a: 2 });
    log.mockRestore();
  });

  it('calls back with changed object properties', () => {
    const callback = jest.fn();

    const { rerender } = renderHook(
      ({ value }) => useOnTrackObjectChange(value, callback),
      { initialProps: { value: { a: 1 } } },
    );

    rerender({ value: { a: 1, b: 2 } });

    expect(callback).toHaveBeenCalledWith({ b: 2 });
  });
});
