import {motion, useScroll, useTransform} from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Globe,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react';
import {useRef} from 'react';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-brand-bg/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold font-display tracking-tight">panko studio</span>
        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        {["About", "Work", "Pricing", "Team", "Roles"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="hover:text-brand-ink/60 transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full" />
          </a>
        ))}
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="bg-brand-accent text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-shadow border border-brand-ink/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
      >
        Book call
      </motion.button>
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
    <section ref={targetRef} className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden min-h-screen flex flex-col justify-center">
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
          <div className="pointer-events-none absolute -top-16 -right-24 hidden md:block">
            <motion.div
              initial={{opacity: 0, scale: 0.98}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 1.2, ease: 'easeOut'}}
              className="h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl"
            />
          </div>

          <h1 className="mt-8 text-6xl md:text-8xl font-display font-bold leading-[0.92] tracking-tighter">
            Design for startups
            <span className="text-brand-ink/25"> and</span>
            <br />
            scale-ups<span className="text-brand-accent">.</span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-brand-ink/65 max-w-2xl leading-relaxed">
            Senior product managers and designers for ambitious AI x B2B teams.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.a
              whileHover={{y: -2}}
              whileTap={{scale: 0.98}}
              href="#pricing"
              className="group flex items-center gap-3 bg-white border border-brand-ink/10 px-8 py-4 rounded-2xl shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center group-hover:rotate-6 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">Plans</span>
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
    <section id="about" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40">About</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight tracking-tighter mb-8">
              <span className="text-brand-ink/30">Product managers & designers</span>{' '}
              <span className="text-brand-ink">for</span> AI x B2B teams.
            </h2>
            <p className="text-xl text-brand-ink/60 leading-relaxed mb-12">
              Senior product talent that drives design projects from wireframe to full release alongside your engineers.
            </p>
            
            <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-lg font-bold group"
            >
              Learn our process 
              <div className="w-10 h-10 rounded-full border border-brand-ink flex items-center justify-center group-hover:bg-brand-ink group-hover:text-white transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.button>
          </div>

          <div className="space-y-12">
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
                className="flex items-start gap-6 pb-8 border-b border-brand-ink/5"
              >
                <div className="mt-2 text-brand-ink/40">{stat.icon}</div>
                <div>
                  <div className="text-4xl font-bold font-display mb-1">{stat.label}</div>
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

const Services = () => {
  const services = [
    { title: "Product Strategy", desc: "Defining the roadmap and vision for your next big thing.", color: "bg-blue-50" },
    { title: "UI/UX Design", desc: "Crafting intuitive interfaces that users actually love.", color: "bg-brand-accent/20" },
    { title: "AI Integration", desc: "Leveraging LLMs to create smarter user experiences.", color: "bg-purple-50" },
    { title: "Rapid Prototyping", desc: "From idea to interactive demo in record time.", color: "bg-orange-50" }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 tracking-tight">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`${s.color} p-8 rounded-[2rem] border border-brand-ink/5 flex flex-col justify-between h-72`}
            >
              <div className="text-2xl font-bold font-display leading-tight">{s.title}</div>
              <div className="text-brand-ink/60 leading-relaxed">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 overflow-hidden">
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
    <section id="work" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Selected Work</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Crafting digital <br />excellence.</h2>
          </div>
          <p className="text-brand-ink/60 max-w-sm leading-relaxed">
            We partner with ambitious founders to build products that define categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
      name: "Retainer", 
      price: "$8,500", 
      period: "/month",
      desc: "Perfect for scaling startups needing ongoing product & design support.",
      features: ["Dedicated PM & Designer", "Unlimited requests", "48h turnaround", "Slack integration"]
    },
    { 
      name: "Project", 
      price: "$15,000", 
      period: "/start",
      desc: "Best for fixed-scope projects like MVP design or major feature launches.",
      features: ["Full product audit", "End-to-end design", "Developer handoff", "2 weeks support"]
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Transparent investment.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="p-10 rounded-[3rem] border border-brand-ink/5 bg-brand-bg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold font-display mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-bold font-display">{plan.price}</span>
                  <span className="text-brand-ink/40 font-medium">{plan.period}</span>
                </div>
                <p className="text-brand-ink/60 mb-8 leading-relaxed">{plan.desc}</p>
                <ul className="space-y-4 mb-12">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="w-full py-4 bg-brand-ink text-white rounded-2xl font-bold hover:bg-brand-ink/90 transition-colors">
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  return (
    <section id="team" className="py-24 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Our Team</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">The minds behind <br />the products.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-start">
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
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">Aj</h3>
            <p className="text-xl text-brand-ink/65 leading-relaxed max-w-3xl">
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

const Roles = () => {
  const roles = [
    { title: "Senior Product Designer", type: "Full-time", location: "Remote" },
    { title: "Product Manager", type: "Contract", location: "London / Remote" },
    { title: "Design Technologist", type: "Full-time", location: "New York / Remote" }
  ];

  return (
    <section id="roles" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Join the studio.</h2>
          <p className="text-brand-ink/60 max-w-sm leading-relaxed text-lg">
            We're always looking for exceptional talent to join our distributed team.
          </p>
        </div>

        <div className="space-y-4">
          {roles.map((role, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ x: 10 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl border border-brand-ink/5 hover:bg-brand-bg transition-all cursor-pointer"
            >
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold font-display mb-1">{role.title}</h3>
                <div className="flex gap-4 text-sm text-brand-ink/40 font-medium">
                  <span>{role.type}</span>
                  <span>•</span>
                  <span>{role.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 font-bold">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">Apply now</span>
                <div className="w-12 h-12 rounded-full border border-brand-ink/10 flex items-center justify-center group-hover:bg-brand-ink group-hover:text-white transition-all">
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

const Process = () => {
  const steps = [
    { title: "Discovery", desc: "We dive deep into your business goals and user needs." },
    { title: "Strategy", desc: "Crafting a roadmap that aligns product with market." },
    { title: "Design", desc: "Iterative design cycles with constant feedback loops." },
    { title: "Delivery", desc: "High-fidelity handoff and support during build." }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-ink/40 mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">How we work.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-display font-bold text-brand-ink/5 mb-6">{idx + 1}</div>
              <h3 className="text-2xl font-bold font-display mb-4">{step.title}</h3>
              <p className="text-brand-ink/60 leading-relaxed">{step.desc}</p>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-6 w-12 h-[1px] bg-brand-ink/10" />
              )}
            </motion.div>
          ))}
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
    <section className="py-24 px-6 md:px-12 bg-brand-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-12 rounded-[3rem] bg-white border border-brand-ink/5 shadow-sm flex flex-col justify-between"
            >
              <MessageSquare className="w-8 h-8 text-brand-accent mb-8" />
              <p className="text-2xl font-medium leading-relaxed mb-12 italic">“{rev.text}”</p>
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
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Testimonials />
        <Projects />
        <Process />
        <Pricing />
        <Team />
        <Roles />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
