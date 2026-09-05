export interface Faq {
  q: string;
  a: string;
}

// The full set, as used on the Services page. `location` here must stay in
// sync with `site.ts`'s `location` field — it was previously out of sync
// ("remote-first across New York and Berlin" vs. "Kolkata / India").
export const faqs: Faq[] = [
  {
    q: 'How long does a typical project take?',
    a: 'Most engagements run six to fourteen weeks, depending on scope. A focused brand sprint can be three; a full rebrand plus platform build is closer to four months. We give you a realistic range before you commit — not an optimistic one.',
  },
  {
    q: 'How do you price work?',
    a: 'Fixed fee against a fixed scope, agreed up front. You will know the number before we start, and it does not move unless the scope does. Retainers are billed monthly for a reserved block of team time.',
  },
  {
    q: 'Can you do just the design, or just the build?',
    a: 'Yes. Plenty of clients bring us in for one or the other. That said, the work is usually stronger when design and engineering sit together from day one — it is the main reason we keep both in-house.',
  },
  {
    q: 'Do you work alongside in-house teams?',
    a: 'Often. We can lead, or we can embed and support — running the system while your team runs the product. We document everything so nothing depends on us being in the room.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a support window after go-live, and we hand over documentation your team can actually use. Many clients then move onto a light retainer so the work keeps improving instead of quietly decaying.',
  },
  {
    q: 'Where are you based?',
    a: "We're remote-first, based out of Kolkata, India — which means we work async by default and keep meetings light, wherever you are.",
  },
  {
    q: 'Do you use AI in your process?',
    a: "Yes — openly. We use it to speed up drafts and exploration across design, motion, content and code: faster concepts, faster rough cuts, faster first passes at copy and code. It doesn't replace judgement — every output is reviewed, edited and finished by the team before it reaches you.",
  },
];

// Home: a shorter, decision-critical subset — timeline, pricing, design/build
// split, and what happens after launch.
export const homeFaqs: Faq[] = [faqs[0], faqs[1], faqs[2], faqs[4]];

// Contact: practical, post-submission questions the existing set doesn't
// cover. Grounded only in what contact.astro actually does (mailto form,
// "reply within two working days" — already stated on that page).
export const contactFaqs: Faq[] = [
  {
    q: 'What happens after I submit the form?',
    a: 'Your message opens in your own email client, addressed to us, so nothing gets lost in a third-party inbox. We read every message and reply within two working days.',
  },
  {
    q: 'Is there a minimum project size?',
    a: "Not officially, but the two-week-plus commitment behind most engagements tends to rule out the very smallest jobs. If you're not sure it's a fit, tell us anyway.",
  },
  {
    q: 'What should I include in my message?',
    a: "Roughly what you're building, why now, and a budget range if you have one — the more context we have, the faster we can tell you if we're a fit.",
  },
];
