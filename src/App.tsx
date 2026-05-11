import {animate, motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue} from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Users,
} from 'lucide-react';
import {useEffect, useLayoutEffect, useRef, useState, type RefObject} from 'react';

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
        style={{x: dotX, y: '-50%'}}
        className="absolute top-1/2 left-0 h-2.5 w-2.5 rounded-full bg-brand-accent"
      />
    </div>
  );
};

const CTA_BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full border border-brand-ink/20 bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45';

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
  const top = useTransform(smoothDockProgress, [0, 1], ['0px', '14px']);
  const left = useTransform(smoothDockProgress, [0, 1], ['0px', `${dockedOffset}px`]);
  const right = useTransform(smoothDockProgress, [0, 1], ['0px', `${dockedOffset}px`]);
  const borderRadius = useTransform(smoothDockProgress, [0, 1], ['0px', '20px']);
  const shellShadow = useTransform(
    smoothDockProgress,
    [0, 0.6, 1],
    ['0px 0px 0px rgba(15,23,42,0)', '0px 14px 40px rgba(15,23,42,0.08)', '0px 22px 60px rgba(15,23,42,0.14)'],
  );
  const shellBg = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.65)', 'rgba(255, 255, 255, 0.82)'],
  );
  const shellBorder = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['rgba(15, 23, 42, 0)', 'rgba(15, 23, 42, 0.03)', 'rgba(15, 23, 42, 0.09)', 'rgba(15, 23, 42, 0.12)'],
  );
  const shellBackdrop = useTransform(
    smoothDockProgress,
    [0, 0.25, 0.7, 1],
    ['blur(0px)', 'blur(6px)', 'blur(14px)', 'blur(20px)'],
  );

  return (
    <motion.nav
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{type: 'spring', stiffness: 220, damping: 28}}
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
      className="fixed z-50 flex items-center px-5 md:px-8 py-3 border"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold font-display tracking-tight">panko studio</span>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
      </div>

      <div className="hidden md:flex items-center gap-7 text-sm font-medium ml-auto text-brand-ink/80">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`inline-flex items-center gap-2 rounded-full px-1 py-0.5 transition-all ${
              activeSection === item.id ? 'translate-x-1 text-brand-ink' : 'translate-x-0 hover:bg-brand-ink/[0.04]'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                activeSection === item.id ? 'opacity-100 bg-brand-accent scale-100' : 'opacity-0 scale-0'
              }`}
            />
            {item.label}
          </a>
        ))}
      </div>

      <motion.a
        whileHover={{y: -1}}
        whileTap={{scale: 0.98}}
        href="#contact"
        className={`ml-4 text-sm ${CTA_BUTTON_BASE}`}
      >
        Book call
      </motion.a>
    </motion.nav>
  );
};

const Hero = ({heroRef}: {heroRef: RefObject<HTMLElement | null>}) => {
  const targetRef = heroRef;
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <section id="home" ref={targetRef} className="relative pt-28 pb-14 px-4 md:px-10 overflow-hidden min-h-screen flex flex-col justify-center">
      <motion.div
        initial={{opacity: 0, scale: 0.94}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1.4, ease: 'easeOut'}}
        className="pointer-events-none absolute -top-24 -left-24 hidden md:block h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle_at_38%_40%,rgba(0,129,167,0.42),rgba(0,129,167,0.18)_45%,transparent_72%)] blur-3xl"
      />
      <motion.div
        initial={{opacity: 0, scale: 0.94}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1.6, ease: 'easeOut', delay: 0.1}}
        className="pointer-events-none absolute -bottom-40 -right-32 hidden md:block h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,129,167,0.30),transparent_65%)] blur-3xl"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent" />
      <motion.div 
        style={{opacity, y}}
        className="relative max-w-5xl mx-auto w-full"
      >
        <motion.div
          initial={{opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, ease: 'easeOut'}}
          className="relative"
        >
          <h1 className="mt-6 text-6xl md:text-8xl font-display font-bold leading-[0.92] tracking-tighter">
            Design for startups
            <span className="text-brand-ink/25"> and</span>
            <br />
            scale-ups<span className="text-brand-accent">.</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-brand-ink/65 max-w-2xl leading-relaxed">
            Product management and design for ambitious AI x B2B teams.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.a
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
              href="#contact"
              className={`group ${CTA_BUTTON_BASE}`}
            >
              <span className="text-base font-semibold">Let&apos;s chat</span>
              <span className="ml-1 text-brand-ink/30 group-hover:text-white/80 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>

            <motion.a
              whileHover={{x: 4}}
              href="#work"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink/55 hover:text-brand-ink/80 transition-colors"
            >
              View selected work
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-16 md:py-20 px-4 md:px-10 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(750px_360px_at_95%_8%,rgba(0,129,167,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(550px_320px_at_-5%_85%,rgba(0,129,167,0.08),transparent_60%)]" />
      <div className="max-w-[1840px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">About</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tighter mb-6">
              <span className="text-brand-ink/30">Product management and design</span>{' '}
              <span className="text-brand-ink">for</span> AI x B2B teams.
            </h2>
            <p className="text-lg md:text-xl text-brand-ink/60 leading-relaxed mb-8">
              Senior product talent that drives design projects from wireframe to full release alongside your engineers.
            </p>
            
            <motion.a whileHover={{y: -1}} href="#contact" className={`group ${CTA_BUTTON_BASE}`}>
              Book a call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          </div>

          <div className="space-y-8">
            {[
              { label: 12, sub: "happy teams across the globe", icon: <Globe className="w-5 h-5" />, suffix: '' },
              { label: 7, sub: "years of combined expertise", icon: <Users className="w-5 h-5" />, suffix: '' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-5 pb-6"
              >
                <div className="mt-2 text-brand-ink/40">{stat.icon}</div>
                <div>
                  <CountUp value={stat.label} suffix={stat.suffix} />
                  <div className="text-brand-ink/60">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'Web app' | 'Mobile app' | 'Website' | null>(null);

  const topics = ['Web app', 'Mobile app', 'Website'] as const;

  const handleSubmit = () => {
    if (!fullName.trim() || !company.trim() || !email.trim() || !topic) {
      window.alert('Please fill in your name, company, email, and pick one focus area.');
      return;
    }
    window.alert(
      `Thanks, ${fullName.trim()}!\n\nWe’ll reach you at ${email.trim()} about ${topic} for ${company.trim()}.`,
    );
  };

  return (
    <section id="contact" className="relative py-28 md:py-44 px-4 md:px-10 overflow-hidden bg-brand-ink text-white min-h-[85vh] flex items-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_540px_at_85%_-15%,rgba(0,129,167,0.30),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_460px_at_-5%_110%,rgba(0,129,167,0.16),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/45 to-transparent" />
      <div className="relative max-w-3xl mx-auto">
        <div className="px-1 md:px-0 py-4 md:py-6">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/55 mb-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
            Contact
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-10 text-white">
            Let&apos;s collaborate
            <span className="text-brand-accent">.</span>
          </h2>

          <div className="space-y-6 text-base md:text-lg text-white/85 leading-relaxed">
            <div className="flex flex-wrap items-end gap-x-2 gap-y-3">
              <span className="text-white/65">My name is</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="first & last name"
                className="min-w-[12rem] flex-1 border-b border-white/25 bg-transparent px-1 py-1 text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
              />
              <span className="text-white/65">from</span>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="company name"
                className="min-w-[10rem] flex-1 border-b border-white/25 bg-transparent px-1 py-1 text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="text-white/65">I want to chat about designs for my</span>
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    topic === t
                      ? 'border-brand-accent bg-brand-accent/20 text-white'
                      : 'border-white/20 bg-white/[0.04] text-white/70 hover:border-white/35 hover:bg-white/[0.08]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-end gap-x-2 gap-y-3">
              <span className="text-white/65">You can reach me at</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address"
                className="min-w-[14rem] flex-1 border-b border-white/25 bg-transparent px-1 py-1 text-white placeholder:text-white/35 focus:border-brand-accent focus:outline-none"
              />
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleSubmit}
            whileHover={{y: -1}}
            whileTap={{scale: 0.98}}
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-brand-ink transition-colors hover:bg-brand-accent hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45"
          >
            <span className="text-base font-semibold">Submit</span>
            <ArrowRight className="ml-1 h-4 w-4 text-brand-ink/40 transition-colors group-hover:text-white/85" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="max-w-[1840px] mx-auto px-4 md:px-10 pt-20 pb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div className="font-display font-bold tracking-tighter leading-[0.85] text-[clamp(4.5rem,13vw,14rem)]">
            panko studio
          </div>
          <div className="grid grid-cols-2 gap-x-12 md:gap-x-16 gap-y-3 text-xl md:text-3xl font-display font-medium text-white/70">
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
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mt-10 text-sm text-white/45">© 2026 Panko Studio</div>
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
    <section id="work" className="py-16 md:py-20 px-4 md:px-10 bg-white">
      <div className="max-w-[1840px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-3 block">
            Selected Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-brand-ink">
            Crafting digital excellence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-7">
          {placeholders.map((tile, idx) => (
            <motion.div
              key={tile.id}
              initial={{opacity: 0, y: 18}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: idx * 0.06}}
              className={`group ${tile.size}`}
            >
              <div className={`relative ${tile.ratio} overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-bg via-white to-brand-accent/[0.10]`}>
                <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_0%,rgba(0,129,167,0.12),transparent_55%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl bg-white/70 px-5 py-3 text-sm font-medium text-brand-ink/55 backdrop-blur-md">
                    Case study placeholder
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between px-2">
                <div>
                  <h3 className="text-xl font-bold font-display text-brand-ink/80">Project</h3>
                  <p className="text-sm font-medium text-brand-ink/40">Coming soon</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-ink/[0.04] text-brand-ink/40 transition-colors group-hover:bg-brand-accent/15 group-hover:text-brand-accent">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
        'Share your requirements on a Trello card, & senior designers will deliver high-quality designs, one by one. This could be a product design, graphics for marketing, email banners, or wireframes — anything goes so long as you can explain it in a card.',
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
    <section id="pricing" className="relative py-16 md:py-20 px-4 md:px-10 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_420px_at_0%_100%,rgba(0,129,167,0.08),transparent_60%)]" />
      <div className="relative max-w-[1840px] mx-auto">
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Transparent investment.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => {
            const featured = idx === 1;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="relative p-8 rounded-[2rem] bg-brand-bg/90 shadow-[0_18px_60px_rgba(15,23,42,0.06)] flex flex-col justify-between backdrop-blur-sm"
              >
                {featured && (
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(420px_260px_at_85%_-10%,rgba(0,129,167,0.18),transparent_60%)]" />
                )}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold font-display">{plan.name}</h3>
                    {featured && (
                      <span className="text-[11px] font-semibold tracking-widest uppercase rounded-full bg-brand-accent/15 px-2.5 py-1 text-brand-accent">
                        Most popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold font-display">{plan.price}</span>
                    <span className="font-medium text-brand-ink/40">{plan.period}</span>
                  </div>
                  <p className="mb-6 font-semibold leading-relaxed text-brand-ink/85">{plan.desc}</p>
                  {plan.features.length > 0 && (
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-medium text-brand-ink/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  {plan.extra && (
                    <p className="mb-8 text-sm leading-relaxed text-brand-ink/60">
                      {plan.extra}
                    </p>
                  )}
                </div>
                <a
                  href={plan.buttonHref}
                  className={
                    featured
                      ? 'relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45'
                      : `w-full text-center ${CTA_BUTTON_BASE}`
                  }
                >
                  {plan.buttonLabel}
                </a>
              </motion.div>
            );
          })}
        </div>
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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowLoader(false), 2600);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-ink">
      <Navbar dockProgress={dockProgress} activeSection={activeSection} />
      <main>
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
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-white ${
          showLoader ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <LoadingLogo />
      </motion.div>
    </div>
  );
}
