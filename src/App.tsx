import {motion, useScroll, useTransform} from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

const Navbar = ({isHeroView, activeSection}: {isHeroView: boolean; activeSection: string}) => {
  const navItems = [
    {id: 'about', label: 'About'},
    {id: 'work', label: 'Work'},
    {id: 'pricing', label: 'Pricing'},
    {id: 'team', label: 'Team'},
    {id: 'contact', label: 'Contact'},
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{type: 'spring', stiffness: 220, damping: 28}}
      className={`fixed z-50 flex items-center px-5 md:px-8 py-3 backdrop-blur-md border border-brand-ink/5 transition-all duration-400 ${
        isHeroView
          ? 'top-0 left-0 right-0 rounded-none bg-brand-bg/80'
          : 'top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] md:w-[min(1120px,calc(100%-3rem))] rounded-2xl bg-white/75 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-bold font-display tracking-tight">panko studio</span>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
      </div>
      
      <div className="hidden md:flex items-center gap-7 text-sm font-medium ml-auto">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="inline-flex items-center gap-2 hover:text-brand-ink/60 transition-colors"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                activeSection === item.id ? 'opacity-100 bg-brand-accent' : 'opacity-0'
              }`}
            />
            {item.label}
          </a>
        ))}
      </div>

      <motion.a
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        href="#contact"
        className="ml-4 bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-brand-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
      >
        Book call
      </motion.a>
    </motion.nav>
  );
};

const Hero = () => {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <section id="home" ref={targetRef} className="relative pt-28 pb-14 px-6 md:px-12 overflow-hidden min-h-screen flex flex-col justify-center">
      <motion.div 
        style={{opacity, y}}
        className="max-w-5xl mx-auto w-full"
      >
        <motion.div
          initial={{opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, ease: 'easeOut'}}
          className="relative"
        >
          <div className="pointer-events-none absolute top-16 -left-20 hidden md:block">
            <motion.div
              initial={{opacity: 0, scale: 0.98}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 1.2, ease: 'easeOut'}}
              className="h-80 w-80 rounded-full bg-brand-accent/14 blur-3xl"
            />
          </div>

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
              className="group flex items-center gap-3 bg-white border border-brand-ink/10 px-8 py-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">Let&apos;s chat</span>
              <span className="ml-1 text-brand-ink/30 group-hover:text-brand-ink/50 transition-colors">
                <ArrowRight className="w-5 h-5" />
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
    <section id="about" className="py-18 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
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
            
            <motion.a
              whileHover={{y: -1}}
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full bg-brand-accent text-white px-6 py-3 text-base font-semibold shadow-sm"
            >
              Book a call
              <div className="w-8 h-8 rounded-full border border-white/35 flex items-center justify-center">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.a>
          </div>

          <div className="space-y-8">
            {[
              { label: "74", sub: "happy teams across the globe", icon: <Globe className="w-5 h-5" /> },
              { label: "12", sub: "years of combined expertise", icon: <Users className="w-5 h-5" /> }
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
                  <div className="text-3xl md:text-4xl font-bold font-display mb-1">{stat.label}</div>
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
  return (
    <section id="contact" className="relative py-18 md:py-20 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.65)_52%,rgba(0,129,167,0.06)_52%,rgba(0,129,167,0.06)_100%)]" />
      <div className="relative max-w-4xl mx-auto">
        <div className="rounded-[2rem] border border-brand-ink/10 bg-white/70 backdrop-blur px-6 md:px-14 py-12 md:py-16">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-ink/50 mb-6">Contact</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-10">
            Let&apos;s collaborate
          </h2>

          <div className="space-y-5 text-lg md:text-2xl text-brand-ink/90">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>My name is</span>
              <span className="px-4 py-1 rounded-full bg-brand-bg border border-brand-ink/10 text-brand-ink/45 text-base md:text-lg">
                first &amp; last name
              </span>
              <span>from</span>
              <span className="px-4 py-1 rounded-full bg-brand-bg border border-brand-ink/10 text-brand-ink/45 text-base md:text-lg">
                company name
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>I want to chat about</span>
              <span className="px-3 py-1 rounded-full border border-brand-ink/10 bg-brand-bg text-base md:text-lg">Web app</span>
              <span className="px-3 py-1 rounded-full border border-brand-ink/10 bg-brand-bg text-base md:text-lg">Mobile app</span>
              <span className="px-3 py-1 rounded-full border border-brand-ink/10 bg-brand-bg text-base md:text-lg">Website</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span>You can reach me at</span>
              <span className="px-4 py-1 rounded-full bg-brand-bg border border-brand-ink/10 text-brand-ink/45 text-base md:text-lg">
                email address
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{y: -1}}
            whileTap={{scale: 0.98}}
            className="mt-10 inline-flex items-center rounded-2xl border border-brand-ink/10 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="m-1 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-accent text-white">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="px-5 text-xl font-semibold">Submit</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-white border-t border-brand-ink/5">
      <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold font-display">panko studio</span>
          <div className="w-1 h-1 rounded-full bg-brand-accent" />
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-brand-ink/60">
          <a href="#" className="hover:text-brand-ink transition-colors">Twitter</a>
          <a href="#" className="hover:text-brand-ink transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-brand-ink transition-colors">Dribbble</a>
        </div>
        
        <div className="text-sm text-brand-ink/40">
          © 2026 Panko Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Projects = () => {
  const projects = [
    { title: "Lumina AI", category: "Product Design", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
    { title: "Vertex Flow", category: "Product Management", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800" },
    { title: "Nexus B2B", category: "Strategy", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800" },
    { title: "Echo Systems", category: "UI/UX Design", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <section id="work" className="py-18 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Crafting digital <br />excellence.</h2>
          </div>
          <p className="text-brand-ink/60 max-w-sm leading-relaxed">
            We partner with ambitious founders to build products that define categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 bg-brand-bg relative">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-ink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-between px-4">
                <div>
                  <h3 className="text-2xl font-bold font-display">{project.title}</h3>
                  <p className="text-brand-ink/40 font-medium">{project.category}</p>
                </div>
                <div className="w-12 h-12 rounded-full border border-brand-ink/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all">
                  <ArrowRight className="w-5 h-5" />
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
  const plans = [
    {
      name: 'Full service',
      price: '$12,000 + tax',
      period: '/mo',
      desc: 'Senior product and design leadership embedded into your team.',
      features: ['Dedicated PM & Designer', 'Unlimited requests', 'Weekly strategic reviews'],
      buttonLabel: 'Subscribe',
      buttonHref: '#contact',
    },
    {
      name: 'Enterprise',
      price: 'Contact us',
      period: '',
      desc: 'For companies seeking design and product expertise across multiple teams and products.',
      features: [],
      buttonLabel: 'Book a call',
      buttonHref: '#contact',
    },
    {
      name: 'Fixed Project',
      price: 'Contact us',
      period: '',
      desc: 'For teams that have fixed-scope design need. This includes:',
      features: ['Website design and build', 'Web and mobile app designs'],
      buttonLabel: 'Book a call',
      buttonHref: '#contact',
    },
  ];

  return (
    <section id="pricing" className="py-18 md:py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Transparent investment.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] border border-brand-ink/5 bg-brand-bg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold font-display">{plan.price}</span>
                  <span className="text-brand-ink/40 font-medium">{plan.period}</span>
                </div>
                <p className="text-brand-ink/60 mb-6 leading-relaxed">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={plan.buttonHref}
                className="w-full py-3.5 bg-brand-ink text-white rounded-2xl font-semibold hover:bg-brand-ink/90 transition-colors text-center"
              >
                {plan.buttonLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-18 md:py-20 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Our Team</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">The minds behind <br />the products.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-white shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900"
                alt="Aj"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
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
            <p className="text-lg md:text-xl text-brand-ink/65 leading-relaxed max-w-3xl">
              I lead senior product and design engagements for founders building AI x B2B
              products. My approach balances strategic clarity with practical execution, so
              teams can move from concept to confident release without unnecessary complexity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { text: "Panko Studio transformed our product in weeks. Their attention to detail is unmatched.", author: "James Wilson", role: "CEO @ Lumina" },
    { text: "The best design partner we've ever worked with. They truly understand B2B complexity.", author: "Elena Vance", role: "VP Product @ Vertex" },
    { text: "Highly professional, fast, and incredibly creative. A game changer for our startup.", author: "David K.", role: "Founder @ Echo" }
  ];

  return (
    <section className="py-18 md:py-20 px-6 md:px-12 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-[2rem] bg-white border border-brand-ink/5 shadow-sm flex flex-col justify-between"
            >
              <MessageSquare className="w-8 h-8 text-brand-accent mb-6" />
              <p className="text-xl font-medium leading-relaxed mb-8 italic">“{rev.text}”</p>
              <div>
                <div className="font-bold text-lg">{rev.author}</div>
                <div className="text-brand-ink/40 text-sm font-medium">{rev.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [isHeroView, setIsHeroView] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const hero = document.getElementById('home');
    const sectionIds = ['home', 'about', 'work', 'pricing', 'team', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsHeroView(entry.isIntersecting),
      {threshold: 0.65},
    );

    if (hero) heroObserver.observe(hero);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {threshold: 0.45, rootMargin: '-15% 0px -40% 0px'},
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId = 0;

    const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

    const animate = () => {
      currentY += (targetY - currentY) * 0.12;
      window.scrollTo(0, currentY);
      if (Math.abs(targetY - currentY) > 0.4) {
        rafId = requestAnimationFrame(animate);
      } else {
        rafId = 0;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetY = clamp(targetY + event.deltaY * 0.9, 0, maxScroll);
      if (!rafId) rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('wheel', handleWheel, {passive: false});
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-ink">
      <Navbar isHeroView={isHeroView} activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Projects />
        <Pricing />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
