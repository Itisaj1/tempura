// Parked component — Why Panko? testimonial rail.
// Not currently rendered in App.tsx. Re-enable by importing this file and
// adding <Testimonials /> back into the main section list.
import {motion} from 'motion/react';

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
      <div className="relative max-w-[1840px] mx-auto px-4 md:px-10">
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

export default Testimonials;
