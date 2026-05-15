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
import {ArrowRight, CheckCircle2, ChevronRight, Globe, Layers, Users} from 'lucide-react';
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
    <div className="relative inline-flex items-center text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-fg">
      <motion.span style={{clipPath}} className="inline-block whitespace-nowrap">
        <span ref={textRef}>panko studio</span>
      </motion.span>
      <motion.span
        aria-hidden
        style={{x: dotX, y: '-50%'}}
        className="absolute top-1/2 left-0 h-2.5 w-2.5 rounded-full bg-brand-accent"
      />
    </div>
  );
};

type AccentPreset = 'hero' | 'about' | 'work' | 'pricing' | 'contact' | 'footer';

/** Section atmosphere — dot grid + thin accent hairlines (no radial blur). */
const SectionAccent = ({preset}: {preset: AccentPreset}) => {
  const onInk = preset === 'contact' || preset === 'footer';
  const gridClass = onInk ? 'section-accent-grid-ink' : 'section-accent-grid';
  const lineClass = onInk ? 'bg-brand-accent/40' : 'bg-brand-accent/22';
  const line = `absolute ${lineClass}`;

  return (
    <>
      <div className={`absolute inset-0 opacity-[0.38] ${gridClass} section-accent-fade-b`} aria-hidden />
      {preset === 'hero' && (
        <>
          <div className={`${line} top-0 right-[10%] h-[min(38vh,300px)] w-px`} aria-hidden />
          <div className={`${line} top-[16%] right-[10%] h-px w-[min(26vw,220px)]`} aria-hidden />
          <div className={`${line} bottom-[20%] left-[5%] h-px w-[min(34vw,300px)]`} aria-hidden />
        </>
      )}
      {preset === 'about' && (
        <>
          <div className={`${line} top-[12%] left-0 h-px w-[min(42vw,360px)]`} aria-hidden />
          <div className={`${line} bottom-[18%] right-[8%] h-[min(28vh,220px)] w-px`} aria-hidden />
        </>
      )}
      {preset === 'work' && (
        <div className={`${line} top-[8%] right-0 h-px w-[min(48vw,420px)]`} aria-hidden />
      )}
      {preset === 'pricing' && (
        <div className={`${line} bottom-[14%] left-[6%] h-px w-[min(40vw,340px)]`} aria-hidden />
      )}
      {preset === 'contact' && (
        <>
          <div className={`${line} top-0 left-[12%] h-[min(32vh,260px)] w-px`} aria-hidden />
          <div className={`${line} top-[22%] left-[12%] h-px w-[min(30vw,240px)]`} aria-hidden />
          <div className={`absolute top-0 right-0 h-px w-[min(55vw,480px)] bg-brand-fg/10`} aria-hidden />
        </>
      )}
      {preset === 'footer' && (
        <>
          <div className={`${line} bottom-[28%] right-[14%] h-px w-[min(36vw,320px)]`} aria-hidden />
          <div className={`${line} top-[20%] left-[4%] h-[min(24vh,180px)] w-px`} aria-hidden />
        </>
      )}
    </>
  );
};

const CTA_BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-brand-fg/22 bg-brand-elevated px-6 py-3 font-semibold text-brand-fg transition-colors hover:bg-brand-fg hover:text-brand-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45';

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
  onFocus,
  onBlur,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement>) => {
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
        className={`w-full border-b border-white/25 bg-transparent px-1 py-1 text-white placeholder:text-white/35 focus:outline-none disabled:opacity-60 ${inputClassName ?? ''}`}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-brand-accent"
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
  const dotClass = tone === 'ink' ? 'bg-brand-fg' : 'bg-brand-cream';

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
    accent: 'bg-brand-accent/22 border border-brand-accent/40 text-brand-fg',
    light: 'bg-brand-surface border border-brand-fg/14 text-brand-fg',
    ink: 'bg-brand-elevated border border-brand-fg/18 text-brand-fg',
  };
  const backStyles: Record<ServiceTileVariant, string> = {
    accent: 'bg-brand-ink text-brand-cream border border-brand-fg/12',
    light: 'bg-brand-ink text-brand-cream border border-brand-fg/12',
    ink: 'bg-brand-surface text-brand-fg border border-brand-fg/14',
  };
  const dotTone = variant === 'ink' ? 'cream' : 'ink';

  return (
    <article
      tabIndex={0}
      className="flip-card aspect-[5/2] min-h-[88px] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
      aria-label={`${title}. ${description}`}
    >
      <div className="flip-card-inner h-full w-full">
        <div className={`flip-card-face ${frontStyles[variant]}`}>
          <ServiceDotMark pattern={pattern} tone={dotTone} />
          <h4 className="font-display font-semibold text-xl md:text-2xl tracking-tight leading-snug pr-2">
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

const CountUp = ({value, suffix = ''}: {value: number; suffix?: string}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);
        const duration = 650;
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
    <div ref={ref} className="text-3xl md:text-4xl font-bold font-display mb-1">
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
    ['0px 0px 0px rgba(0,0,0,0)', '0px 14px 40px rgba(0,0,0,0.28)', '0px 22px 60px rgba(0,0,0,0.42)'],
  );
  const shellBg = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(11, 16, 24, 0)', 'rgba(11, 16, 24, 0.55)', 'rgba(11, 16, 24, 0.82)', 'rgba(11, 16, 24, 0.94)'],
  );
  const shellBorder = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(235, 230, 222, 0)', 'rgba(235, 230, 222, 0.06)', 'rgba(235, 230, 222, 0.1)', 'rgba(235, 230, 222, 0.14)'],
  );
  const shellBackdrop = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['blur(0px)', 'blur(6px)', 'blur(14px)', 'blur(20px)'],
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
      className="fixed z-50 flex items-center px-4 md:px-7 py-2 border border-brand-fg/18"
    >
      <a
        href="#home"
        className="flex items-center gap-2 rounded-md text-lg md:text-xl font-bold font-display tracking-tight text-brand-fg"
        aria-current={activeSection === 'home' ? 'page' : undefined}
      >
        panko studio
        <span className="h-1.5 w-1.5 rounded-full bg-brand-accent motion-reduce:animate-none animate-pulse" aria-hidden />
      </a>

      <ul className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 sm:gap-x-6 text-xs sm:text-sm font-medium ml-auto text-brand-fg/88 list-none p-0 m-0">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'page' : undefined}
              className={`inline-flex items-center gap-2 rounded-md px-1 py-0.5 transition-all ${
                activeSection === item.id ? 'translate-x-1 text-brand-fg' : 'translate-x-0 hover:bg-brand-fg/[0.06]'
              }`}
            >
              <span
                aria-hidden
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  activeSection === item.id ? 'opacity-100 bg-brand-accent scale-100' : 'opacity-0 scale-0'
                }`}
              />
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <motion.a
        whileHover={{y: -1}}
        whileTap={{scale: 0.98}}
        href="#contact"
        className={`ml-3 md:ml-4 text-sm ${CTA_BUTTON_BASE} !py-2 !px-5`}
      >
        Book call
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
      className="relative pt-24 pb-14 px-4 md:px-10 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.2}}
        transition={{duration: 1.35, ease: 'easeOut'}}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <SectionAccent preset="hero" />
      </motion.div>
      <motion.div
        style={{opacity, y}}
        className="relative z-10 max-w-5xl mx-auto w-full"
      >
        <motion.div className="relative">
          <motion.h1
            id="hero-heading"
            variants={reduceMotion ? undefined : HERO_HEADLINE_CONTAINER}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{once: true, amount: 0.25}}
            className="mt-6 text-6xl md:text-8xl font-display font-bold leading-[0.92] tracking-tighter text-brand-fg"
          >
            <motion.span variants={reduceMotion ? undefined : HERO_HEADLINE_LINE} className="block">
              Design for startups
              <span className="text-brand-fg/45"> and</span>
            </motion.span>
            <motion.span variants={reduceMotion ? undefined : HERO_HEADLINE_LINE} className="block">
              scale-ups
              <motion.span
                className="text-brand-accent inline-block"
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
            className="mt-6 text-xl md:text-2xl text-brand-fg/78 max-w-2xl leading-relaxed"
          >
            Product management and design for ambitious AI x B2B teams.
          </motion.p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.a
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
              href="#contact"
              className={`group ${CTA_BUTTON_BASE}`}
            >
              <span className="text-base font-semibold">Let&apos;s chat</span>
              <span className="ml-1 text-brand-fg/42 group-hover:text-brand-bg/90 transition-colors" aria-hidden>
                <ArrowRight className="w-4 h-4" aria-hidden />
              </span>
            </motion.a>

            <motion.a
              whileHover={{x: 4}}
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-fg/62 hover:text-brand-fg/88 transition-colors"
            >
              View selected work
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-20 md:py-28 lg:py-32 px-4 md:px-10 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <SectionAccent preset="about" />
      </div>
      <div className="relative z-10 max-w-[1840px] mx-auto">
        <SectionReveal>
          <div className="mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-fg/60">About</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            <div>
              <h2 id="about-heading" className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tighter mb-6 md:mb-8">
                <span className="text-brand-fg/48">Product management and design</span>{' '}
                <span className="text-brand-fg">for</span> AI x B2B teams.
              </h2>
              <p className="text-lg md:text-xl text-brand-fg/75 leading-relaxed mb-10">
                Senior product talent from wireframe to release — alongside your engineers, for AI-native and B2B teams
                that need clear decisions, honest handoffs, and design that ships.
              </p>

              <motion.a whileHover={{y: -1}} href="#contact" className={`group ${CTA_BUTTON_BASE}`}>
                Book a call
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.a>
            </div>

            <div className="space-y-8 lg:space-y-10 lg:pt-2">
              {[
                { label: 12, sub: 'happy teams across the globe', icon: <Globe className="w-5 h-5" />, suffix: '' },
                { label: 7, sub: 'years of combined expertise', icon: <Users className="w-5 h-5" />, suffix: '' },
                { label: 4, sub: 'week cycles from brief to reviewable UI', icon: <Layers className="w-5 h-5" />, suffix: '' },
              ].map((stat, idx) => (
                <div key={idx}
                  role="group"
                  aria-label={`${stat.label}${stat.suffix} ${stat.sub}`}
                  className="flex items-start gap-5 pb-6 border-b border-brand-fg/15 last:border-0 last:pb-0">
                  <div className="mt-2 text-brand-fg/52" aria-hidden>{stat.icon}</div>
                  <div>
                    <CountUp value={stat.label} suffix={stat.suffix} />
                    <div className="text-brand-fg/68">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 md:mt-24 lg:mt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
      className="relative py-28 md:py-44 px-4 md:px-10 overflow-hidden bg-brand-ink text-white min-h-[85vh] flex items-center"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <SectionAccent preset="contact" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <div className="px-1 md:px-0 py-4 md:py-6">
          <SectionReveal>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55 mb-5 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden />
              Contact
            </div>

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
                  className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-brand-accent/15 text-brand-accent mb-6"
                >
                  <CheckCircle2 className="h-8 w-8" strokeWidth={2.25} />
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 text-white">
                  Thank you, {submittedName}
                  <span className="text-brand-accent">.</span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
                  We&apos;ve got your note and a confirmation on the way to{' '}
                  <span className="text-white/90">{email.trim()}</span>. We&apos;ll be in touch
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
                  className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-10 text-white"
                >
                  Let&apos;s collaborate
                  <span className="text-brand-accent">.</span>
                </h2>

                <div className="space-y-6 text-base md:text-lg text-white/85 leading-relaxed">
                  <div className="group/field flex flex-wrap items-end gap-x-2 gap-y-3">
                    <label
                      htmlFor="contact-fullName"
                      className="text-white/80 transition-colors duration-200 group-focus-within/field:text-white"
                    >
                      My name is
                    </label>
                    <ConversationalInput
                      id="contact-fullName"
                      name="fullName"
                      type="text"
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
                      className="min-w-[12rem]"
                    />
                    <label
                      htmlFor="contact-company"
                      className="text-white/80 transition-colors duration-200 group-focus-within/field:text-white"
                    >
                      from
                    </label>
                    <ConversationalInput
                      id="contact-company"
                      name="company"
                      type="text"
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
                      className="min-w-[10rem]"
                    />
                  </div>

                  <fieldset className="flex flex-wrap items-center gap-x-2 gap-y-2 border-0 p-0">
                    <legend className="text-white/80 mr-1 inline">
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
                              ? 'border-brand-accent bg-brand-accent/20 text-white'
                              : 'border-white/20 bg-white/[0.04] text-white/70 hover:border-white/35 hover:bg-white/[0.08]'
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
                      className="text-white/80 transition-colors duration-200 group-focus-within/field:text-white"
                    >
                      You can reach me at
                    </label>
                    <ConversationalInput
                      id="contact-email"
                      name="email"
                      type="email"
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
                      className="min-w-[14rem]"
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
                  className="group mt-10 inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-brand-cream px-6 py-3 font-semibold text-brand-ink transition-colors hover:border-transparent hover:bg-brand-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-brand-cream disabled:hover:text-brand-ink"
                >
                  <span className="text-base font-semibold">
                    {formStatus === 'loading' ? 'Sending…' : 'Submit'}
                  </span>
                  {formStatus === 'loading' ? (
                    <motion.span
                      aria-hidden
                      animate={{rotate: 360}}
                      transition={{duration: 0.9, repeat: Infinity, ease: 'linear'}}
                      className="ml-1 h-4 w-4 rounded-full border-2 border-brand-fg/30 border-t-brand-ink"
                    />
                  ) : (
                    <ArrowRight className="ml-1 h-4 w-4 text-brand-ink/40 transition-colors group-hover:text-white/85" />
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
    <footer className="relative bg-brand-ink text-white overflow-hidden" aria-label="Site footer">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <SectionAccent preset="footer" />
      </div>
      <div className="relative z-10 max-w-[1840px] mx-auto px-4 md:px-10 pt-20 pb-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="font-display font-bold tracking-tighter leading-[0.85] text-[clamp(4.5rem,13vw,14rem)] text-white">
              panko studio
            </div>
            <div className="grid grid-cols-2 gap-x-12 md:gap-x-16 gap-y-3 text-xl md:text-3xl font-display font-medium text-white/75">
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#work" className="hover:text-white transition-colors">
                Work
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-10 text-sm text-white/55 border-t border-white/10 pt-8">© 2026 Panko Studio</div>
      </div>
    </footer>
  );
};

const Projects = () => {
  const placeholders = [
    {id: 1, size: 'md:col-span-7', ratio: 'aspect-[16/9]'},
    {id: 2, size: 'md:col-span-5', ratio: 'aspect-[4/5]'},
    {id: 3, size: 'md:col-span-4', ratio: 'aspect-[4/5]'},
    {id: 4, size: 'md:col-span-8', ratio: 'aspect-[16/8.5]'},
  ];

  return (
    <section id="work" aria-labelledby="work-heading" className="relative py-16 md:py-20 px-4 md:px-10 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <SectionAccent preset="work" />
      </div>
      <div className="relative z-10 max-w-[1840px] mx-auto">
        <SectionReveal>
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-fg/60 mb-3 block">
              Selected Work
            </p>
            <h2 id="work-heading" className="text-3xl md:text-5xl font-display font-bold tracking-tight text-brand-fg">
              Crafting digital excellence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7">
            {placeholders.map((tile) => (
              <div key={tile.id} className={`group ${tile.size}`}>
                <div className={`relative ${tile.ratio} overflow-hidden rounded-md rounded-br-xl border border-brand-fg/14 bg-gradient-to-br from-brand-surface via-brand-elevated to-brand-accent/[0.18]`}>
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md rounded-br-xl" aria-hidden>
                    <div className="absolute top-0 left-0 h-9 w-px bg-brand-accent/35" />
                    <div className="absolute top-0 left-0 h-px w-9 bg-brand-accent/35" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-sm bg-brand-elevated/92 border border-brand-fg/14 px-5 py-3 text-sm font-medium text-brand-fg/68 backdrop-blur-md shadow-sm shadow-black/25">
                      Case study placeholder
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between px-2">
                  <div>
                    <h3 className="text-xl font-bold font-display text-brand-fg/90">Project</h3>
                    <p className="text-sm font-medium text-brand-fg/52">Coming soon</p>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-fg/12 bg-brand-fg/[0.08] text-brand-fg/55 transition-colors group-hover:border-brand-accent/35 group-hover:bg-brand-accent/15 group-hover:text-brand-accent">
                    <ArrowRight className="h-5 w-5" />
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
  const reduceMotion = useReducedMotion();
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
      name: 'Essential',
      price: '$18,000',
      period: ' / project',
      desc: 'Design your core product from scratch in 6-8 weeks.',
      features: ['Design System', 'Landing Page', 'Web/Mobile Product Designs', 'Slide Deck'],
      extra:
        "A designer's final product is only as good as the inputs provided. We'll provide templates for quality moodboards, requirements documents, UX flow diagrams & wireframes with workshops included.",
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
    {
      name: 'Subscribe',
      price: '$7,500',
      period: ' / month',
      desc: 'Work with us on an ongoing basis.',
      features: [],
      extra:
        'Share your requirements on a Notion card, & senior designers will deliver high-quality designs, one by one. This could be a product design, graphics for marketing, email banners, or wireframes — anything goes so long as you can explain it in a card.',
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
    {
      name: 'Custom',
      price: 'Per project',
      period: '',
      desc: 'Work with us on a specific project.',
      features: [
        'Landing Page Designs',
        'Landing Page Webflow Builds',
        'UX Diagrams',
        'Wireframes',
        'Marketing Collateral',
        'Low/High-Fidelity Prototypes',
      ],
      buttonLabel: 'Enquire',
      buttonHref: '#contact',
    },
  ];

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-16 md:py-20 px-4 md:px-10 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <SectionAccent preset="pricing" />
      </div>
      <div className="relative z-10 max-w-[1840px] mx-auto">
        <SectionReveal>
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-fg/60 mb-4 block">Pricing</p>
            <h2 id="pricing-heading" className="text-4xl md:text-5xl font-display font-bold tracking-tight text-brand-fg">
              Transparent investment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const featured = idx === 1;
            return (
              <motion.div
                key={idx}
                whileHover={{y: featured ? -6 : -3}}
                className={`relative p-8 flex flex-col justify-between border bg-brand-surface/95 backdrop-blur-sm shadow-[0_20px_64px_rgba(0,0,0,0.38)] transition-colors ${
                  featured
                    ? 'border-brand-accent/40 rounded-lg rounded-tl-2xl'
                    : 'border-brand-fg/16 rounded-md'
                }`}
              >
                {featured && (
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg rounded-tl-2xl"
                    aria-hidden
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/16 via-brand-accent/5 to-transparent" />
                    <motion.div
                      initial={reduceMotion ? false : {scaleX: 0, opacity: 0.35}}
                      whileInView={
                        reduceMotion ? {scaleX: 1, opacity: 1} : {scaleX: 1, opacity: [0.35, 1, 0.65, 1]}
                      }
                      viewport={{once: true, amount: 0.5}}
                      transition={{duration: 0.85, ease: SECTION_REVEAL_EASE}}
                      className="absolute top-0 left-0 right-0 h-[2px] origin-left bg-brand-accent section-accent-line-glow"
                    />
                    <motion.div
                      initial={reduceMotion ? false : {scaleY: 0, opacity: 0.4}}
                      whileInView={{scaleY: 1, opacity: 1}}
                      viewport={{once: true, amount: 0.5}}
                      transition={{delay: 0.1, duration: 0.45, ease: SECTION_REVEAL_EASE}}
                      className="absolute top-0 right-0 h-16 w-[2px] origin-top bg-brand-accent/55 section-accent-line-glow"
                    />
                  </div>
                )}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold font-display text-brand-fg">{plan.name}</h3>
                    {featured && (
                      <span className="text-[11px] font-semibold tracking-widest uppercase rounded-sm bg-brand-accent/15 px-2.5 py-1 text-brand-accent">
                        Most popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold font-display">{plan.price}</span>
                    <span className="font-medium text-brand-fg/50">{plan.period}</span>
                  </div>
                  <p className="mb-6 font-semibold leading-relaxed text-brand-fg/90">{plan.desc}</p>
                  {plan.features.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-medium text-brand-fg/85"
                        >
                          <div className="w-1.5 h-1.5 shrink-0 rounded-[1px] bg-brand-fg/80" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {plan.extra && (
                    <p className="mb-8 text-sm leading-relaxed text-brand-fg/68">
                      {plan.extra}
                    </p>
                  )}
                </div>
                <a
                  href={plan.buttonHref}
                  className={
                    featured
                      ? 'relative w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-fg hover:text-brand-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45'
                      : `w-full text-center ${CTA_BUTTON_BASE}`
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

export default function App() {
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
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-bg">
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
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg ${
          showLoader ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <LoadingLogo />
      </motion.div>
    </div>
  );
}
