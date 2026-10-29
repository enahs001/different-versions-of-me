/*
 * ─────────────────────────────────────────────────────────────
 *  ALL WRITING FOR THE SITE LIVES IN THIS FILE.
 *  Edit freely — components read everything from here.
 *
 *  Lines marked  ✎ illustrative  were drafted as placeholders.
 *  Replace them with your own experiences and words.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  titleLines: ['The', 'different', 'versions', 'of me'],
  subtitle: 'Who am I when I’m not performing?',
  intro: 'Depending on where you meet me, you might know a completely different person.',
  question: 'Which version of me do you know?',
  hoverHint: 'Point at a version to see where you might have met me.',
}

export const identities = [
  {
    id: 'student',
    name: 'The Student',
    short: 'Student',
    accent: '#9ecbf7',
    // ✎ illustrative — one line about where people meet this version
    tagline: 'Met in lecture halls, group projects, and late-night study sessions.',
    background:
      'I am an Informatics student at the University of Washington, interested in technology, data, design, and how information systems affect people.',
    see: [
      'Someone studying technology and problem-solving',
      'Someone working toward academic and career goals',
      'Someone trying to develop useful skills',
    ],
    dontSee: [
      'Uncertainty about the future',
      'Pressure to achieve',
      'Comparing my progress with other students',
      'Balancing school with everything else I’ve said yes to',
    ],
    mask: 'My achievements determine whether I’m successful.',
    mirror: 'Some of my most meaningful learning happens when I’m not thinking about grades.',
    matters: [
      'Curiosity',
      'Creative problem-solving',
      'Building things that make people’s lives better',
      'Learning something because it interests me, not because it looks impressive',
    ],
    carry: ['Curiosity', 'Adaptability', 'A willingness to keep learning'],
  },
  {
    id: 'president',
    name: 'The President',
    short: 'President',
    accent: '#a48bfa',
    tagline: 'Met at the front of the room at KOJOBS UW, holding the agenda.',
    background:
      'I serve as president of KOJOBS UW, a Korean professional-development student organization. I help organize events, coordinate officers, communicate with organizations, and create opportunities for students.',
    see: [
      'A leader',
      'Someone organizing events',
      'Someone responsible for a team',
      'Someone who makes decisions',
    ],
    dontSee: [
      'Pressure to make the right decisions',
      'Worry about disappointing people',
      'Uncertainty about whether I’m leading well',
      'Learning to carry responsibility without trying to control everything',
    ],
    mask: 'I should always know what to do.',
    mirror: 'Sometimes being a good leader means admitting that I don’t have the answer.',
    matters: [
      'Helping people find opportunities',
      'Creating a welcoming community',
      'Watching other people grow',
      'Building meaningful relationships',
      'Making decisions together',
    ],
    carry: ['Accountability', 'Humility', 'Empathy', 'Leadership through care'],
  },
  {
    id: 'intern',
    name: 'The Intern',
    short: 'Intern',
    accent: '#8fa2f7',
    tagline: 'Met in emails and partner meetings at the Seattle Korean Education Center.',
    background:
      'I work at the Seattle Korean Education Center, supporting educational and professional opportunities, including the K-Capstone project.',
    see: [
      'A professional representative of an organization',
      'Someone communicating with external partners',
      'Someone supporting programs and managing responsibilities',
    ],
    dontSee: [
      'Learning how professional environments actually work',
      'Trying to communicate appropriately in unfamiliar situations',
      'Feeling pressure to seem more experienced than I am',
    ],
    mask: 'I should never make mistakes.',
    mirror: 'Learning to ask questions is part of becoming capable.',
    matters: [
      'Connecting students with opportunities',
      'Helping educational programs succeed',
      'Learning from more experienced people',
      'Bridging communities',
    ],
    carry: ['Professional communication', 'Adaptability', 'Integrity', 'Openness to feedback'],
  },
  {
    id: 'tutor',
    name: 'The Tutor',
    short: 'Tutor',
    accent: '#f2cfa6',
    tagline: 'Met across the table, working through a math problem one step at a time.',
    background:
      'I have tutored mathematics, helping students understand difficult concepts and build confidence.',
    see: [
      'Someone who understands the subject',
      'Someone explaining solutions',
      'Someone helping others improve',
    ],
    dontSee: [
      'Figuring out how each person learns differently',
      'Realizing that knowing something isn’t the same as teaching it',
      'Learning to be patient when progress takes time',
    ],
    mask: 'I need to have all the answers.',
    mirror: 'My job is to help someone discover how to find the answer.',
    matters: [
      'Making complicated things understandable',
      'Watching someone gain confidence',
      'Sharing knowledge without making anyone feel inadequate',
      'Helping others become independent learners',
    ],
    carry: ['Patience', 'Generosity', 'Empathy', 'Active listening'],
  },
  {
    id: 'friend',
    name: 'The Friend',
    short: 'Friend',
    accent: '#e8a7d5',
    tagline: 'Met in a game lobby, at the ballpark, or mid-way through a Pokémon trade.',
    background:
      'Outside school and work, I spend time with friends: gaming, baseball, Pokémon, and whatever else we end up doing together.',
    see: [
      'Someone who enjoys games and competition',
      'Someone who jokes around',
      'Someone who enjoys being around people',
    ],
    dontSee: [
      'How much I need relationships without professional expectations',
      'Trying to balance friendships with responsibilities',
      'Wanting to enjoy life without measuring my productivity',
    ],
    mask: 'I should always be available for others.',
    mirror: 'Good relationships also require boundaries and understanding.',
    matters: ['Shared experiences', 'Humor', 'Loyalty', 'Trust', 'Having fun without needing to accomplish anything'],
    carry: ['Authenticity', 'Connection', 'Joy', 'Seeing people beyond what they can offer professionally'],
  },
  {
    id: 'me',
    name: 'Just Me',
    short: 'Me',
    accent: '#f4efe7',
    tagline: 'Met everywhere, underneath all the others.',
    // ✎ illustrative
    mask: 'I should have myself figured out by now.',
    mirror: 'I’m still discovering who I am, and I’d rather be honest about that than pretend.',
    carry: [],
  },
]

/* ── Just Me ─────────────────────────────────────────────── */
export const justMe = {
  opening: 'No title. No audience. Nothing to live up to.',
  lede: 'This is the person who shows up to every other version: unfinished, and still deciding.',

  // ✎ illustrative — each note is a short, honest line. Tap a word on the page to read it.
  themes: [
    { word: 'Curiosity', note: 'I want to know how things work, especially the systems that shape people’s lives.' },
    { word: 'Humor', note: 'Laughing is how I make hard things lighter, for me and for the people around me.' },
    { word: 'Ambition', note: 'I want to do work that matters. I’m still learning what “matters” means.' },
    { word: 'Care', note: 'Underneath most of my roles is a way of looking out for people.' },
    { word: 'Competition', note: 'Baseball, games, grades: I like to win. I’m learning not to measure everything that way.' },
    { word: 'Uncertainty', note: 'I don’t know exactly where I’m going. I’m practicing being okay with that.' },
    { word: 'Growth', note: 'Every role has changed me a little. I can feel the edges moving.' },
    { word: 'Relationships', note: 'The people were always the point.' },
    { word: 'Dependable, not perfect', note: 'I want people to be able to count on me without pretending I never fall short.' },
  ],

  // ✎ illustrative — move the slider between two things that are both true
  tensions: [
    {
      left: 'Ambition',
      right: 'Uncertainty',
      lines: ['I want to get somewhere that matters.', 'I’m moving forward without a full map.', 'I’m not sure where “somewhere” is yet.'],
    },
    {
      left: 'Competition',
      right: 'Care',
      lines: ['I want to win.', 'I want to win with people, not over them.', 'I want everyone to get there.'],
    },
    {
      left: 'Dependable',
      right: 'Imperfect',
      lines: ['People should be able to count on me.', 'Being dependable includes saying when I can’t.', 'I will drop the ball sometimes.'],
    },
    {
      left: 'Humor',
      right: 'Seriousness',
      lines: ['Not everything has to be so heavy.', 'Lightness is how I carry serious things.', 'Some things deserve my full seriousness.'],
    },
  ],

  // ✎ illustrative — sentences I've revised about myself
  drafts: [
    { struck: 'I am a student, a president, an intern, a tutor, and a friend.', revised: 'I do those things. They aren’t all of who I am.' },
    { struck: 'I need to have it figured out.', revised: 'I need to keep figuring it out.' },
    { struck: 'Being professional means never showing doubt.', revised: 'Being professional means being honest about what I know and what I don’t.' },
    { struck: 'I’ll be myself once I’ve proven I belong.', revised: 'I belong a little more each time I show up as myself.' },
  ],

  // ✎ illustrative — "taking sides": where my values make me choose
  stands: [
    'I’d rather build a team where people can say “I don’t know” than one where everyone pretends.',
    'Opportunities should be passed on, not held onto. Someone opened doors for me.',
    'People matter more than what they can offer me professionally.',
    'I’d rather be honest and unfinished than polished and hollow.',
  ],

  closing: 'I am still discovering who I am.',
}

/* ── Connections ─────────────────────────────────────────── */
// Keys are two identity ids in alphabetical order, joined by "+".
// ✎ illustrative explanations — rewrite with real moments.
export const connections = {
  'student+tutor': {
    value: 'Curiosity and patience',
    text: 'As a student I’m the one who doesn’t understand yet. As a tutor I remember exactly how that feels. Each role makes me more patient with the other side of the table.',
  },
  'intern+president': {
    value: 'Accountability and communication',
    text: 'In one role I answer to a team; in the other, to an organization. Both taught me that clear communication is a way of keeping promises.',
  },
  'friend+president': {
    value: 'Relationships and trust',
    text: 'The officers I lead are also people I care about. Trust built outside meetings is what makes the hard conversations inside them possible.',
  },
  'president+tutor': {
    value: 'Helping others grow',
    text: 'Whether it’s an officer running their first event or a student solving their first proof, the goal is the same: make myself a little less necessary.',
  },
  'friend+student': {
    value: 'Enjoyment, curiosity, and balance',
    text: 'My friends remind me that curiosity doesn’t have to be graded. Some of my best questions start as jokes.',
  },
  'president+student': {
    value: 'Learning in public',
    text: 'Leading while still learning means deciding before I feel ready, and being honest that I’m figuring it out alongside everyone else.',
  },
  'intern+student': {
    value: 'Theory meeting practice',
    text: 'Classes give me frameworks about information and people. The internship shows me what those frameworks feel like with a real deadline and a real partner on the other end.',
  },
  'intern+tutor': {
    value: 'Bridging',
    text: 'Both roles connect someone to something they can’t reach yet: a concept, a program, an opportunity.',
  },
  'friend+intern': {
    value: 'Warmth in professional spaces',
    text: 'I’m learning that professionalism doesn’t require hiding the warmth my friends know.',
  },
  'friend+tutor': {
    value: 'Generosity without keeping score',
    text: 'In both, I give time without expecting a return, and somehow I always get something back. That reciprocity is the point.',
  },
  'me+student': { value: 'Curiosity', text: 'Before it’s a major or a GPA, it’s just wanting to understand how things work.' },
  'me+president': { value: 'Care', text: 'Underneath the title is someone who wants people to feel like they belong.' },
  'intern+me': { value: 'Humility', text: 'Willing to ask questions and be the least experienced person in the room.' },
  'me+tutor': { value: 'Patience', text: 'With other people first, and slowly, with myself.' },
  'friend+me': { value: 'Authenticity', text: 'The version of me with the least to prove is the one closest to who I am.' },
}

export const connectionsIntro = {
  title: 'How the versions connect',
  lede: 'Identity isn’t a stack of separate labels. It’s a web, and things flow between the strands. Choose two versions of me to see what they share.',
}

/* ── Finale ──────────────────────────────────────────────── */
export const finale = {
  heading: 'Six versions. One person.',
  button: 'Take away the titles',
  values: ['Curiosity', 'Care', 'Accountability', 'Connection', 'Authenticity', 'Growth', 'Generosity', 'Humility'],
  lineOne: 'These are not things I become when I receive a title.',
  lineTwo: 'These are the things I hope to bring into every role I take.',
  statement: 'Professionalism isn’t about proving that I belong. It’s about how I choose to show up.',
  revisit: 'Revisit the versions',
}

export const pairKey = (a, b) => [a, b].sort().join('+')
