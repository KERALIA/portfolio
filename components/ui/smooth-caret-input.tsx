'use client';

import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export type SmoothInputProps = ComponentPropsWithoutRef<'input'> & {
  wrapperClassName?: string;
  caretClassName?: string;
};

const PASSWORD_CHAR =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.match(/firefox|fxios/i)
    ? '\u25CF'
    : '\u2022';

export const SmoothInput = ({
  className,
  wrapperClassName,
  caretClassName,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyUp,
  onKeyDown,
  onSelect,
  onInput,
  type = 'text',
  placeholder,
  style,
  disabled,
  ...props
}: SmoothInputProps) => {
  // Seamlessly resolve email type to type="text" with inputMode="email" so standard selectionStart works without returning null
  const isEmail = type === 'email';
  const resolvedType = isEmail ? 'text' : type;
  const resolvedInputMode = isEmail ? (props.inputMode ?? 'email') : props.inputMode;
  const resolvedAutoCapitalize = isEmail ? (props.autoCapitalize ?? 'none') : props.autoCapitalize;
  const resolvedAutoCorrect = isEmail ? (props.autoCorrect ?? 'off') : props.autoCorrect;
  const resolvedSpellCheck = isEmail ? (props.spellCheck ?? false) : props.spellCheck;

  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const caretX = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;
  const inputValue = isControlled ? String(value) : internalValue;

  const springCaretX = useSpring(
    caretX,
    prefersReducedMotion
      ? { stiffness: 10000, damping: 100, mass: 0.1 }
      : { stiffness: 550, damping: 32, mass: 0.45 },
  );

  const syncMeasureSpan = () => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return;

    const styles = window.getComputedStyle(input);
    const isPassword = input.type === 'password';

    let fontSize = styles.fontSize;
    if (
      PASSWORD_CHAR === '\u2022' &&
      isPassword &&
      typeof navigator !== 'undefined' &&
      !navigator.userAgent.match(/chrome|chromium|crios/i)
    ) {
      fontSize = `${parseFloat(fontSize) + 6.25}px`;
    }

    measureSpan.style.font = `${styles.fontStyle} ${styles.fontWeight} ${fontSize} ${styles.fontFamily}`;
    measureSpan.style.letterSpacing = styles.letterSpacing;
    measureSpan.style.fontFeatureSettings = styles.fontFeatureSettings;
    measureSpan.style.fontVariationSettings = styles.fontVariationSettings;
  };

  const measurePrefixWidth = (text: string) => {
    const input = inputRef.current;
    const measureSpan = measureRef.current;
    if (!input || !measureSpan) return null;

    syncMeasureSpan();
    measureSpan.textContent = text;

    const paddingLeft =
      parseFloat(window.getComputedStyle(input).paddingLeft) || 0;

    return text.length > 0
      ? measureSpan.offsetWidth + paddingLeft
      : paddingLeft;
  };

  const scrollCaretIntoView = (
    target: HTMLInputElement,
    absoluteWidth: number,
  ) => {
    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
    const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
    const visibleLeft = target.scrollLeft + paddingLeft;

    if (absoluteWidth > visibleRight) {
      target.scrollLeft = Math.min(
        absoluteWidth - target.clientWidth + paddingRight,
        maxScroll,
      );
      return;
    }

    if (absoluteWidth < visibleLeft) {
      target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
    }
  };

  const getSelectionSafe = (target?: HTMLInputElement | null) => {
    let start = 0;
    let end = 0;
    let direction = 'forward';
    if (!target) {
      return { start: 0, end: 0, direction, hasSelection: false };
    }
    try {
      const s = target.selectionStart;
      const e = target.selectionEnd;
      if (typeof s === 'number') {
        start = s;
        end = typeof e === 'number' ? e : s;
      } else {
        const len = target.value ? target.value.length : 0;
        start = len;
        end = len;
      }
      direction = target.selectionDirection ?? 'forward';
    } catch {
      const len = target?.value ? target.value.length : 0;
      start = len;
      end = len;
    }
    return { start, end, direction, hasSelection: start !== end };
  };

  const updateCaretFromInput = (targetParam?: HTMLInputElement | null) => {
    const target = targetParam || inputRef.current;
    if (!target) return;
    const { start, end, direction, hasSelection } = getSelectionSafe(target);
    const caretIndex = direction === 'backward' ? start : end;
    const isPassword = target.type === 'password';
    const textBeforeCaret = isPassword
      ? PASSWORD_CHAR.repeat(caretIndex)
      : target.value.slice(0, caretIndex);

    const absoluteWidth = measurePrefixWidth(textBeforeCaret);
    if (absoluteWidth === null) return;

    scrollCaretIntoView(target, absoluteWidth);

    const styles = window.getComputedStyle(target);
    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const caretPosition = absoluteWidth - target.scrollLeft;
    const minX = paddingLeft;
    const maxX = target.clientWidth - paddingRight;

    caretX.set(Math.min(Math.max(caretPosition, minX), maxX));

    if (hasSelection || disabled) {
      caretOpacity.set(0);
      return;
    }

    caretOpacity.set(1);
  };

  const updateCaretRef = useRef(updateCaretFromInput);
  updateCaretRef.current = updateCaretFromInput;
  const caretOpacityRef = useRef(caretOpacity);
  caretOpacityRef.current = caretOpacity;

  useEffect(() => {
    const input = inputRef.current;
    if (input && document.activeElement === input) {
      updateCaretRef.current(input);
    }
  }, [inputValue]);

  useEffect(() => {
    const input = inputRef.current;
    const container = containerRef.current;
    if (!input || !container) return;

    const updateCaretIfFocused = () => {
      if (document.activeElement === input) {
        updateCaretRef.current(input);
      }
    };

    const handleSelectionChange = () => {
      if (document.activeElement !== input) return;
      requestAnimationFrame(() => {
        if (inputRef.current && document.activeElement === inputRef.current) {
          updateCaretRef.current(inputRef.current);
        }
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    if (typeof document.fonts !== 'undefined') {
      document.fonts.addEventListener('loadingdone', updateCaretIfFocused);
      void document.fonts.ready.then(updateCaretIfFocused);
    }
    input.addEventListener('scroll', updateCaretIfFocused);

    const resizeObserver = new ResizeObserver(updateCaretIfFocused);
    resizeObserver.observe(container);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (typeof document.fonts !== 'undefined') {
        document.fonts.removeEventListener('loadingdone', updateCaretIfFocused);
      }
      input.removeEventListener('scroll', updateCaretIfFocused);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex items-center w-full transition-all duration-200',
        wrapperClassName,
      )}
      style={{ caretColor: 'transparent' }}
    >
      <input
        {...props}
        ref={inputRef}
        type={resolvedType}
        inputMode={resolvedInputMode}
        autoCapitalize={resolvedAutoCapitalize}
        autoCorrect={resolvedAutoCorrect}
        spellCheck={resolvedSpellCheck}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] transition-colors',
          className,
        )}
        style={{ ...style, caretColor: 'transparent' }}
        value={inputValue}
        onFocus={(e) => {
          onFocus?.(e);
          requestAnimationFrame(() => {
            if (inputRef.current) updateCaretRef.current(inputRef.current);
          });
        }}
        onClick={(e) => {
          onClick?.(e);
          requestAnimationFrame(() => {
            if (inputRef.current) updateCaretRef.current(inputRef.current);
          });
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          if (inputRef.current) updateCaretRef.current(inputRef.current);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          requestAnimationFrame(() => {
            if (inputRef.current) updateCaretRef.current(inputRef.current);
          });
        }}
        onSelect={(e) => {
          onSelect?.(e);
          if (inputRef.current) updateCaretRef.current(inputRef.current);
        }}
        onInput={(e) => {
          onInput?.(e);
          requestAnimationFrame(() => {
            if (inputRef.current) updateCaretRef.current(inputRef.current);
          });
        }}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e);
          requestAnimationFrame(() => {
            if (inputRef.current) updateCaretRef.current(inputRef.current);
          });
        }}
        onBlur={(e) => {
          caretOpacityRef.current.set(0);
          onBlur?.(e);
        }}
      />
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 opacity-0 whitespace-pre -z-10"
      />
      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 h-[1.15em] w-[2px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]',
          caretClassName,
        )}
        style={{
          x: springCaretX,
          opacity: caretOpacity,
        }}
      />
    </div>
  );
};

export type SmoothTextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  wrapperClassName?: string;
  caretClassName?: string;
};

export const SmoothTextarea = ({
  className,
  wrapperClassName,
  caretClassName,
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  onClick,
  onKeyUp,
  onKeyDown,
  onSelect,
  placeholder,
  style,
  disabled,
  rows = 4,
  ...props
}: SmoothTextareaProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const caretX = useMotionValue(0);
  const caretY = useMotionValue(0);
  const caretOpacity = useMotionValue(0);
  const [caretHeight, setCaretHeight] = useState(20);

  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const beforeSpanRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const afterSpanRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isControlled = value !== undefined;
  const textareaValue = isControlled ? String(value) : internalValue;

  const springConfig = prefersReducedMotion
    ? { stiffness: 10000, damping: 100, mass: 0.1 }
    : { stiffness: 550, damping: 32, mass: 0.45 };

  const springCaretX = useSpring(caretX, springConfig);
  const springCaretY = useSpring(caretY, springConfig);

  const updateCaretFromTextarea = (targetParam?: HTMLTextAreaElement | null) => {
    const target = targetParam || textareaRef.current;
    if (!target) return;
    const mirror = mirrorRef.current;
    const beforeSpan = beforeSpanRef.current;
    const marker = markerRef.current;
    const afterSpan = afterSpanRef.current;
    if (!mirror || !beforeSpan || !marker || !afterSpan) return;

    const styles = window.getComputedStyle(target);
    mirror.style.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
    mirror.style.letterSpacing = styles.letterSpacing;
    mirror.style.lineHeight = styles.lineHeight;
    mirror.style.paddingTop = styles.paddingTop;
    mirror.style.paddingBottom = styles.paddingBottom;
    mirror.style.paddingLeft = styles.paddingLeft;
    mirror.style.paddingRight = styles.paddingRight;
    mirror.style.boxSizing = styles.boxSizing;
    mirror.style.width = `${target.clientWidth}px`;

    const parsedFontSize = parseFloat(styles.fontSize) || 15;
    const parsedLineHeight =
      parseFloat(styles.lineHeight) || parsedFontSize * 1.35;
    setCaretHeight(parsedLineHeight * 0.85);

    let selectionStart = 0;
    let selectionEnd = 0;
    try {
      const s = target.selectionStart;
      const e = target.selectionEnd;
      if (typeof s === 'number') {
        selectionStart = s;
        selectionEnd = typeof e === 'number' ? e : s;
      } else {
        const len = target.value ? target.value.length : 0;
        selectionStart = len;
        selectionEnd = len;
      }
    } catch {
      const len = target?.value ? target.value.length : 0;
      selectionStart = len;
      selectionEnd = len;
    }

    const hasSelection = selectionStart !== selectionEnd;
    const text = target.value;
    const textBefore = text.slice(0, selectionStart);
    const textAfter = text.slice(selectionEnd);

    beforeSpan.textContent = textBefore;
    afterSpan.textContent = textAfter;

    // Use getBoundingClientRect for absolute pixel precision against mirror top-left
    const markerRect = marker.getBoundingClientRect();
    const mirrorRect = mirror.getBoundingClientRect();

    const computedX = markerRect.left - mirrorRect.left;
    const computedY = markerRect.top - mirrorRect.top;

    const scrollAdjustedX = computedX - target.scrollLeft;
    const scrollAdjustedY = computedY - target.scrollTop;

    const paddingLeft = parseFloat(styles.paddingLeft) || 0;
    const paddingRight = parseFloat(styles.paddingRight) || 0;
    const paddingTop = parseFloat(styles.paddingTop) || 0;
    const paddingBottom = parseFloat(styles.paddingBottom) || 0;

    const minX = paddingLeft;
    const maxX = target.clientWidth - paddingRight;

    caretX.set(Math.min(Math.max(scrollAdjustedX, minX), maxX));
    caretY.set(scrollAdjustedY);

    const isVisible =
      scrollAdjustedY >= paddingTop - 5 &&
      scrollAdjustedY <= target.clientHeight - paddingBottom;

    if (!isVisible || hasSelection || disabled) {
      caretOpacity.set(0);
      return;
    }

    caretOpacity.set(1);
  };

  const updateCaretRef = useRef(updateCaretFromTextarea);
  updateCaretRef.current = updateCaretFromTextarea;
  const caretOpacityRef = useRef(caretOpacity);
  caretOpacityRef.current = caretOpacity;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && document.activeElement === textarea) {
      updateCaretRef.current(textarea);
    }
  }, [textareaValue]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const container = containerRef.current;
    if (!textarea || !container) return;

    const updateCaretIfFocused = () => {
      if (document.activeElement === textarea) {
        updateCaretRef.current(textarea);
      }
    };

    const handleSelectionChange = () => {
      if (document.activeElement !== textarea) return;
      requestAnimationFrame(() => {
        if (document.activeElement === textarea) {
          updateCaretRef.current(textarea);
        }
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    if (typeof document.fonts !== 'undefined') {
      document.fonts.addEventListener('loadingdone', updateCaretIfFocused);
      void document.fonts.ready.then(updateCaretIfFocused);
    }
    textarea.addEventListener('scroll', updateCaretIfFocused);

    const resizeObserver = new ResizeObserver(updateCaretIfFocused);
    resizeObserver.observe(container);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (typeof document.fonts !== 'undefined') {
        document.fonts.removeEventListener('loadingdone', updateCaretIfFocused);
      }
      textarea.removeEventListener('scroll', updateCaretIfFocused);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full transition-all duration-200', wrapperClassName)}
      style={{ caretColor: 'transparent' }}
    >
      <textarea
        {...props}
        ref={textareaRef}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'w-full bg-transparent outline-none placeholder:text-[var(--text-muted)] text-[var(--text-primary)] transition-colors',
          className,
        )}
        style={{ ...style, caretColor: 'transparent' }}
        value={textareaValue}
        onFocus={(e) => {
          onFocus?.(e);
          requestAnimationFrame(() => {
            if (textareaRef.current) updateCaretRef.current(textareaRef.current);
          });
        }}
        onClick={(e) => {
          onClick?.(e);
          requestAnimationFrame(() => {
            if (textareaRef.current) updateCaretRef.current(textareaRef.current);
          });
        }}
        onKeyUp={(e) => {
          onKeyUp?.(e);
          if (textareaRef.current) updateCaretRef.current(textareaRef.current);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          requestAnimationFrame(() => {
            if (textareaRef.current) updateCaretRef.current(textareaRef.current);
          });
        }}
        onSelect={(e) => {
          onSelect?.(e);
          if (textareaRef.current) updateCaretRef.current(textareaRef.current);
        }}
        onChange={(e) => {
          if (!isControlled) setInternalValue(e.target.value);
          onChange?.(e);
          requestAnimationFrame(() => {
            if (textareaRef.current) updateCaretRef.current(textareaRef.current);
          });
        }}
        onBlur={(e) => {
          caretOpacityRef.current.set(0);
          onBlur?.(e);
        }}
      />
      {/* Hidden Mirror Div for Textarea Caret Position Measurement */}
      <div
        ref={mirrorRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 opacity-0 -z-10 overflow-hidden"
        style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        <span ref={beforeSpanRef} />
        <span
          ref={markerRef}
          style={{ display: 'inline-block', width: 0, height: `${caretHeight}px` }}
        >
          &#8203;
        </span>
        <span ref={afterSpanRef} />
      </div>
      {/* 2D Spring Animated Caret */}
      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-0 left-0 w-[2px] rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]',
          caretClassName,
        )}
        style={{
          x: springCaretX,
          y: springCaretY,
          height: caretHeight,
          opacity: caretOpacity,
        }}
      />
    </div>
  );
};
