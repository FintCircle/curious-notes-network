export type ContextId =
  | "building"
  | "tried"
  | "learned"
  | "exploring"
  | "broke"
  | "discovered";

export interface ContextDef {
  id: ContextId;
  label: string;
  short: string;
  blurb: string;
  page: string;
}

export const CONTEXTS: ContextDef[] = [
  {
    id: "building",
    label: "Building",
    short: "In progress, right now",
    blurb: "Things people are actively making.",
    page: "Work happening right now, unfinished and in motion.",
  },
  {
    id: "tried",
    label: "Tried",
    short: "An experiment and its result",
    blurb: "Experiments and what came out of them.",
    page: "Someone tried something. Here is what actually happened.",
  },
  {
    id: "learned",
    label: "Learned",
    short: "A thing that finally clicked",
    blurb: "Moments where something finally made sense.",
    page: "Notes about the moment something finally clicked.",
  },
  {
    id: "exploring",
    label: "Exploring",
    short: "Open question, thinking aloud",
    blurb: "Open questions, thinking aloud.",
    page: "Open questions, half-formed ideas and thinking aloud.",
  },
  {
    id: "broke",
    label: "Broke",
    short: "It failed, here's why",
    blurb: "Things that didn't quite go according to plan.",
    page: "Notes about what didn't go as planned. Real failures, errors, dead ends and what people learned from them.",
  },
  {
    id: "discovered",
    label: "Discovered",
    short: "Found something unexpected",
    blurb: "Unexpected finds.",
    page: "Things people ran into that they weren't looking for.",
  },
];

export const contextById = (id: ContextId) =>
  CONTEXTS.find((c) => c.id === id) as ContextDef;

export interface Notebook {
  handle: string;
  name: string;
  title: string;
  bio: string;
  about: string[];
  link?: string;
  often: string[];
  observers: number;
  noteCount: number;
}

export const NOTEBOOKS: Notebook[] = [
  {
    handle: "derrick",
    name: "Derrick",
    title: "Derrick's Notebook",
    bio: "Things I'm building, trying and occasionally breaking.",
    about: [
      "Developer, tinkerer and occasional overthinker.",
      "I like building things, trying new tools and figuring out how they all fit together.",
      "Usually with coffee.",
    ],
    link: "https://derrick.dev",
    often: ["Cloudflare", "Gemini", "Firebase", "Domains"],
    observers: 24,
    noteCount: 38,
  },
  {
    handle: "maya",
    name: "Maya",
    title: "Things I'm Trying",
    bio: "Small experiments, mostly unfinished.",
    about: ["I give half-broken projects to AI models and write down what happens."],
    often: ["Gemini", "ChatGPT", "Prompting"],
    observers: 41,
    noteCount: 17,
  },
  {
    handle: "jon",
    name: "Jon",
    title: "Weekend Notebook",
    bio: "Hardware on Saturdays, regret on Sundays.",
    about: ["Arduino, Raspberry Pi and things that beep."],
    often: ["Arduino", "Hardware", "R2"],
    observers: 12,
    noteCount: 9,
  },
  {
    handle: "alex",
    name: "Alex",
    title: "Dev Notes",
    bio: "Authentication keeps humbling me.",
    about: ["Web developer. Mostly writing down mistakes so I stop repeating them."],
    often: ["Firebase", "Authentication", "Next.js"],
    observers: 31,
    noteCount: 22,
  },
  {
    handle: "sam",
    name: "Sam",
    title: "Home Lab Notebook",
    bio: "Self-hosting until it breaks.",
    about: ["Docker, servers under the desk, and the occasional outage."],
    often: ["Docker", "Self-Hosting"],
    observers: 18,
    noteCount: 14,
  },
  {
    handle: "theo",
    name: "Theo",
    title: "Late Night Builds",
    bio: "Migrations at 2am, as one does.",
    about: ["Databases, mostly."],
    often: ["PostgreSQL", "Migrations"],
    observers: 9,
    noteCount: 7,
  },
  {
    handle: "rina",
    name: "Rina",
    title: "AI Experiments",
    bio: "Asking models to do things they shouldn't.",
    about: ["Local models, prompting, and the gap between demo and reality."],
    often: ["Local AI", "Ollama", "Workers"],
    observers: 27,
    noteCount: 19,
  },
  {
    handle: "kai",
    name: "Kai",
    title: "Side Projects",
    bio: "Domains I probably didn't need.",
    about: ["Email routing, DNS, and other things I learn by accident."],
    often: ["DNS", "Email", "Cloudflare"],
    observers: 15,
    noteCount: 11,
  },
  {
    handle: "lena",
    name: "Lena",
    title: "Build Log",
    bio: "Real-time things, eventually.",
    about: ["Durable Objects, websockets, and state that refuses to stay put."],
    often: ["Durable Objects", "Real-time"],
    observers: 22,
    noteCount: 13,
  },
];

export const notebookByHandle = (handle: string) =>
  NOTEBOOKS.find((n) => n.handle === handle);

export interface Note {
  slug: string;
  title: string;
  handle: string;
  context: ContextId;
  date: string;
  readMinutes: number;
  replies: number;
  interesting: number;
  topics: string[];
  tools: string[];
  body: string[];
}

export const NOTES: Note[] = [
  {
    slug: "cloudflare-binding-doing-nothing",
    title: "I finally understand why my Cloudflare binding wasn't doing anything.",
    handle: "derrick",
    context: "learned",
    date: "Sep 12",
    readMinutes: 4,
    replies: 12,
    interesting: 24,
    topics: ["Databases"],
    tools: ["Cloudflare", "D1", "Bindings"],
    body: [
      "For some reason I assumed that once I added a D1 binding, my Firebase users would somehow start appearing in the database.",
      "Obviously, that's not what a binding does.",
      "But that wasn't obvious to me yesterday.",
      "After a bit of experimenting (and a few failed deployments), I finally understand what the binding is actually handling, and where I need to write the data from my application.",
      "The binding gives the Worker a handle to the database. It does not move anything, sync anything or create anything. If I never call it, nothing happens. That is the whole lesson.",
    ],
  },
  {
    slug: "gemini-and-gpt-same-project",
    title: "I've been giving Gemini and GPT the same unfinished project.",
    handle: "maya",
    context: "tried",
    date: "Sep 10",
    readMinutes: 6,
    replies: 8,
    interesting: 19,
    topics: ["Prompting"],
    tools: ["Gemini", "ChatGPT"],
    body: [
      "Same repository, same broken test, same prompt. I wanted to see where they diverge.",
      "One rewrote far more than I asked for. The other asked me a question first, which I did not expect to matter as much as it did.",
      "Neither fixed it on the first pass. Both fixed it on the second, after I pasted the actual error instead of describing it.",
    ],
  },
  {
    slug: "bought-an-arduino",
    title: "Bought an Arduino. Now I need an excuse to actually use it.",
    handle: "jon",
    context: "building",
    date: "Sep 09",
    readMinutes: 3,
    replies: 15,
    interesting: 31,
    topics: ["Hardware", "Projects"],
    tools: ["Arduino"],
    body: [
      "It arrived on Tuesday. It has been sitting on the desk since Tuesday.",
      "The plan, such as it is: a small sensor that tells me when the room gets too warm while I'm wearing headphones.",
      "Writing this down mostly so the board doesn't quietly become a drawer item.",
    ],
  },
  {
    slug: "moved-authentication-locked-out",
    title: "I moved authentication and immediately locked myself out.",
    handle: "alex",
    context: "broke",
    date: "Sep 08",
    readMinutes: 7,
    replies: 6,
    interesting: 14,
    topics: ["Authentication"],
    tools: ["Firebase", "Next.js"],
    body: [
      "Moved the auth config across environments, redeployed, and the login page cheerfully rejected my own account.",
      "The redirect URL list did not travel with it. Of course it didn't.",
      "Took forty minutes to find because the error said nothing useful.",
    ],
  },
  {
    slug: "self-hosted-server-survived",
    title: "My self-hosted server survived... until it didn't.",
    handle: "sam",
    context: "broke",
    date: "Sep 06",
    readMinutes: 5,
    replies: 9,
    interesting: 11,
    topics: ["Self-Hosting"],
    tools: ["Docker"],
    body: [
      "Eleven days of uptime, then a disk filled with logs nobody was reading.",
      "The container restarted itself into the same wall roughly every nine seconds.",
      "Log rotation is now the first thing I set up, not the last.",
    ],
  },
  {
    slug: "broke-database-single-migration",
    title: "I broke my database with a single migration.",
    handle: "theo",
    context: "broke",
    date: "Sep 04",
    readMinutes: 5,
    replies: 11,
    interesting: 16,
    topics: ["Databases"],
    tools: ["PostgreSQL", "Migrations"],
    body: [
      "Renamed a column. Forgot that three views depended on it.",
      "The migration succeeded, which was the confusing part. Everything downstream did not.",
      "Backups existed. That is the only reason this is a Note and not a story.",
    ],
  },
  {
    slug: "turns-out-bindings-dont-do-what-i-thought",
    title: "Turns out bindings don't do what I thought.",
    handle: "rina",
    context: "learned",
    date: "Sep 02",
    readMinutes: 6,
    replies: 14,
    interesting: 22,
    topics: ["Web Hosting"],
    tools: ["Cloudflare", "Workers"],
    body: [
      "Second person this month to write about this, apparently.",
      "I expected configuration. I got a reference. Those are very different things.",
    ],
  },
  {
    slug: "local-llm-ran-out-of-ram",
    title: "I tried running a local LLM and ran out of RAM.",
    handle: "rina",
    context: "tried",
    date: "Aug 30",
    readMinutes: 4,
    replies: 7,
    interesting: 13,
    topics: ["Local AI"],
    tools: ["Ollama"],
    body: [
      "The model loaded. The laptop did not enjoy it.",
      "A smaller quantised build runs fine and is honestly good enough for what I wanted.",
    ],
  },
  {
    slug: "moved-personal-site-to-pages",
    title: "I moved my personal site from Vercel to Pages.",
    handle: "maya",
    context: "tried",
    date: "Sep 10",
    readMinutes: 6,
    replies: 8,
    interesting: 17,
    topics: ["Web Hosting"],
    tools: ["Cloudflare", "Pages", "Domains"],
    body: [
      "Mostly curiosity. Partly because I already had the domain there.",
      "Build settings took one attempt. DNS took three.",
    ],
  },
  {
    slug: "r2-object-storage-made-sense",
    title: "R2 finally made object storage make sense to me.",
    handle: "jon",
    context: "discovered",
    date: "Sep 08",
    readMinutes: 5,
    replies: 11,
    interesting: 21,
    topics: ["Object Storage"],
    tools: ["Cloudflare", "R2", "Storage"],
    body: [
      "I had used buckets before without ever really understanding what I was paying for.",
      "Watching the egress line stay flat is what made it click.",
    ],
  },
  {
    slug: "email-routing-wish-i-knew",
    title: "What I wish I knew before using Cloudflare for email routing.",
    handle: "kai",
    context: "learned",
    date: "Sep 05",
    readMinutes: 4,
    replies: 6,
    interesting: 9,
    topics: ["DNS"],
    tools: ["Cloudflare", "Email", "DNS"],
    body: [
      "Routing is forwarding. It is not a mailbox. I learned this after wondering where my sent mail went.",
      "The MX records are handled for you, which is lovely, right up until you already had MX records.",
    ],
  },
  {
    slug: "durable-objects-first-time",
    title: "I tried using Durable Objects for the first time.",
    handle: "lena",
    context: "tried",
    date: "Sep 03",
    readMinutes: 7,
    replies: 9,
    interesting: 15,
    topics: ["Web Performance"],
    tools: ["Cloudflare", "Durable Objects", "Real-time"],
    body: [
      "One object per room. That framing is what finally made the model usable for me.",
      "Everything before that was me trying to make a global variable behave.",
    ],
  },
  {
    slug: "reconsidering-where-i-need-a-database",
    title: "I'm reconsidering where I actually need a database.",
    handle: "derrick",
    context: "exploring",
    date: "Sep 09",
    readMinutes: 5,
    replies: 8,
    interesting: 12,
    topics: ["Databases"],
    tools: ["D1", "Workers"],
    body: [
      "Two of my three side projects would be fine with a file.",
      "Not a conclusion yet. Just a thought I keep having.",
    ],
  },
  {
    slug: "windows-desktop-app-into-web-app",
    title: "I tried turning a Windows desktop application into a web app.",
    handle: "derrick",
    context: "tried",
    date: "Sep 03",
    readMinutes: 7,
    replies: 14,
    interesting: 18,
    topics: ["Web Hosting"],
    tools: ["React", "Docker"],
    body: [
      "It went about as well as you'd expect for a first weekend.",
      "The interface ported quickly. The file system assumptions did not port at all.",
    ],
  },
];

export const noteById = (handle: string, slug: string) =>
  NOTES.find((n) => n.handle === handle && n.slug === slug);

export const notesByHandle = (handle: string) =>
  NOTES.filter((n) => n.handle === handle);

export const notesByContext = (context: ContextId) =>
  NOTES.filter((n) => n.context === context);

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const notesByTool = (tool: string) =>
  NOTES.filter((n) => n.tools.some((t) => norm(t) === norm(tool)));

export const notesByTopic = (topic: string) =>
  NOTES.filter((n) => n.topics.some((t) => norm(t) === norm(topic)));

export const slugify = norm;

export const ALL_TOOLS = Array.from(
  new Set(NOTES.flatMap((n) => n.tools)),
).sort();

export const ALL_TOPICS = Array.from(
  new Set(NOTES.flatMap((n) => n.topics)),
).sort();

export const unslug = (value: string) => {
  const tool = ALL_TOOLS.find((t) => norm(t) === value);
  if (tool) return tool;
  const topic = ALL_TOPICS.find((t) => norm(t) === value);
  if (topic) return topic;
  return value.replace(/-/g, " ");
};

export interface ObservingItem {
  handle: string;
  slug: string;
  when: string;
}

export const OBSERVING: ObservingItem[] = [
  { handle: "maya", slug: "gemini-and-gpt-same-project", when: "18 min ago" },
  { handle: "jon", slug: "bought-an-arduino", when: "2 hr ago" },
  { handle: "rina", slug: "local-llm-ran-out-of-ram", when: "Yesterday" },
  { handle: "kai", slug: "email-routing-wish-i-knew", when: "2 days ago" },
];
