# Figured Out Notes

Inktella — Complete Product & UI Development Brief [mostly depend on UI presentation attached] FYI

1. Product

Inktella is a network of public Notebooks for curious builders and makers.

It is for people who build, experiment, try tools, break things, discover things and figure things out — whether or not they consider themselves writers.

The central behavior is simple:

Do something → figure something out → keep a Note about it.

Inktella is not primarily a traditional blogging platform, newsletter service, tutorial site or social network.

People do not need to arrive thinking:

«I want to become a blogger.»

They can simply think:

«I've been messing with this thing. I want somewhere to Note what happened.»

The Network connects those Notes to other curious people.

---

2. Core Audience

Launch primarily for:

Developers and AI-assisted builders who learn by making things.

This includes:

- professional developers
- beginner developers
- vibe coders
- AI-assisted builders
- indie makers
- web developers
- no-code/low-code builders
- open-source tinkerers
- self-hosters
- people constantly experimenting with software and online tools

The Network should naturally support adjacent communities later:

- UI/UX designers
- graphic designers
- hardware/electronics makers
- Raspberry Pi and Arduino builders
- 3D artists and 3D-printing makers
- game developers
- automation builders
- data tinkerers
- creative technologists
- audio/video creators experimenting with technology

Do not design the product around professional credentials.

Curiosity matters more than expertise.

---

3. Core Philosophy

Inktella is based on:

Experience over authority.

Writers do not have to teach.

They do not have to be experts.

They do not have to produce definitive guides.

They can simply document what they experienced.

Good Inktella Notes include:

«I tried moving my app from Vercel to Cloudflare.»

«I thought adding a D1 binding connected my database. It didn't.»

«I finally understand what this Firebase setting actually does.»

«I bought an Arduino and now need something to build with it.»

«I spent the weekend trying local AI models.»

«I broke authentication again.»

«I bought another domain without knowing what I'll build.»

«I've been giving Gemini and GPT the same unfinished project.»

The culture should encourage:

Trying > pretending to know.

Curiosity > credentials.

Experience > generic advice.

---

4. Core Vocabulary

Use Inktella's terminology consistently.

Inktella

The entire Network.

Notebook

A person's publishing space within Inktella.

Note

An individual piece of writing.

Use Note, not Post or Article, wherever practical.

Discover

The Network-wide discovery experience.

Context

The state or reason behind a Note:

Building
Tried
Learned
Exploring
Broke
Discovered

Topic

What the Note is about.

Examples:

Authentication
Databases
Web Hosting
Local AI
Privacy
DNS
Object Storage

Tool

A specific technology/product/framework/hardware item involved.

Examples:

Cloudflare
Firebase
React
Gemini
Claude
Blender
Arduino

Observe

The action of keeping up with a Notebook.

Observer

Someone who Observes a Notebook.

Observing

The personalized area containing new Notes from Notebooks the reader Observes.

---

5. Do Not Use Traditional Social Vocabulary

Avoid making Inktella feel like another social network.

Prefer:

Observe

instead of:

Follow

Prefer:

Observers

instead of:

Followers

Prefer:

Note

instead of:

Post

Prefer:

Notebook

instead of:

Blog

Do not introduce:

Subscribers
Newsletter language
Influencer language
Creator economy language
Friend counts
Popularity scores

The product is about curiosity and writing, not status.

---

6. Product Structure

The Network is the primary product.

The structure is:

INKTELLA

↓

DISCOVER

What people across the Network are figuring out.

↓

CONTEXTS

Why they're writing about it.

↓

TOPICS & TOOLS

What they're actually working with.

↓

NOTES

The experiences themselves.

↓

NOTEBOOKS

The people behind those experiences.

↓

OBSERVE

Keep up with people whose curiosity interests you.

This creates multiple discovery paths:

Discover → Note → Notebook

Context → Note → Notebook

Topic → Note → Notebook

Tool → Note → Notebook

Search → Note/Notebook/Topic/Tool

Observing → New Note

The personal Notebook matters, but the Network should always feel larger than any individual Notebook.

---

7. Remove Categories

Do NOT use the previous Category system.

Remove:

Development
AI
Design
Hardware
No-Code
Self-Hosting
etc.

as platform Categories.

They are unnecessary because Topics and Tools already describe what something is about.

Instead use:

Context + Topics + Tools

Example:

Note

I thought adding D1 bindings connected everything automatically.

Context: Learned

Topics: Databases · Authentication

Tools: Cloudflare D1 · Firebase

This gives the Network enough structure without forcing Notes into broad taxonomies.

---

8. Read by Context

Contexts are a major Inktella discovery mechanism.

Use exactly six initial Contexts.

Building

In progress, right now.

For things someone is actively making.

Example:

«I'm trying to build my own analytics dashboard.»

---

Tried

An experiment and its result.

Example:

«I gave three AI coding agents the same broken project.»

---

Learned

A thing that finally clicked.

Example:

«I finally understand why my D1 binding wasn't doing anything.»

---

Exploring

Open question, thinking aloud.

Example:

«I'm starting to wonder whether every app actually needs accounts.»

---

Broke

It failed; here's what happened.

Example:

«I moved the project and authentication immediately stopped working.»

---

Discovered

Found something unexpected.

Example:

«I didn't realize Cloudflare could do this without another service.»

---

9. Context Rules

Contexts are controlled by Inktella.

Users cannot:

- create Contexts
- rename Contexts
- request Contexts
- create hashtags as replacements for Contexts

Every Note should have one primary Context.

Do not allow multiple Contexts on one Note at launch.

The writer should choose the Context that best describes why they're writing the Note.

---

10. Read by Context UI

Discover should contain a restrained section:

Read by context

Building
In progress, right now

Tried
An experiment and its result

Learned
A thing that finally clicked

Exploring
Open question, thinking aloud

Broke
It failed; here's what happened

Discovered
Found something unexpected

Do not turn these into giant colorful category cards.

Typography should do most of the work.

Clicking a Context opens its discovery page.

Example:

Broke

Things that didn't quite go according to plan.

Then show recent/relevant Notes from across the Network.

---

11. Topics

Topics describe what a Note discusses.

Examples:

Authentication
Databases
Web Hosting
DNS
Accessibility
Local AI
Open Source
Object Storage
Web Performance
Prompting
3D Printing

A Note can contain multiple Topics.

Topics can cross disciplines.

For example:

Authentication

might contain Notes involving:

Firebase
Auth.js
Supabase
Cloudflare
Google OAuth

Do not make Topics feel like hashtags.

They are structured discovery metadata.

---

12. Tools

Tools represent specific things someone is using, testing or discussing.

Examples:

Cloudflare
Vercel
Firebase
GitHub
React
Next.js
Docker
Gemini
ChatGPT
Claude
Figma
Blender
Arduino
Raspberry Pi

A Note can contain multiple Tools.

Tools are especially important because people naturally become curious about what other builders are doing with the same thing.

---

13. Topic & Tool Entry

When publishing, provide:

Topics & Tools

Typing should trigger autocomplete.

Example:

"Cloudf..."

suggest:

Cloudflare

Prefer existing entities.

Prevent duplicates such as:

Cloudflare
cloudflare
Cloud Flare
Cloudflare.com

from becoming separate Tools.

Where possible, automatically recognize whether something is a Topic or Tool.

The writer should not have to manage taxonomy.

---

14. Tool Discovery Pages

Tools should have dedicated Network pages.

Example:

Cloudflare

What people on Inktella are doing with Cloudflare.

Then:

I finally understand why my D1 binding wasn't doing anything

Learned

Derrick's Notebook · 4 min

---

I moved my little project from Vercel to Pages

Tried

Maya's Notebook · 6 min

---

R2 made object storage make sense to me

Discovered

Jon's Notebook · 5 min

These pages are not documentation.

Do NOT generate encyclopedia descriptions or generic tutorials.

The value is seeing real experiences involving that Tool.

---

15. Topic Discovery Pages

Use the same philosophy.

Example:

Authentication

Notes from people figuring out authentication.

Show relevant Notes across different Tools and Notebooks.

The Network becomes a collection of lived experiences around a subject.

---

16. Monetization

Reading Inktella is free.

Creating an account is free.

Opening and maintaining a Notebook costs:

$1/month

Use:

Start your Notebook — $1/month

Do NOT call this:

Premium
Pro
Creator Plan
Upgrade
Membership tier

There should initially be one Notebook plan.

---

17. What Free Users Can Do

A free account can:

- read Notes
- browse Discover
- browse Contexts
- browse Topics
- browse Tools
- search
- Observe Notebooks
- use Observing
- save Notes
- react
- participate in discussion where enabled
- manage their account

They do not need a Notebook to participate as readers.

---

18. Active Notebook

An active $1/month Notebook allows:

- publishing Notes
- maintaining a Notebook page
- organizing Notes
- creating Collections
- customizing the Notebook within the design system
- maintaining an About section
- inserting images
- inserting GIFs
- inserting supported embeds
- appearing in Discover
- appearing on Context pages
- appearing on Topic pages
- appearing on Tool pages
- receiving Observers

Payment makes Notes eligible for Network distribution.

It does NOT purchase ranking.

---

19. Subscription Expiry

Never hold someone's writing hostage.

If a Notebook expires:

- existing public Notes remain public
- URLs remain functional
- Notebook remains visible
- drafts remain saved
- publishing new Notes pauses
- editing/publishing capabilities can become read-only as appropriate

Show the owner:

Your Notebook is paused.

Your Notes are still here.

Restart your Notebook to publish again.

Restart Notebook — $1/month

Restarting restores publishing.

---

20. Visual Identity

Use the existing supplied UI presentation as the structural visual reference.

Replace PikPuk branding with Inktella.

The design should be:

Minimal
Typography-first
Editorial
Quiet
Professional
Curious
Modern
Personal

It should not look like:

a SaaS dashboard
a developer terminal
a corporate knowledge base
a social media feed
a traditional blogging theme

---

21. Typography First

The title of a Note is its primary visual object.

There are no featured images.

Do not use:

- feed thumbnails
- mandatory cover images
- giant illustrations
- image-led grids
- random Unsplash imagery
- generated decorative artwork

A Note containing nothing except text should look complete.

---

22. Media Philosophy

Images are allowed inside Notes.

GIFs are allowed inside Notes.

Embeds are allowed inside Notes.

Media supports the story.

It does not define the feed.

Never take an image from the Note body and automatically use it as its Discover thumbnail.

---

23. UI Style Rules

Use:

- generous whitespace
- excellent typography
- strong hierarchy
- comfortable reading width
- thin separators
- restrained borders
- minimal shadows
- subtle rounding
- quiet metadata
- excellent dark mode
- small Context labels
- subtle interaction states

Avoid:

- cards inside cards
- huge rounded SaaS panels
- unnecessary gradients
- oversized avatars
- giant statistics
- noisy sidebars
- follower-count emphasis
- reaction-count emphasis
- visual clutter

Minimal does not mean empty.

Structure and typography should create richness.

---

24. Desktop Navigation

Recommended:

Inktella

Discover

Observing

Topics & Tools

Search

Account

For Notebook owners:

+ Note

For readers without a Notebook:

Start Notebook

Do not add Categories.

---

25. Mobile Navigation

Recommended bottom navigation:

Discover

Observing

+ Note

Search

Me

If a user without an active Notebook taps + Note, show the Start Notebook flow.

Context, Topics and Tools can be accessed from Discover and Search rather than occupying permanent bottom-navigation slots.

---

26. Discover

Discover is the most important screen in Inktella.

Design it before obsessing over dashboards.

Suggested structure:

What people are figuring out.

Real Notes from curious builders and makers.

Then a mixed stream.

Example:

LEARNED

I finally understand why my Cloudflare binding wasn't doing anything.

Derrick · Derrick's Notebook · 4 min

Cloudflare · D1 · Authentication

────────────────────────────

BUILDING

I'm making a tiny analytics tool because apparently I needed another project.

Maya · Maya's Notebook · 6 min

Analytics · React · Cloudflare

────────────────────────────

BROKE

I moved authentication and immediately locked myself out.

Jon · Weekend Notebook · 3 min

Firebase · Authentication

No featured images.

Do not put every Note in a large card.

---

27. Discover Sections

Discover may include:

For you

Fresh Notes

Read by Context

Topics you're exploring

Tools people are using

From new Notebooks

But avoid turning Discover into a dashboard of dozens of modules.

The main experience should still be reading interesting Note titles.

---

28. New Notebook Discovery

A person with zero Observers must still be discoverable.

Ranking should consider:

- relevance
- Context
- Topics
- Tools
- freshness
- reading engagement
- quality signals
- reader interests

Do not rank purely by:

Observer count
reaction count
existing popularity

Inktella should allow an excellent first Note to travel.

---

29. Notebook Page

A Notebook is a small personal site within the Network.

Example:

Derrick's Notebook

@derrick

Things I'm building, trying and occasionally breaking.

Cloudflare · AI · Firebase · Domains

Observe

Navigation:

Notes     Collections     About

Then Notes.

Do not design this like Instagram.

Avoid:

- giant profile photos
- giant cover banners
- follower/following displays
- social statistics
- content grids

The writing is the profile.

---

30. Notebook Control

Notebook owners should have meaningful control over their space while remaining inside Inktella's design system.

Allow:

- Notebook title
- username
- avatar
- introduction/bio
- website links
- relevant social links
- About page
- pinned Note
- Collections
- navigation arrangement
- homepage blocks
- appearance
- light/dark/system
- restrained accent choices
- curated typography options
- section ordering

Do not make Inktella a full website builder.

No arbitrary CSS at launch.

---

31. Notebook Blocks

Possible controlled blocks:

Introduction

Latest Notes

Pinned Note

Collection

Currently Exploring

Project

Topics & Tools

About

The owner can:

enable
disable
reorder

This provides personal control without destroying visual consistency.

---

32. Collections

Collections belong to individual Notebooks.

Examples:

Building Scruttin

Playing With AI

Cloudflare Adventures

Domains I Probably Didn't Need

Things I Learned

Collections organize one person's Notes.

They are not Network Topics.

---

33. Observe

The primary relationship between readers and Notebook owners is:

Observe

After tapping:

Observing

The person becomes an:

Observer

Example:

24 Observers

Observer counts should remain subtle.

Do not use them as status indicators.

The meaning of Observe is simply:

«I want to see what this person figures out next.»

---

34. Observing

Observing should feel like checking in on people whose work interests you.

Example:

Observing

Recent     Notebooks

Maya added a Note

I gave Gemini and Claude the same unfinished project.

Tried · 18 min ago

---

Jon added a Note

My Raspberry Pi is finally doing something useful.

Building · 2 hr ago

The Notebooks tab shows everyone currently being Observed.

Avoid aggressive engagement mechanics.

---

35. Notifications

Keep notifications useful.

Examples:

Derrick added a new Note.

Someone replied to your Note.

Maya started Observing your Notebook.

Do not send meaningless engagement notifications merely to pull people back into the app.

---

36. Note View

A Note page should become extremely quiet.

Example:

← Derrick's Notebook

LEARNED · SEP 12 · 4 MIN

I finally understand why my Cloudflare binding wasn't doing anything.

Derrick

────────────────────────────

[Note body]

Inline screenshot if needed.

More writing.

Code block if needed.

Embedded demo if needed.

At the bottom:

Interesting

Save

Share

Then:

Topics & Tools

Cloudflare · D1 · Authentication

Then:

More from Derrick's Notebook

Do not surround Notes with unrelated feeds.

When someone is reading, let them read.

---

37. Reactions

Keep reactions simple.

Use:

Interesting

This communicates:

«This was worth reading.»

Do not launch with six emoji reactions.

Do not make reaction totals visually dominant.

---

38. Save

Readers can privately Save Notes.

Saved Notes should be accessible through the account area.

Saving is private by default.

---

39. Discussion

If discussion is supported, keep it attached to the Note.

Use:

What are you thinking?

Avoid deeply nested Reddit-style threads where conversation drifts far away from the original Note.

The Note owner and original Note should remain central.

---

40. Compose Note

The editor must feel much lighter than a CMS.

Suggested:

New Note

Title

What are you figuring out?

Note

Start writing...

Formatting tools

---

Context

Choose one:

Building

Tried

Learned

Exploring

Broke

Discovered

---

Topics & Tools

Search or add...

---

Publish

Autosave should happen automatically.

Show quietly:

Saved

---

41. Editor Formatting

Support:

- headings
- bold
- italic
- links
- lists
- blockquotes
- inline code
- code blocks
- images
- GIFs
- embeds

Do not clutter the editor with:

SEO scores
keyword fields
featured image
marketing controls
newsletter settings
complex CMS metadata

---

42. Images & GIFs

Images and GIFs are inserted contextually within the Note body.

Good uses:

- screenshots
- diagrams
- prototypes
- UI states
- bugs
- before/after examples
- 3D projects
- hardware projects
- short GIF demonstrations

Optimize media appropriately.

Do not display it as Discover imagery.

---

43. Embeds

Support safe responsive embeds where practical.

Examples:

YouTube
GitHub
CodePen
Figma
audio
video
project demos
supported social content

If an embed cannot render, fall back gracefully to a normal link.

---

44. Search

Search is a major Network tool.

Search across:

Notes

Notebooks

Topics

Tools

Potentially Contexts where useful.

Example query:

Cloudflare

Results:

TOOL

Cloudflare

NOTES

I finally understand D1 bindings

Moving my site from Vercel to Pages

What surprised me about R2

NOTEBOOKS

Relevant Notebooks where appropriate

Search should help people enter the Network through things they're already curious about.

---

45. Topics & Tools on Notebook Pages

A Notebook can show what its owner frequently writes about.

Example:

Often noting about

Cloudflare · Gemini · Firebase · Domains

Do not call these:

Skills
Expertise
Credentials

Someone writing frequently about Cloudflare is not necessarily claiming to be a Cloudflare expert.

They may simply be figuring it out.

---

46. Logged-Out Homepage

The homepage should show the Network quickly.

Do not build a huge SaaS marketing page before showing actual Notes.

Suggested:

INKTELLA

Discover · Topics & Tools · Sign in

What people are figuring out.

Inktella is a network of Notebooks from people building, trying and figuring things out.

[Live Notes]

↓

Read by context

Building
Tried
Learned
Exploring
Broke
Discovered

↓

[More Notes]

↓

Always building something?

Keep Notes along the way.

Start your Notebook — $1/month

↓

Topics & Tools people are currently writing about.

The product itself should be the marketing.

---

47. Start Notebook Page

Keep pricing extremely simple.

Start your Notebook

A place for what you're building, trying and figuring out — connected to the Inktella Network.

$1/month

Your Notebook includes:

✓ Publish Notes
✓ Your own Notebook page
✓ Organize with Collections
✓ Images, GIFs and embeds
✓ Network discovery
✓ Context discovery
✓ Topic & Tool discovery
✓ Observers
✓ Simple writing experience

Start my Notebook — $1/month

No pricing comparison table.

No artificial tiers.

---

48. Onboarding

Reader onboarding can ask:

What are you curious about?

Instead of asking for broad professional Categories, recommend actual Topics and Tools.

Example:

Cloudflare
AI
React
Firebase
Blender
Self-hosting
Arduino
3D Printing
Game Development
Local AI
Figma

Allow search.

Use selections to improve Discover.

Do not ask:

Job title
Company
Years of experience
Expertise level

---

49. Sharing

Notes should generate beautiful typography-based social preview cards.

Example:

INKTELLA

I finally understand why my Cloudflare binding wasn't doing anything.

LEARNED

Derrick's Notebook

Cloudflare · D1

No featured image required.

Typography becomes the visual identity.

---

50. Responsive Design

Inktella must work beautifully on mobile.

Prioritize:

- comfortable reading
- fast Discover browsing
- simple Note writing
- easy Observe
- easy Save
- accessible Context selection
- responsive code blocks
- responsive embeds
- comfortable touch targets

Desktop can expose more Notebook customization controls.

Do not make mobile feel like a squeezed desktop dashboard.

---

51. Empty States

Use Inktella language.

No Notes:

Nothing noted yet.

No Observing activity:

Your Observing feed is quiet.

Explore Inktella and Observe Notebooks you'd like to hear from again.

Empty editor:

What are you figuring out?

No Tools:

What are you using?

Avoid generic SaaS language.

---

52. Account vs Notebook

Maintain a technical distinction between:

Account

Free identity used for reading and Network participation.

Notebook

Paid publishing entitlement.

Do not make billing state equivalent to authentication state.

A user remains a valid Inktella user after their Notebook subscription expires.

---

53. Billing Architecture

Notebook access must be enforced server-side.

Maintain an entitlement such as:

"notebook_status"

Possible states:

"none"

"active"

"past_due"

"paused"

"cancelled"

"expired"

Do not trust frontend state for publishing authorization.

Use payment-provider webhooks as the authoritative source for subscription changes.

Webhook processing must be idempotent.

---

54. Existing Users During Rebrand

Do not break existing accounts or Notes.

Migration should:

- rename PikPuk branding to Inktella
- preserve account IDs
- preserve Note IDs
- preserve Notebook ownership
- preserve drafts
- preserve media
- preserve Observing relationships
- preserve reactions
- preserve discussions
- preserve URLs where possible or create redirects
- migrate old Category metadata into Topics/Tools where appropriate

Do not automatically delete old Category data until migration is verified.

---

55. Category Migration

Because Categories are being removed:

Map useful existing categories into Topics where appropriate.

Examples:

Development → Development topic if still useful

AI → AI topic

Self-Hosting → Self-Hosting topic

Hardware → Hardware topic

Do NOT automatically assign a Context from an old Category.

Context describes the writer's reason/state and cannot reliably be inferred from broad subject categories.

For existing Notes without Context, use a neutral migration strategy such as:

Unspecified

internally until the writer edits the Note, or hide Context visually for legacy Notes.

Do not fabricate meaning.

---

56. URLs

Prefer readable URLs.

Examples:

"inktella.com/@derrick"

"inktella.com/@derrick/my-first-cloudflare-experiment"

Topic:

"inktella.com/topic/authentication"

Tool:

"inktella.com/tool/cloudflare"

Context:

"inktella.com/context/broke"

Exact implementation may differ based on existing architecture, but URLs should remain stable.

---

57. SEO

Public Notes should be indexable.

Public Notebook pages should be indexable.

Topic and Tool discovery pages can be indexable when they contain meaningful Network content.

Avoid generating thousands of thin automated pages.

Do not create generic AI-written descriptions merely to rank.

The actual Notes are the value.

Use:

proper titles
meta descriptions
canonical URLs
Open Graph metadata
structured data where appropriate
XML sitemaps

---

58. Performance

The typography-first architecture should make Inktella fast.

Prioritize:

- server rendering/static rendering where appropriate
- cached public Note pages
- minimal JavaScript
- lazy-loaded media
- optimized images
- responsive embeds
- efficient search
- pagination/incremental loading
- database indexes for discovery relationships

Avoid shipping large libraries for tiny visual effects.

---

59. Accessibility

Support:

- semantic HTML
- keyboard navigation
- visible focus states
- screen readers
- sufficient contrast
- reduced motion
- scalable typography
- accessible editor controls
- descriptive media alt text
- accessible Context selector
- proper form labels

Minimalism must remain accessible.

---

60. Moderation

Inktella must have basic moderation from launch.

Support:

- report Note
- report Notebook
- report discussion/reply
- block/mute where appropriate
- admin review
- remove Note
- suspend Notebook
- suspend account
- restore content where appropriate

Keep moderation architecture extensible.

---

61. Admin

Admin should manage:

Accounts

Notebooks

Notebook subscription status

Notes

Contexts

Topics

Tools

Topic/Tool duplicates

Reports

Moderation

Collections where necessary

Manual Notebook entitlement

Context definitions should be editable by administrators technically, but users should not be able to create or alter them.

---

62. Network Growth Loop

The primary growth loop is:

Someone discovers a Note.

↓

Reads it.

↓

Clicks its Tool or Topic.

↓

Reads other people's experiences.

↓

Finds a Notebook they like.

↓

Taps Observe.

↓

Returns through Observing when that person adds another Note.

↓

The reader also builds things.

↓

Eventually thinks:

«I could keep Notes about what I'm doing too.»

↓

Start Notebook — $1/month

↓

They publish.

↓

Their Note enters Discover, Context, Topic and Tool discovery.

↓

Another person finds them.

That is the Inktella Network loop.

---

63. Do Not Optimize for “Content Creators”

The desired user should not need:

an audience strategy
a newsletter
a content calendar
SEO expertise
personal branding
professional writing skills

Someone who publishes three Notes this month and none next month is still using Inktella correctly.

A Notebook is ongoing, not scheduled.

---

64. Content Quality Philosophy

Do not require Notes to be long.

A useful Note could be:

300 words
1,500 words
a screenshot and explanation
a code snippet and observation
an experiment report
a question being explored

Do not reward length for its own sake.

The important thing is that the writer is sharing something genuinely connected to what they did, tried, learned, broke, discovered or are exploring.

---

65. AI

If AI assistance exists, it must not turn Inktella into an AI-content factory.

AI may help with:

grammar
clarity
formatting
title suggestions
topic/tool suggestions
summarizing the writer's own draft

Do not encourage:

one-click article generation
SEO article generation
mass publishing
fake first-person experiences

The writer's experience is the valuable part.

---

66. Main UI Test

For every feature ask:

«Does this make writing easier, reading better, or the Network more useful?»

If the answer is no, reconsider it.

For every discovery feature ask:

«Does this help someone find another person's real experience with something they're curious about?»

For every Notebook feature ask:

«Does this help someone maintain their Notebook without turning them into a professional publisher?»

---

67. Product Personality Test

Inktella should never make someone feel:

«I need to know enough before I'm allowed to write about this.»

It should make them feel:

«I'm figuring this out. That's exactly what I can write about.»

That cultural distinction is essential.

---

68. Final Product Definition

Inktella is a network of Notebooks for curious builders and makers.

People keep Notes about what they're:

Building

Trying

Learning

Exploring

Breaking

Discovering

Topics and Tools connect those experiences across the Network.

Readers Discover Notes, explore shared interests and Observe Notebooks they want to hear from again.

Reading and participating in the Network is free.

Maintaining a publishing Notebook costs $1/month.

There are no featured images, no pressure to become a blogger, no requirement to be an expert and no need to build a newsletter audience.

The experience is typography-first, quiet and focused on the actual things people are figuring out.

Inktella

Build something. Try something. Figure something out.

Keep Notes along the way.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/798c42cb-2441-42df-91d0-f1c21d7d9a25).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
