import {motion, useScroll, useSpring, useTransform, type MotionValue} from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  Sparkle,
  Users,
} from 'lucide-react';
import {useEffect, useRef, useState, type RefObject} from 'react';

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
    {id: 'team', label: 'Team'},
    {id: 'contact', label: 'Contact'},
  ];

  const smoothDockProgress = useSpring(dockProgress, {stiffness: 180, damping: 32, mass: 0.28});
  const top = useTransform(smoothDockProgress, [0, 0.35, 1], ['0px', '12px', '14px']);
  const left = useTransform(smoothDockProgress, [0, 0.35, 1], ['0px', '28px', '120px']);
  const right = useTransform(smoothDockProgress, [0, 0.35, 1], ['0px', '28px', '120px']);
  const borderRadius = useTransform(smoothDockProgress, [0, 0.45, 1], ['0px', '18px', '20px']);
  const shellShadow = useTransform(
    smoothDockProgress,
    [0, 0.55, 1],
    ['0px 0px 0px rgba(15,23,42,0)', '0px 18px 50px rgba(15,23,42,0.10)', '0px 22px 60px rgba(15,23,42,0.14)'],
  );
  const shellBg = useTransform(
    smoothDockProgress,
    [0, 0.5, 1],
    ['rgba(247, 244, 239, 0.78)', 'rgba(255, 255, 255, 0.72)', 'rgba(255, 255, 255, 0.82)'],
  );
  const shellBorder = useTransform(
    smoothDockProgress,
    [0, 0.5, 1],
    ['rgba(15, 23, 42, 0.06)', 'rgba(15, 23, 42, 0.10)', 'rgba(15, 23, 42, 0.12)'],
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
      }}
      className="fixed z-50 flex items-center px-5 md:px-8 py-3 backdrop-blur-xl border"
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
    <section id="home" ref={targetRef} className="relative pt-28 pb-14 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col justify-center">
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
            Senior product managers and designers for ambitious AI x B2B teams.
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
    <section id="about" className="relative py-16 md:py-20 px-4 md:px-8 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(750px_360px_at_95%_8%,rgba(0,129,167,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(550px_320px_at_-5%_85%,rgba(0,129,167,0.08),transparent_60%)]" />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">About</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-14">
          <div>
            <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight tracking-tighter mb-6">
              <span className="text-brand-ink/30">Product managers & designers</span>{' '}
              <span className="text-brand-ink">for</span> AI x B2B teams.
            </h2>
            <p className="text-lg md:text-xl text-brand-ink/60 leading-relaxed mb-8">
              Senior product talent that drives design projects from wireframe to full release alongside your engineers.
            </p>
            
            <motion.a whileHover={{y: -1}} href="#contact" className={`group ${CTA_BUTTON_BASE}`}>
              Book a call
              <div className="w-8 h-8 rounded-full border border-brand-ink/25 group-hover:border-white/35 flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.a>
          </div>

          <div className="space-y-8">
            {[
              { label: 74, sub: "happy teams across the globe", icon: <Globe className="w-5 h-5" />, suffix: '' },
              { label: 12, sub: "years of combined expertise", icon: <Users className="w-5 h-5" />, suffix: '' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-5 pb-6 border-b border-brand-ink/5"
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
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden bg-brand-ink text-white">
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
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-14 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="text-sm text-white/55 max-w-sm leading-relaxed">
            Product & design for ambitious AI x B2B teams. Based everywhere, shipping fast.
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm font-medium text-white/70">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#team" className="hover:text-white transition-colors">
              Team
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
      </div>
      <div className="border-t border-white/10 px-4 md:px-8 pt-10 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="font-display font-bold tracking-tighter text-[clamp(3.5rem,12vw,9rem)] leading-[0.85]">
            <span className="inline-block">panko </span>
            <span className="inline-block">studio</span>
          </div>
          <div className="mt-6 text-sm text-white/45">© 2026 Panko Studio</div>
        </div>
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
    <section id="work" className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
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
              <div className={`relative ${tile.ratio} overflow-hidden rounded-[2rem] border border-brand-ink/10 bg-gradient-to-br from-brand-bg via-white to-brand-accent/[0.10]`}>
                <div className="absolute inset-0 bg-[radial-gradient(700px_420px_at_30%_0%,rgba(0,129,167,0.12),transparent_55%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-2xl border border-brand-ink/10 bg-white/70 px-5 py-3 text-sm font-medium text-brand-ink/55 backdrop-blur-md">
                    Case study placeholder
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between px-2">
                <div>
                  <h3 className="text-xl font-bold font-display text-brand-ink/80">Project</h3>
                  <p className="text-sm font-medium text-brand-ink/40">Coming soon</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-ink/10 bg-white/60 text-brand-ink/40 backdrop-blur-sm transition-colors group-hover:border-brand-accent/40 group-hover:text-brand-accent">
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

type PricingItem = {
  title: string;
  text: string;
  tags?: string[];
};

type PricingPlan = {
  summary: string;
  team: { label: string; count: number }[];
  items: PricingItem[];
};

const PRICING_PLANS: Record<'scaleups' | 'startups', PricingPlan> = {
  scaleups: {
    summary:
      "You've raised $50m+. You need a senior product designer in your triad to accelerate your roadmap.",
    team: [{ label: 'Design', count: 4 }],
    items: [
      {
        title: 'Rituals',
        text: "We embed into your product team's rituals. Anything from standup, design workshops, to test parties.",
      },
      {
        title: 'Wireframes',
        text:
          'This is a huge focus for us. We triangulate information from your brief, any user docs you have & competitor analyses, to provide options on product direction.',
        tags: ['User interviews', 'Competitor analysis', 'Brainstorm'],
      },
      {
        title: 'Design systems',
        text:
          'We create and manage a scalable design system, making it easy for your engineering team to ship on brand. Teams get value from this beyond our engagement.',
      },
      {
        title: 'High-fidelity',
        text:
          'We bring designs to life from wireframes. This involves using consistent design system components, and mapping out end-to-end annotated flows for easy engineer hand-off.',
      },
      {
        title: 'Prototypes',
        text:
          'We bring designs to life from lo-fi wireframes. This involves using consistent design system components, and mapping out end-to-end annotated flows for easy engineer hand-off.',
      },
    ],
  },
  startups: {
    summary:
      "You've raised $2-20m. You need product managers & product designers to supercharge iterating as quickly as possible to get to product market fit.",
    team: [
      { label: 'Product', count: 3 },
      { label: 'Design', count: 4 },
    ],
    items: [
      {
        title: 'Mind meld',
        text:
          'We run a structured onboarding process to dive deep into your product, industry and users. This gives us the right context in understanding your goals, and deliver value in product & design.',
      },
      {
        title: 'Weekly jam',
        text:
          'We run weekly sessions (in-person, if location allows) where we go through design feedback, and brief new projects.',
      },
      {
        title: 'Brainstorming',
        text:
          'The messy middle of a project often requires more than 1 weekly touchpoint. We jump on regular Slack huddles / ad-hoc calls throughout the week to get the context we need.',
      },
      {
        title: 'Wireframes',
        text:
          'This is a huge focus for us. We triangulate information from your brief, any user docs you have & competitor analyses, to provide options on product direction.',
        tags: ['User interviews', 'Competitor analysis', 'Brainstorm'],
      },
      {
        title: 'Design systems',
        text:
          'We create and manage a scalable design system, making it easy for your engineering team to ship on brand. Teams get value from this beyond our engagement.',
      },
      {
        title: 'High-fidelity',
        text:
          'We bring designs to life from wireframes. This involves using consistent design system components, and mapping out end-to-end annotated flows for easy engineer hand-off.',
      },
      {
        title: 'Prototypes',
        text:
          'We build interactivity into lo-fi or hi-fi designs so you can easily validate product decisions with customers.',
      },
    ],
  },
};

const AVATAR_TINTS = [
  'from-brand-accent/45 to-brand-ink/35',
  'from-amber-200 to-rose-300',
  'from-sky-200 to-brand-accent/45',
  'from-emerald-200 to-brand-accent/30',
];

const Pricing = () => {
  const [tab, setTab] = useState<'scaleups' | 'startups'>('startups');
  const active = PRICING_PLANS[tab];

  return (
    <section id="pricing" className="relative py-16 md:py-24 px-4 md:px-8 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_460px_at_0%_0%,rgba(0,129,167,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_100%_110%,rgba(0,129,167,0.10),transparent_60%)]" />
      <div className="relative max-w-[1400px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-5 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.04] tracking-tight">
            No guesswork on pricing,
            <br />
            we charge $18K/mo<span className="text-brand-accent">.</span>
          </h2>
        </div>

        <div className="mb-14">
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-brand-ink/15 bg-white py-2 pl-2 pr-5 font-semibold text-brand-ink shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-colors hover:bg-brand-ink hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/45"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-accent text-white transition-transform group-hover:rotate-12">
              <Sparkle className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">Enquire</span>
          </motion.a>
        </div>

        <div className="relative">
          <div className="flex items-end gap-2">
            {(['scaleups', 'startups'] as const).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`relative rounded-2xl px-5 md:px-7 py-3 text-2xl md:text-3xl font-display font-bold tracking-tight transition-colors ${
                    isActive ? 'text-brand-ink' : 'text-brand-ink/30 hover:text-brand-ink/55'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pricing-tab-bg"
                      className="absolute inset-0 rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-brand-ink/10"
                      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                    />
                  )}
                  <span className="relative">{t === 'scaleups' ? 'Scale-ups' : 'Startups'}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 mb-8 h-px bg-brand-ink/15" />

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <p className="text-base md:text-lg text-brand-ink/75 leading-relaxed max-w-3xl mb-3">
              {active.summary}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm md:text-base text-brand-ink/75 mb-10">
              <span>You&apos;ll work with</span>
              {active.team.map((t, i) => (
                <div key={t.label} className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {Array.from({ length: t.count }).map((_, j) => (
                      <div
                        key={j}
                        className={`h-8 w-8 rounded-full border-2 border-brand-bg bg-gradient-to-br ${
                          AVATAR_TINTS[(i + j) % AVATAR_TINTS.length]
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-brand-ink">{t.label}</span>
                  {i < active.team.length - 1 && (
                    <span className="text-brand-ink/35 font-medium">&amp;</span>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-brand-ink/15">
              {active.items.map((item, idx) => (
                <motion.div
                  key={`${tab}-${item.title}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + idx * 0.03, duration: 0.3, ease: 'easeOut' }}
                  className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-14 py-7 border-b border-brand-ink/15"
                >
                  <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-brand-ink/90">
                    {item.title}
                  </h3>
                  <div>
                    <p className="text-brand-ink/70 leading-relaxed">{item.text}</p>
                    {item.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-brand-ink/10 bg-white/70 px-3 py-1 text-xs font-medium text-brand-ink/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="relative py-16 md:py-20 px-4 md:px-8 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_100%_0%,rgba(0,129,167,0.09),transparent_60%)]" />
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Our Team</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            Executed by a team who&apos;s
            <br />
            done it before.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden border border-brand-ink/10 bg-white/70 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
              <img src="/portrait.jpeg" alt="Aj" className="h-full w-full object-cover" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="pt-2"
          >
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-5">Aj</h3>
            <div className="max-w-3xl space-y-5 text-lg md:text-xl text-brand-ink/70 leading-relaxed">
              <p>
                I launched Panko Studio in 2024 to help you design and ship beautiful products at
                the speed you need.
              </p>
              <p>
                Full-time designers are expensive – a senior PD salary is 150K/yr not including
                taxes, and it could take months to hire the right one.
              </p>
              <p>Who has that kind of time when your users want features built yesterday?</p>
              <p>
                That&apos;s why I assembled a senior, global design team that you can onboard in
                days, so you can get the same design quality without sacrificing time &amp; money.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {company: 'Deputy', months: '8 MONTHS', status: 'ACTIVE', text: "Within two weeks, Panko deployed two senior designers who slotted right into our product triads and design rituals.", author: 'Deepesh Banerji', role: 'CPO'},
    {company: 'HotDoc', months: '5 MONTHS', status: 'ACTIVE', text: "We’ve been really impressed by Panko’s ability to combine structured frameworks with flexibility. Their rituals gave us confidence.", author: 'Agnes So', role: 'CPO'},
    {company: 'Lorikeet', months: '6 MONTHS', status: 'ACTIVE', text: "Panko turned complex AI ideas into thoughtful design concepts that scale and kept our product direction clear.", author: 'Steve Hind', role: 'CEO'},
    {company: 'Sophie', months: '3 MONTHS', status: 'ACTIVE', text: 'The Panko team knows how to design a world-class product and iterate quickly without compromising quality.', author: 'Jacob Banks', role: 'CEO'},
    {company: 'Nexus', months: '7 MONTHS', status: 'ACTIVE', text: 'They improved both our conversion and onboarding UX while helping us move much faster as a team.', author: 'Olivia Chen', role: 'Head of Product'},
    {company: 'Vertex', months: '4 MONTHS', status: 'ACTIVE', text: 'A strong design partner that quickly understood our market and translated strategy into practical flows.', author: 'Elena Vance', role: 'VP Product'},
  ];

  return (
    <section className="relative py-16 md:py-20 bg-brand-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_-10%,rgba(0,129,167,0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_460px_at_-5%_110%,rgba(0,129,167,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent" />
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="mb-8 flex items-baseline gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/55">
            Why Panko?
          </span>
        </div>
      </div>
      <div className="relative mx-4 md:mx-6">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-bg to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-bg to-transparent z-10" />
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="min-h-[360px] min-w-[320px] max-w-[360px] snap-start flex-shrink-0 rounded-[1.5rem] border border-brand-ink/10 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] flex flex-col"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-[11px] font-semibold tracking-wider rounded-full border border-brand-ink/15 px-2.5 py-1 text-brand-ink/60">{rev.months}</div>
                  <div className="text-[11px] font-semibold tracking-wider rounded-full border border-brand-accent/40 bg-brand-accent/10 px-2.5 py-1 text-brand-accent">{rev.status}</div>
                </div>
                <div className="h-8 min-w-[96px] rounded-md border border-brand-ink/10 bg-brand-bg/70 px-3 flex items-center justify-center text-sm font-semibold text-brand-ink/75">
                  {rev.company}
                </div>
              </div>
              <p className="text-base leading-relaxed text-brand-ink/85 mb-6 flex-1">{rev.text}</p>
              <div className="pt-4 border-t border-brand-ink/10">
                <div className="font-semibold text-brand-ink">{rev.author}</div>
                <div className="text-brand-ink/55 text-sm font-medium">{rev.role}</div>
              </div>
            </motion.div>
          ))}
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
    const sectionIds = ['home', 'about', 'work', 'pricing', 'team', 'contact'];
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
    const timeout = window.setTimeout(() => setShowLoader(false), 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-ink">
      <Navbar dockProgress={dockProgress} activeSection={activeSection} />
      <main>
        <Hero heroRef={heroRef} />
        <About />
        <Testimonials />
        <Projects />
        <Pricing />
        <Team />
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
        <div className="flex items-center gap-2 text-3xl md:text-4xl font-display font-bold tracking-tight text-brand-ink">
          panko studio
          <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}
