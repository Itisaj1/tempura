import emailjs from '@emailjs/browser';
import Lenis from 'lenis';
import {
  AnimatePresence,
  animate,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useInView,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import {CheckCircle2} from 'lucide-react';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type RefObject,
} from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1920 : window.innerWidth,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
};

const LOADER_REVEAL_DURATION = 1.15;
const LOADER_REVEAL_DELAY_MS = 750;

const LOADER_DOT_EM = 0.105;

const LUCIDE_ICON_SIZE = 24;
const DITHER_PATH_STEP = 3.5;
const DITHER_DOT_RADIUS = 1.85;

type DitherDot = readonly [number, number];

const LUCIDE_STROKE_PATHS = {
  arrow: ['M5 12h14', 'm12 5 7 7-7 7'],
  chevron: ['m9 18 6-6-6-6'],
} as const;

const sampleSegment = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  step: number,
): DitherDot[] => {
  const length = Math.hypot(x1 - x0, y1 - y0);
  if (length === 0) return [[x0, y0]];

  const count = Math.max(1, Math.ceil(length / step));
  const dots: DitherDot[] = [];
  for (let i = 0; i <= count; i += 1) {
    const t = i / count;
    dots.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
  }
  return dots;
};

const parsePathSegments = (variant: 'arrow' | 'chevron'): Array<readonly [number, number, number, number]> => {
  if (variant === 'arrow') {
    return [
      [5, 12, 19, 12],
      [12, 5, 19, 12],
      [19, 12, 12, 19],
    ];
  }
  return [[9, 18, 15, 12], [15, 12, 9, 6]];
};

const dedupeNearbyDots = (dots: DitherDot[], minDistance: number): DitherDot[] => {
  const merged: DitherDot[] = [];
  for (const dot of dots) {
    const isDuplicate = merged.some(
      ([x, y]) => Math.hypot(x - dot[0], y - dot[1]) < minDistance,
    );
    if (!isDuplicate) merged.push(dot);
  }
  return merged;
};

const sampleStrokeDots = (variant: 'arrow' | 'chevron'): ReadonlyArray<DitherDot> => {
  const centerline = parsePathSegments(variant).flatMap(([x0, y0, x1, y1]) =>
    sampleSegment(x0, y0, x1, y1, DITHER_PATH_STEP),
  );

  return dedupeNearbyDots(centerline, DITHER_PATH_STEP * 0.5).sort(
    (a, b) => a[0] - b[0] || a[1] - b[1],
  );
};

const LUCIDE_DITHER_DOTS: Record<'arrow' | 'chevron', ReadonlyArray<DitherDot>> = {
  arrow: sampleStrokeDots('arrow'),
  chevron: sampleStrokeDots('chevron'),
};

type DitherArrowIconProps = {
  className?: string;
  variant?: 'arrow' | 'chevron';
};

const DitherArrowIcon = ({className = 'h-4 w-4', variant = 'arrow'}: DitherArrowIconProps) => {
  const reduceMotion = useReducedMotion();
  const dots = LUCIDE_DITHER_DOTS[variant];
  const strokeFadeMs = reduceMotion ? 120 : 220;

  return (
    <span className={`relative inline-block shrink-0 ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${LUCIDE_ICON_SIZE} ${LUCIDE_ICON_SIZE}`}
        fill="none"
        className="pointer-events-none h-full w-full text-current"
        aria-hidden
      >
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100 transition-opacity ease-out group-hover:opacity-0"
          style={{transitionDuration: `${strokeFadeMs}ms`}}
        >
          {LUCIDE_STROKE_PATHS[variant].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g
          fill="currentColor"
          className="opacity-0 transition-opacity ease-out group-hover:opacity-100"
          style={{transitionDuration: `${strokeFadeMs}ms`}}
        >
          {dots.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={DITHER_DOT_RADIUS} />
          ))}
        </g>
      </svg>
    </span>
  );
};

const LoadingLogo = () => {
  const reduceMotion = useReducedMotion();
  const textRef = useRef<HTMLSpanElement | null>(null);
  const animatingRef = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const revealWidth = useMotionValue(0);
  const revealDot = useMotionValue(0);

  const clipPath = useTransform([progress, revealWidth], ([p, width]) => {
    const w = typeof width === 'number' ? width : 0;
    const clamped = Math.min(Math.max(p, 0), 1);
    return `inset(0 ${(1 - clamped) * w}px 0 0)`;
  });

  const dotX = useTransform([progress, revealWidth, revealDot], ([p, width, dot]) => {
    const w = typeof width === 'number' ? width : 0;
    const d = typeof dot === 'number' ? dot : 0;
    const clamped = Math.min(Math.max(p, 0), 1);
    // Keep the dot's trailing edge on the reveal line so it leads the curtain.
    return clamped * w - d;
  });

  const logoScale = useTransform(progress, [0, 0.2, 1], [0.94, 0.98, 1]);
  const washOpacity = useTransform(progress, [0, 0.45, 1], [0.42, 0.2, 0]);
  const washScale = useTransform(progress, [0, 1], [1.12, 1]);

  const measureLogo = () => {
    if (animatingRef.current) return;

    const textEl = textRef.current;
    const fontEl = textEl?.parentElement?.parentElement;
    if (!textEl || !fontEl) return;

    const fontSize = parseFloat(getComputedStyle(fontEl).fontSize);
    const width = textEl.offsetWidth;
    const dotDiameter = fontSize * LOADER_DOT_EM;

    if (width <= 0) return;

    revealWidth.set(width);
    revealDot.set(dotDiameter);
    setIsReady(true);
  };

  useLayoutEffect(() => {
    measureLogo();

    const textEl = textRef.current;
    const fontEl = textEl?.parentElement?.parentElement;
    const resizeObserver =
      fontEl && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measureLogo())
        : null;

    resizeObserver?.observe(fontEl);
    window.addEventListener('resize', measureLogo);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', measureLogo);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || !isReady) return;

    const start = window.setTimeout(() => {
      animatingRef.current = true;
      animate(progress, 1, {
        duration: LOADER_REVEAL_DURATION,
        ease: [0.22, 1, 0.36, 1],
      });
    }, LOADER_REVEAL_DELAY_MS);

    return () => window.clearTimeout(start);
  }, [isReady, progress, reduceMotion]);

  return (
    <div className="relative flex h-full min-h-[100svh] min-h-[100dvh] w-full items-center justify-center px-4 md:px-10">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 origin-center bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,rgba(242,196,206,0.55),transparent_68%)]"
        style={{opacity: washOpacity, scale: washScale}}
      />
      <motion.div
        style={{scale: logoScale}}
        className="relative z-10 flex justify-center"
      >
        <div className="relative inline-flex max-w-full items-center justify-center text-[clamp(2.75rem,11vw,6.75rem)] font-display font-bold leading-[0.9] tracking-tighter text-brand-ink">
          <motion.span style={{clipPath}} className="inline-block whitespace-nowrap will-change-[clip-path]">
            <span ref={textRef}>panko studio</span>
          </motion.span>
          <motion.span
            aria-hidden
            style={{
              x: dotX,
              width: revealDot,
              height: revealDot,
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-full bg-brand-shrimp will-change-transform"
          />
        </div>
      </motion.div>
    </div>
  );
};

const PRIMARY_CTA =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-transparent bg-brand-shrimp px-6 py-3 font-semibold text-brand-card transition-colors hover:bg-brand-shrimp/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-shrimp/45';

const OUTLINE_CTA =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-brand-shrimp bg-transparent px-6 py-3 font-semibold text-brand-shrimp transition-colors hover:bg-brand-shrimp/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-shrimp/45';

const NAV_CTA_BUTTON =
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-transparent bg-brand-shrimp px-3 py-1.5 text-xs font-semibold text-brand-page transition-colors hover:bg-brand-shrimp/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-shrimp/45 sm:px-5 sm:py-2 sm:text-sm';

const SECTION_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HERO_HEADLINE_CONTAINER: Variants = {
  hidden: {},
  visible: {
    transition: {staggerChildren: 0.09, delayChildren: 0.05},
  },
};

const HERO_HEADLINE_LINE: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.52, ease: SECTION_REVEAL_EASE},
  },
};

const ConversationalInput = ({
  className: inputClassName = '',
  tone = 'dark',
  onFocus,
  onBlur,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {tone?: 'dark' | 'light'}) => {
  const reduceMotion = useReducedMotion();
  const [focused, setFocused] = useState(false);

  return (
    <span className="relative inline-block min-w-0 flex-1">
      <input
        {...inputProps}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={`w-full border-b bg-transparent px-1 py-1 focus:outline-none disabled:opacity-60 ${
          tone === 'light'
            ? 'border-brand-shrimp/25 text-brand-ink placeholder:text-brand-ink/45'
            : 'border-brand-page/25 text-brand-page placeholder:text-brand-page/45'
        } ${inputClassName ?? ''}`}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-brand-shrimp"
        initial={false}
        animate={{scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0}}
        transition={{duration: reduceMotion ? 0 : 0.28, ease: 'easeOut'}}
      />
    </span>
  );
};

type ServiceTileVariant = 'accent' | 'light' | 'ink';
type ServiceDotPattern = 'ring' | 'bars' | 'diamond' | 'spread' | 'line' | 'hex';

const SERVICE_DOT_CELLS: Record<ServiceDotPattern, [number, number][]> = {
  ring: [
    [0, 0],
    [1, 0],
    [2, 0],
    [0, 1],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  bars: [
    [0, 0],
    [0, 1],
    [0, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  diamond: [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  spread: [
    [0, 0],
    [2, 0],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  line: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  hex: [
    [1, 0],
    [0, 1],
    [2, 1],
    [0, 2],
    [2, 2],
    [1, 2],
  ],
};

const HOW_WE_WORK_TILES: Array<{
  title: string;
  description: string;
  variant: ServiceTileVariant;
  pattern: ServiceDotPattern;
}> = [
  {
    title: 'AI features',
    description:
      'Flows and interfaces for AI-native products — clear states, trust, and handoffs between models and your team.',
    variant: 'accent',
    pattern: 'ring',
  },
  {
    title: 'UI design',
    description:
      'Screens and systems that match the decision at hand, from wireframes through polished UI ready for engineering.',
    variant: 'light',
    pattern: 'bars',
  },
  {
    title: 'User research & testing',
    description:
      'Lightweight research and validation so you ship with evidence, not assumptions, on tight timelines.',
    variant: 'ink',
    pattern: 'diamond',
  },
  {
    title: 'Prototyping',
    description:
      'Clickable prototypes to test ideas early — enough fidelity to learn, not so much that you stall.',
    variant: 'light',
    pattern: 'spread',
  },
  {
    title: 'Design systems',
    description:
      'Tokens, components, and documentation that keep product and marketing aligned as you scale.',
    variant: 'ink',
    pattern: 'line',
  },
  {
    title: 'UX design',
    description:
      'End-to-end journeys, information architecture, and interaction design for complex B2B workflows.',
    variant: 'light',
    pattern: 'hex',
  },
];

const ServiceDotMark = ({pattern, tone}: {pattern: ServiceDotPattern; tone: 'ink' | 'cream'}) => {
  const active = new Set(SERVICE_DOT_CELLS[pattern].map(([r, c]) => `${r}-${c}`));
  const dotClass = tone === 'ink' ? 'bg-brand-page' : 'bg-brand-ink';

  return (
    <div className="grid grid-cols-3 gap-[5px] w-fit" aria-hidden>
      {Array.from({length: 9}, (_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const on = active.has(`${row}-${col}`);
        return (
          <span
            key={i}
            className={`h-[7px] w-[7px] rounded-full ${on ? dotClass : 'bg-transparent'}`}
          />
        );
      })}
    </div>
  );
};

const ServiceFlipTile = ({
  title,
  description,
  variant,
  pattern,
}: (typeof HOW_WE_WORK_TILES)[number]) => {
  const frontStyles: Record<ServiceTileVariant, string> = {
    accent: 'bg-brand-blush border border-brand-blush text-brand-shrimp',
    light:
      'bg-brand-card border-[0.5px] border-brand-blush text-brand-ink transition-colors duration-150 ease-out hover:border-brand-shrimp hover:bg-brand-shrimp/[0.04]',
    ink:
      'bg-brand-card border-[0.5px] border-brand-blush text-brand-ink transition-colors duration-150 ease-out hover:border-brand-shrimp hover:bg-brand-shrimp/[0.04]',
  };
  const interactiveCard =
    variant !== 'accent'
      ? 'cursor-pointer transition-transform duration-150 ease-out hover:-translate-y-0.5'
      : '';
  const backStyles: Record<ServiceTileVariant, string> = {
    accent: 'bg-brand-ink text-brand-page border border-brand-page/20',
    light: 'bg-brand-ink text-brand-page border border-brand-page/20',
    ink: 'bg-brand-card text-brand-ink border border-brand-ink/10',
  };
  const dotTone = variant === 'ink' ? 'cream' : 'ink';

  return (
    <article
      tabIndex={0}
      className={`flip-card h-full min-h-[140px] w-full rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-shrimp/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-page ${interactiveCard}`}
      aria-label={`${title}. ${description}`}
    >
      <div className="flip-card-inner h-full w-full">
        <div className={`flip-card-face ${frontStyles[variant]}`}>
          <ServiceDotMark pattern={pattern} tone={dotTone} />
          <h4 className="font-display font-semibold text-lg tracking-tight leading-snug pr-2 sm:text-xl md:text-2xl">
            {title}
          </h4>
        </div>
        <div className={`flip-card-face flip-card-back justify-center ${backStyles[variant]}`}>
          <p className="text-base md:text-lg leading-relaxed opacity-95">{description}</p>
        </div>
      </div>
    </article>
  );
};

const ScrollRevealContext = createContext(false);

/** Fades/slides in when scrolled into view (after loader). Never re-runs on scroll-back. */
const SectionReveal = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const reduceMotion = useReducedMotion();
  const scrollRevealsEnabled = useContext(ScrollRevealContext);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.22,
    margin: '0px 0px -6% 0px',
  });
  const visible = reduceMotion || (scrollRevealsEnabled && isInView);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={visible ? {opacity: 1, y: 0} : {opacity: 0, y: 44}}
      transition={{
        duration: reduceMotion ? 0 : 0.95,
        ease: SECTION_REVEAL_EASE,
        delay: reduceMotion ? 0 : visible ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

const NAV_DOT_SPRING = {type: 'spring' as const, stiffness: 420, damping: 36, mass: 0.45};

const Navbar = ({
  dockProgress,
  activeSection,
}: {
  dockProgress: MotionValue<number>;
  activeSection: string;
}) => {
  const navItems = [
    {id: 'about', label: 'About'},
    {id: 'work', label: 'Work'},
    {id: 'pricing', label: 'Pricing'},
    {id: 'contact', label: 'Contact'},
  ];

  const vw = useWindowWidth();
  const dockedOffset = Math.max(24, (vw - 800) / 2);

  const smoothDockProgress = useSpring(dockProgress, {stiffness: 80, damping: 26, mass: 0.55});
  const top = useTransform(smoothDockProgress, [0, 1], ['0px', '10px']);
  const left = useTransform(smoothDockProgress, [0, 1], ['0px', `${dockedOffset}px`]);
  const right = useTransform(smoothDockProgress, [0, 1], ['0px', `${dockedOffset}px`]);
  const borderRadius = useTransform(smoothDockProgress, [0, 1], ['0px', '12px']);
  const shellShadow = useTransform(
    smoothDockProgress,
    [0, 0.6, 1],
    ['0px 0px 0px rgba(0,0,0,0)', '0px 8px 24px rgba(26,26,26,0.08)', '0px 12px 32px rgba(26,26,26,0.12)'],
  );
  const shellBg = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(253, 240, 243, 0)', 'rgba(255, 255, 255, 0.55)', 'rgba(255, 255, 255, 0.82)', 'rgba(255, 255, 255, 0.94)'],
  );
  const shellBorder = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(26, 26, 26, 0)', 'rgba(26, 26, 26, 0.06)', 'rgba(26, 26, 26, 0.1)', 'rgba(26, 26, 26, 0.14)'],
  );
  const shellBackdrop = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['blur(0px)', 'blur(4px)', 'blur(8px)', 'blur(10px)'],
  );

  const reduceMotion = useReducedMotion();

  return (
    <motion.nav
      aria-label="Primary"
      initial={reduceMotion ? {y: 0} : {y: -100}}
      animate={{y: 0}}
      transition={reduceMotion ? {duration: 0} : {type: 'spring', stiffness: 220, damping: 28}}
      style={{
        top,
        left,
        right,
        borderRadius,
        backgroundColor: shellBg,
        borderColor: shellBorder,
        boxShadow: shellShadow,
        backdropFilter: shellBackdrop,
        WebkitBackdropFilter: shellBackdrop,
      }}
      className="fixed z-50 flex flex-nowrap items-center gap-2 px-3 py-2 border border-brand-ink/12 sm:gap-3 sm:px-4 md:px-7 md:py-2.5"
    >
      <a
        href="#home"
        className="flex min-w-0 shrink-0 items-center gap-1.5 rounded-md text-base font-bold font-display tracking-tight text-brand-ink sm:gap-2 sm:text-lg md:text-xl"
        aria-current={activeSection === 'home' ? 'page' : undefined}
      >
        <span className="truncate">panko studio</span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-shrimp" aria-hidden />
      </a>

      <LayoutGroup id="nav-section-indicator">
        <ul className="hidden min-[720px]:flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs font-medium list-none p-0 m-0 ml-auto sm:gap-x-6 sm:text-sm xl:gap-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`nav-link inline-flex items-center gap-1.5 px-1 py-0.5 ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
                <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center" aria-hidden>
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-section-dot"
                      className="absolute inset-0 rounded-full bg-brand-shrimp"
                      transition={reduceMotion ? {duration: 0} : NAV_DOT_SPRING}
                    />
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </LayoutGroup>

      <motion.a
        whileHover={{y: -1}}
        whileTap={{scale: 0.98}}
        href="#contact"
        className={`shrink-0 ml-auto min-[720px]:ml-3 md:ml-4 ${NAV_CTA_BUTTON}`}
      >
        Let&apos;s chat
      </motion.a>
    </motion.nav>
  );
};

const Hero = ({heroRef}: {heroRef: RefObject<HTMLElement | null>}) => {
  const targetRef = heroRef;
  const reduceMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <section
      id="home"
      ref={targetRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col justify-end pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-16 px-4 sm:pb-20 sm:pt-24 md:px-10 lg:pb-28 xl:px-12 2xl:px-16 overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1840px]">
          <motion.div style={{opacity, y}} className="max-w-5xl text-left">
          <motion.h1
            id="hero-heading"
            variants={reduceMotion ? undefined : HERO_HEADLINE_CONTAINER}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{once: true, amount: 0.25}}
            className="mt-4 text-[clamp(2.5rem,10.5vw,5rem)] font-display font-bold leading-[0.92] tracking-tighter text-balance text-brand-ink sm:mt-6 sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <motion.span variants={reduceMotion ? undefined : HERO_HEADLINE_LINE} className="block">
              Design for startups
              <span className="text-brand-ink/65"> and</span>
            </motion.span>
            <motion.span variants={reduceMotion ? undefined : HERO_HEADLINE_LINE} className="block">
              scale-ups
              <motion.span
                className="text-brand-shrimp inline-block"
                initial={false}
                animate={reduceMotion ? {scale: 1} : {scale: [1, 1.18, 1]}}
                transition={
                  reduceMotion ? {duration: 0} : {delay: 0.72, duration: 0.5, ease: 'easeOut'}
                }
                aria-hidden
              >
                .
              </motion.span>
            </motion.span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={
              reduceMotion ? {duration: 0} : {delay: 0.28, duration: 0.48, ease: SECTION_REVEAL_EASE}
            }
            className="mt-5 text-lg text-brand-ink/65 max-w-2xl leading-relaxed sm:mt-6 sm:text-xl md:text-2xl"
          >
            Product management and design for ambitious AI x B2B teams.
          </motion.p>

          <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
            <motion.a
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
              href="#contact"
              className={`group ${PRIMARY_CTA}`}
            >
              <span className="text-base font-semibold">Let&apos;s chat</span>
              <span className="ml-1 text-brand-card/70 transition-colors group-hover:text-brand-card" aria-hidden>
                <DitherArrowIcon />
              </span>
            </motion.a>

            <motion.a
              whileHover={{x: 4}}
              href="#work"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-brand-shrimp px-4 py-2.5 text-sm font-semibold text-brand-shrimp bg-transparent transition-colors hover:bg-brand-shrimp/[0.04]"
            >
              View selected work
              <DitherArrowIcon variant="chevron" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative pt-0 pb-16 px-4 sm:pb-20 md:px-10 md:pb-28 lg:pb-32 xl:px-12 2xl:px-16 bg-brand-page overflow-hidden">
      <div className="relative z-10 max-w-[1840px] mx-auto">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2
              id="about-heading"
              className="about-heading text-[clamp(2rem,7vw,3.75rem)] font-display font-bold leading-tight tracking-tighter text-balance mb-5 md:text-6xl"
            >
              <span className="text-brand-ink/62">Product management and design</span>{' '}
              <span className="text-brand-ink">for</span> AI x B2B teams.
            </h2>
            <p className="about-body text-lg md:text-xl text-brand-ink leading-[1.7] mb-7">
              Senior product talent from wireframe to release — alongside your engineers, for AI-native and B2B teams
              that need clear decisions, honest handoffs, and design that ships.
            </p>

            <motion.a
              whileHover={{y: -1}}
              href="#contact"
              className={`about-cta group mt-0 ${PRIMARY_CTA}`}
            >
              Let&apos;s chat
              <DitherArrowIcon />
            </motion.a>
          </div>
        </SectionReveal>

        <SectionReveal className="mt-16 md:mt-24 lg:mt-28" delay={0.1}>
          <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 xl:gap-6">
            {HOW_WE_WORK_TILES.map((tile) => (
              <ServiceFlipTile key={tile.title} {...tile} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const CTA = () => {
  const topics = ['Web app', 'Mobile app', 'Website'] as const;
  type Topic = (typeof topics)[number];

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const clearErrorOnEdit = () => {
    if (formStatus === 'error') {
      setFormStatus('idle');
      setErrorMessage('');
    }
  };

  const toggleTopic = (t: Topic) => {
    setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    clearErrorOnEdit();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'loading') return;

    const trimmedName = fullName.trim();
    const trimmedCompany = company.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail || selectedTopics.length === 0) {
      setErrorMessage('Please fill in your name, company, email, and pick at least one focus area.');
      setFormStatus('error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const notifyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_TO_ME as string | undefined;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTO_REPLY as
      | string
      | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    if (!serviceId || !notifyTemplateId || !autoReplyTemplateId || !publicKey) {
      setErrorMessage('Email service is not configured. Please try again later.');
      setFormStatus('error');
      return;
    }

    const topicsString = selectedTopics.join(', ');

    const templateParams = {
      fullName: trimmedName,
      company: trimmedCompany,
      email: trimmedEmail,
      topics: topicsString,
    };

    setFormStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.send(serviceId, notifyTemplateId, templateParams, {publicKey});

      emailjs.send(serviceId, autoReplyTemplateId, templateParams, {publicKey}).catch((err) => {
        console.warn('Auto-reply email failed (notification was delivered).', err);
      });

      setSubmittedName(trimmedName);
      setFormStatus('success');
    } catch (err) {
      console.error('EmailJS notification failed', err);
      setErrorMessage(
        'Something went wrong sending your message. Please try again or email us directly.',
      );
      setFormStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="collaborate-section relative flex min-h-0 items-center overflow-hidden px-4 py-16 text-brand-ink sm:py-20 md:min-h-[85vh] md:px-10 md:py-24 xl:px-12 2xl:px-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="px-1 py-4 md:px-0 md:py-6">
          <SectionReveal>
            <AnimatePresence mode="wait" initial={false}>
            {formStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{opacity: 0, y: 16}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -16}}
                transition={{duration: 0.45, ease: 'easeOut'}}
                role="status"
                aria-live="polite"
                className="py-10 md:py-12 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{scale: 0.6, opacity: 0}}
                  animate={{scale: 1, opacity: 1}}
                  transition={{delay: 0.1, type: 'spring', stiffness: 220, damping: 18}}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-shrimp/15 text-brand-shrimp mb-6"
                >
                  <CheckCircle2 className="h-8 w-8" strokeWidth={2.25} />
                </motion.div>
                <h2 className="text-3xl font-display font-bold tracking-tight text-balance mb-4 text-brand-ink sm:text-4xl md:text-6xl">
                  Thank you, {submittedName}
                  <span className="text-brand-shrimp">.</span>
                </h2>
                <p className="text-lg md:text-xl text-brand-ink/85 max-w-xl leading-relaxed">
                  We&apos;ve got your note and a confirmation on the way to{' '}
                  <span className="text-brand-ink">{email.trim()}</span>. We&apos;ll be in touch
                  shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={false}
                exit={{opacity: 0, y: -8}}
                transition={{duration: 0.35, ease: 'easeOut'}}
                aria-labelledby="contact-heading"
              >
                <h2
                  id="contact-heading"
                  className="text-3xl font-display font-bold tracking-tight text-balance mb-8 text-brand-ink sm:mb-10 sm:text-4xl md:text-6xl"
                >
                  Let&apos;s collaborate
                  <span className="text-brand-shrimp">.</span>
                </h2>

                <div className="space-y-6 text-base md:text-lg text-brand-ink/90 leading-relaxed">
                  <div className="group/field flex flex-wrap items-end gap-x-2 gap-y-3">
                    <label
                      htmlFor="contact-fullName"
                      className="text-brand-ink/85 transition-colors duration-200 group-focus-within/field:text-brand-ink"
                    >
                      My name is
                    </label>
                    <ConversationalInput
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      tone="light"
                      autoComplete="name"
                      required
                      aria-required="true"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        clearErrorOnEdit();
                      }}
                      placeholder="first & last name"
                      disabled={formStatus === 'loading'}
                      className="min-w-0 w-full max-w-full flex-1 sm:min-w-[12rem] sm:w-auto sm:max-w-none"
                    />
                    <label
                      htmlFor="contact-company"
                      className="text-brand-ink/85 transition-colors duration-200 group-focus-within/field:text-brand-ink"
                    >
                      from
                    </label>
                    <ConversationalInput
                      id="contact-company"
                      name="company"
                      type="text"
                      tone="light"
                      autoComplete="organization"
                      required
                      aria-required="true"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                        clearErrorOnEdit();
                      }}
                      placeholder="company name"
                      disabled={formStatus === 'loading'}
                      className="min-w-0 w-full max-w-full flex-1 sm:min-w-[10rem] sm:w-auto sm:max-w-none"
                    />
                  </div>

                  <fieldset className="flex w-full flex-wrap items-center gap-x-2 gap-y-2 border-0 p-0">
                    <legend className="mb-1 w-full text-brand-ink/85 sm:mb-0 sm:mr-1 sm:w-auto sm:inline">
                      I want to chat about designs for my (pick at least one)
                    </legend>
                    {topics.map((t) => {
                      const selected = selectedTopics.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={selected}
                          aria-label={`Topic: ${t}`}
                          onClick={() => toggleTopic(t)}
                          disabled={formStatus === 'loading'}
                          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                            selected
                              ? 'border-brand-shrimp bg-brand-shrimp/22 text-brand-ink'
                              : 'border-brand-ink/20 bg-brand-ink/[0.06] text-brand-ink/78 hover:border-brand-ink/30 hover:bg-brand-ink/10'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </fieldset>

                  <div className="group/field flex flex-wrap items-end gap-x-2 gap-y-3">
                    <label
                      htmlFor="contact-email"
                      className="text-brand-ink/85 transition-colors duration-200 group-focus-within/field:text-brand-ink"
                    >
                      You can reach me at
                    </label>
                    <ConversationalInput
                      id="contact-email"
                      name="email"
                      type="email"
                      tone="light"
                      autoComplete="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearErrorOnEdit();
                      }}
                      placeholder="email address"
                      disabled={formStatus === 'loading'}
                      className="min-w-0 w-full max-w-full flex-1 sm:min-w-[14rem] sm:w-auto sm:max-w-none"
                    />
                  </div>
                </div>

                <input type="hidden" name="topics" value={selectedTopics.join(', ')} />

                <AnimatePresence>
                  {formStatus === 'error' && errorMessage && (
                    <motion.p
                      key="error"
                      initial={{opacity: 0, y: -4}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -4}}
                      transition={{duration: 0.2}}
                      role="alert"
                      className="mt-6 text-sm text-rose-300/90"
                    >
                      {errorMessage}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  whileHover={formStatus === 'loading' ? undefined : {y: -1}}
                  whileTap={formStatus === 'loading' ? undefined : {scale: 0.98}}
                  className={`group mt-10 ${PRIMARY_CTA} disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-brand-shrimp disabled:hover:text-brand-card`}
                >
                  <span className="text-base font-semibold">
                    {formStatus === 'loading' ? 'Sending…' : 'Submit'}
                  </span>
                  {formStatus === 'loading' ? (
                    <motion.span
                      aria-hidden
                      animate={{rotate: 360}}
                      transition={{duration: 0.9, repeat: Infinity, ease: 'linear'}}
                      className="ml-1 h-4 w-4 rounded-full border-2 border-brand-card/35 border-t-brand-card"
                    />
                  ) : (
                    <DitherArrowIcon className="ml-1 h-4 w-4 text-brand-card/70 transition-colors group-hover:text-brand-card" />
                  )}
                </motion.button>
              </motion.form>
            )}
            </AnimatePresence>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t-[3px] border-brand-shrimp bg-brand-ink text-brand-page" aria-label="Site footer">
      <div className="relative z-10 max-w-[1840px] mx-auto px-4 md:px-10 xl:px-12 2xl:px-16 pt-12 pb-10 sm:pt-16 sm:pb-12 md:pt-20 md:pb-14">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="font-display font-bold tracking-tighter leading-[0.85] text-[clamp(2.75rem,12vw,14rem)] text-brand-card">
              panko studio
            </div>
            <div className="grid w-full max-w-md grid-cols-2 gap-x-8 gap-y-3 text-base font-display font-medium text-brand-page/88 sm:max-w-none sm:text-lg md:gap-x-16 md:text-2xl lg:text-3xl">
              <a href="#about" className="transition-colors hover:text-brand-card">
                About
              </a>
              <a href="#work" className="transition-colors hover:text-brand-card">
                Work
              </a>
              <a href="#pricing" className="transition-colors hover:text-brand-card">
                Pricing
              </a>
              <a href="#contact" className="transition-colors hover:text-brand-card">
                Contact
              </a>
              <a
                href="https://www.linkedin.com/in/ahania/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="transition-colors hover:text-brand-card"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-4 border-t border-brand-page/18 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-brand-page/55">
              <a href="/privacy" className="transition-colors hover:text-brand-card">Privacy</a>
              <a href="/terms" className="transition-colors hover:text-brand-card">Terms</a>
              <a href="/cookies" className="transition-colors hover:text-brand-card">Cookies</a>
            </nav>
            <p className="text-sm text-brand-page/55">© {new Date().getFullYear()} Panko Studio</p>
          </div>
      </div>
    </footer>
  );
};

const Projects = () => {
  const projects: Array<{
    id: number;
    title: string;
    subtitle: string;
    href?: string;
    external?: boolean;
    placeholder?: boolean;
    previewImage?: string;
    previewImageAlt?: string;
    tag?: string;
  }> = [
    {
      id: 1,
      title: 'FUEL Coworking',
      subtitle: 'Website',
      href: 'https://www.fuelcoworking.com/',
      external: true,
      previewImage: '/work/fuel-coworking-preview.jpg',
      previewImageAlt: 'FUEL Coworking website homepage preview',
      tag: 'Web design',
    },
    {id: 2, title: 'Project', subtitle: 'Coming soon', placeholder: true},
    {id: 3, title: 'Project', subtitle: 'Coming soon', placeholder: true},
    {id: 4, title: 'Project', subtitle: 'Coming soon', placeholder: true},
  ];

  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-14 px-4 sm:py-16 md:px-10 md:py-20 xl:px-12 2xl:px-16 bg-brand-page overflow-hidden">
      <div className="relative z-10 max-w-[1840px] mx-auto">
        <SectionReveal>
          <div className="mb-10">
            <h2 id="work-heading" className="text-3xl font-display font-bold tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
              Selected work.
            </h2>
          </div>

          <div className="work-grid grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            {projects.map((project) => {
              const card = (
                <>
                  <div
                    className={`work-card-image relative aspect-[4/3] w-full overflow-hidden rounded-md rounded-br-xl border border-brand-ink/10 transition-colors duration-150 ease-out group-hover:bg-brand-shrimp/[0.04] ${
                      project.placeholder ? 'work-card-placeholder' : 'bg-brand-card'
                    }`}
                  >
                    {project.tag ? (
                      <span className="absolute top-3 right-3 z-10 rounded-sm border border-brand-ink/10 bg-brand-card/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-ink shadow-sm shadow-[rgba(26,26,26,0.08)]">
                        {project.tag}
                      </span>
                    ) : null}
                    {project.previewImage ? (
                      <img
                        src={project.previewImage}
                        alt={project.previewImageAlt ?? `${project.title} preview`}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {project.placeholder ? (
                          <div className="rounded-sm border border-brand-ink/10 bg-brand-card/92 px-5 py-3 text-sm font-medium text-brand-ink/82 shadow-sm shadow-[rgba(26,26,26,0.08)]">
                            Case study placeholder
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex items-center justify-between px-2">
                    <div>
                      <h3 className="text-xl font-bold font-display text-brand-ink">{project.title}</h3>
                      <p className="text-sm font-medium text-brand-shrimp">{project.subtitle}</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-ink/10 bg-brand-card text-brand-ink/75 transition-colors group-hover:border-brand-shrimp/45 group-hover:bg-brand-shrimp/15 group-hover:text-brand-shrimp">
                      <DitherArrowIcon className="h-5 w-5" />
                    </div>
                  </div>
                </>
              );

              if (project.href) {
                return (
                  <a
                    key={project.id}
                    href={project.href}
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noopener noreferrer' : undefined}
                    aria-label={`${project.title} (opens in new tab)`}
                    className="group work-card block cursor-pointer transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5"
                  >
                    {card}
                  </a>
                );
              }

              return (
                <div
                  key={project.id}
                  className="group work-card cursor-pointer transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans: Array<{
    name: string;
    price: string;
    period: string;
    desc: string;
    intro?: string;
    features: string[];
    extra?: string;
    buttonLabel: string;
    buttonHref: string;
  }> = [
    {
      name: 'Subscribe',
      price: '$9,000',
      period: ' / month',
      desc: 'You need senior product design talent embedded in your team, on demand.',
      intro:
        'Submit requests through a shared board and our senior designers pick them up one by one, ready for dev hand-off.',
      features: [
        'UI & product design',
        'Design systems',
        'UX flows & wireframes',
        'Dev-ready hand-off',
        'Async, embedded in your rituals',
      ],
      extra:
        'We plug into your standups, critiques, and reviews, so design keeps pace with your roadmap instead of sitting in a queue.',
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
    {
      name: 'Fixed',
      price: 'Enquire',
      period: '',
      desc: 'Design your core product from the ground up in 6–8 weeks.',
      features: [
        'Wireframes & UX flows',
        'Design system',
        'High-fidelity UI',
        'Dev-ready prototypes',
      ],
      extra:
        'We start with research — competitor teardowns and user flows — before moving into high-fidelity design. Everything ships as an annotated, component-based system your engineers can build straight from.',
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
  ];

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative overflow-hidden border-t border-brand-ink/12 bg-brand-page px-4 py-14 sm:py-16 md:px-10 md:py-20 xl:px-12 2xl:px-16"
    >
      <div className="relative z-10 mx-auto max-w-[1840px]">
        <SectionReveal>
          <div className="mb-10 md:mb-12">
            <h2
              id="pricing-heading"
              className="text-3xl font-display font-bold tracking-tight text-brand-ink sm:text-4xl md:text-5xl"
            >
              Transparent investment.
            </h2>
          </div>

          <div className="grid w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
            {plans.map((plan, idx) => {
              const isSubscribe = plan.name === 'Subscribe';
              return (
                <motion.div
                  key={idx}
                  whileHover={isSubscribe ? {y: -3} : undefined}
                  className={`relative flex h-full min-h-0 flex-col rounded-md bg-brand-card p-5 shadow-[0_20px_64px_rgba(26,26,26,0.14)] backdrop-blur-sm transition-colors sm:min-h-[20rem] sm:p-6 md:min-h-[22rem] md:p-8 ${
                    isSubscribe
                      ? 'border-2 border-brand-shrimp'
                      : 'border-[0.5px] border-brand-blush'
                  }`}
                >
                  <div className="relative flex flex-1 flex-col">
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2 gap-y-3 sm:gap-3">
                      <h3 className="text-xl font-bold font-display text-brand-ink sm:text-2xl">{plan.name}</h3>
                      {isSubscribe && (
                        <span className="shrink-0 rounded-full bg-brand-blush px-[10px] py-[3px] text-[11px] font-semibold uppercase tracking-widest text-brand-shrimp">
                          Most popular
                        </span>
                      )}
                    </div>
                    <div className="mb-5 flex items-baseline gap-1">
                      <span className="text-3xl font-bold font-display md:text-4xl">{plan.price}</span>
                      <span className="font-medium text-brand-ink/60">{plan.period}</span>
                    </div>
                    <p className="mb-5 font-semibold leading-relaxed text-brand-ink/90">{plan.desc}</p>
                    {plan.intro ? (
                      <p className="mb-5 leading-relaxed text-brand-ink/85">{plan.intro}</p>
                    ) : null}
                    {plan.features.length > 0 && (
                      <ul className="mb-5 space-y-2.5">
                        {plan.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-sm font-medium text-brand-ink/85"
                          >
                            <div className="h-1.5 w-1.5 shrink-0 rounded-[1px] bg-brand-ink/80" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    {plan.extra && (
                      <p className="text-sm leading-relaxed text-brand-ink/68">{plan.extra}</p>
                    )}
                  </div>
                  <a
                    href={plan.buttonHref}
                    className={
                      isSubscribe
                        ? `relative mt-8 w-full max-w-none text-center ${PRIMARY_CTA} !w-full`
                        : `mt-8 w-full max-w-none text-center ${OUTLINE_CTA} !w-full`
                    }
                  >
                    {plan.buttonLabel}
                  </a>
                </motion.div>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

function MarketingSite() {
  const heroRef = useRef<HTMLElement | null>(null);
  const {scrollYProgress: dockProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const [activeSection, setActiveSection] = useState('home');
  const [showLoader, setShowLoader] = useState(true);
  const scrollRevealsEnabled = !showLoader;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'work', 'pricing', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = 'home';
      for (const section of sections) {
        if (marker >= section.offsetTop) current = section.id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);

    let unsubscribeLenis: (() => void) | undefined;
    let lenis: Lenis | null = null;

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({
        smoothWheel: true,
        lerp: 0.11,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        anchors: true,
        autoRaf: true,
      });
      lenisRef.current = lenis;
      unsubscribeLenis = lenis.on('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      unsubscribeLenis?.();
      lenisRef.current = null;
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 2900);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showLoader) return;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, {immediate: true});
  }, [showLoader]);

  return (
    <div className="min-h-screen overflow-x-clip selection:bg-brand-shrimp selection:text-brand-card">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar dockProgress={dockProgress} activeSection={activeSection} />
      <ScrollRevealContext.Provider value={scrollRevealsEnabled}>
        <main id="main-content" tabIndex={-1} inert={showLoader ? true : undefined}>
          <Hero heroRef={heroRef} />
          <About />
          <Projects />
          <Pricing />
          <CTA />
        </main>
      </ScrollRevealContext.Provider>
      <Footer />
      <motion.div
        initial={{opacity: 1}}
        animate={{opacity: showLoader ? 1 : 0}}
        transition={{duration: 0.45, ease: 'easeOut'}}
        role="status"
        aria-live="polite"
        aria-busy={showLoader}
        aria-hidden={!showLoader}
        aria-label="Loading site"
        className={`loader-shell fixed inset-0 z-[100] flex min-h-[100svh] min-h-[100dvh] w-full items-center justify-center ${
          showLoader ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <LoadingLogo />
      </motion.div>
    </div>
  );
}

import {getLegalPage} from './legal/router';

export default function App() {
  const LegalPage = getLegalPage(window.location.pathname);
  if (LegalPage) {
    return <LegalPage />;
  }
  return <MarketingSite />;
}
