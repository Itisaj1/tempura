import emailjs from '@emailjs/browser';
import Lenis from 'lenis';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import {ArrowRight, CheckCircle2, ChevronRight} from 'lucide-react';
import {
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

const LOADER_REVEAL_DURATION = 0.95;
const LOADER_REVEAL_DELAY_MS = 1000;
const LOADER_DOT_DIAMETER = 10;

const LoadingLogo = () => {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [textWidth, setTextWidth] = useState(0);

  const progress = useMotionValue(0);
  const clipPath = useTransform(progress, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`);
  const dotX = useTransform(progress, (p) => textWidth * p - LOADER_DOT_DIAMETER / 2);

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (textWidth <= 0) return;
    const start = window.setTimeout(() => {
      animate(progress, 1, {
        duration: LOADER_REVEAL_DURATION,
        ease: [0.22, 1, 0.36, 1],
      });
    }, LOADER_REVEAL_DELAY_MS);
    return () => window.clearTimeout(start);
  }, [textWidth, progress]);

  return (
    <div className="relative inline-flex items-center text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-ink">
      <motion.span style={{clipPath}} className="inline-block whitespace-nowrap">
        <span ref={textRef}>panko studio</span>
      </motion.span>
      <motion.span
        aria-hidden
        style={{x: dotX, y: '-50%'}}
        className="absolute top-1/2 left-0 h-2.5 w-2.5 rounded-full bg-brand-shrimp"
      />
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

/** Fades/slides in the first time the block enters the viewport; never re-runs on scroll-back. */
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
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? {opacity: 1, y: 0} : {opacity: 0, y: 36}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.12, margin: '0px 0px -12% 0px'}}
      transition={{duration: reduceMotion ? 0 : 1.05, ease: SECTION_REVEAL_EASE, delay: reduceMotion ? 0 : delay}}
    >
      {children}
    </motion.div>
  );
};

const COUNT_UP_DURATION_MS = 1400;

const CountUp = ({
  value,
  suffix = '',
  className = 'text-3xl md:text-4xl font-bold font-display mb-1 text-brand-ink',
}: {
  value: number;
  suffix?: string;
  className?: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        const duration = COUNT_UP_DURATION_MS;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplayValue(Math.round(value * progress));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      {threshold: 0.45},
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div ref={ref} className={className}>
      {displayValue}
      {suffix}
    </div>
  );
};

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

      <ul className="hidden min-[720px]:flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs font-medium list-none p-0 m-0 ml-auto sm:gap-x-6 sm:text-sm xl:gap-x-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`nav-link inline-flex items-center gap-1.5 px-1 py-0.5 ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-shrimp" aria-hidden />
              )}
            </a>
          </li>
        ))}
      </ul>

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
      className="relative pt-[calc(5.5rem+env(safe-area-inset-top,0px))] pb-16 px-4 sm:pb-20 sm:pt-24 md:px-10 lg:pb-24 xl:px-12 2xl:px-16 overflow-hidden"
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
              <span className="ml-1 text-brand-card/70 group-hover:text-brand-card transition-colors" aria-hidden>
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
            </motion.a>

            <motion.a
              whileHover={{x: 4}}
              href="#work"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-brand-shrimp px-4 py-2.5 text-sm font-semibold text-brand-shrimp bg-transparent transition-colors hover:bg-brand-shrimp/[0.04]"
            >
              View selected work
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
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
          <div className="mb-10 md:mb-14">
            <p className="section-label">About</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            <div>
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
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            <div className="space-y-0 lg:pt-2">
              {[
                { label: 12, sub: 'happy teams across the globe', suffix: '' },
                { label: 7, sub: 'years of combined expertise', suffix: '' },
                { label: 4, sub: 'week cycles from brief to first build', suffix: '' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  role="group"
                  aria-label={`${stat.label}${stat.suffix} ${stat.sub}`}
                  className="mb-6 border-l-2 border-brand-shrimp pl-4 last:mb-0"
                >
                  <CountUp
                    value={stat.label}
                    suffix={stat.suffix}
                    className="mb-1 text-3xl font-semibold leading-none text-brand-ink sm:text-[32px]"
                  />
                  <p className="text-[13px] text-brand-ink/60">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 md:mt-24 lg:mt-28">
            <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 xl:gap-6">
              {HOW_WE_WORK_TILES.map((tile) => (
                <ServiceFlipTile key={tile.title} {...tile} />
              ))}
            </div>
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
                    <ArrowRight className="ml-1 h-4 w-4 text-brand-card/70 transition-colors group-hover:text-brand-card" />
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
  const placeholders = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

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
            {placeholders.map((tile) => (
              <div
                key={tile.id}
                className="group work-card cursor-pointer transition-[transform,background-color] duration-150 ease-out hover:-translate-y-0.5"
              >
                <div className="work-card-placeholder work-card-image relative aspect-[4/3] w-full overflow-hidden rounded-md rounded-br-xl border border-brand-ink/10 transition-colors duration-150 ease-out group-hover:bg-brand-shrimp/[0.04]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-sm border border-brand-ink/10 bg-brand-card/92 px-5 py-3 text-sm font-medium text-brand-ink/82 shadow-sm shadow-[rgba(26,26,26,0.08)]">
                      Case study placeholder
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-xl font-bold font-display text-brand-ink">Project</h3>
                    <p className="text-sm font-medium text-brand-shrimp">Coming soon</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-ink/10 bg-brand-card text-brand-ink/75 transition-colors group-hover:border-brand-shrimp/45 group-hover:bg-brand-shrimp/15 group-hover:text-brand-shrimp">
                    <ArrowRight className="arrow-icon h-5 w-5 transition-transform duration-150 ease-out group-hover:translate-x-[3px]" />
                  </div>
                </div>
              </div>
            ))}
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
    features: string[];
    extra?: string;
    buttonLabel: string;
    buttonHref: string;
  }> = [
    {
      name: 'Subscribe',
      price: '$18,000',
      period: ' / month',
      desc: 'Work with us on an ongoing basis.',
      features: [],
      extra:
        'Share your requirements on a Notion card, & senior designers will deliver high-quality designs, one by one. This could be a product design, graphics for marketing, email banners, or wireframes — anything goes so long as you can explain it in a card.',
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
    {
      name: 'Fixed',
      price: '$7,500',
      period: ' / project',
      desc: 'Design your core product from scratch in 6-8 weeks.',
      features: ['Design System', 'Landing Page', 'Web/Mobile Product Designs', 'Slide Deck'],
      extra:
        "A designer's final product is only as good as the inputs provided. We'll provide templates for quality moodboards, requirements documents, UX flow diagrams & wireframes with workshops included.",
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
            <p className="section-label">Pricing</p>
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
      unsubscribeLenis = lenis.on('scroll', onScroll);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      unsubscribeLenis?.();
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 2600);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip selection:bg-brand-shrimp selection:text-brand-card">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar dockProgress={dockProgress} activeSection={activeSection} />
      <main id="main-content" tabIndex={-1} inert={showLoader ? true : undefined}>
        <Hero heroRef={heroRef} />
        <About />
        <Projects />
        <Pricing />
        <CTA />
      </main>
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
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-page ${
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
