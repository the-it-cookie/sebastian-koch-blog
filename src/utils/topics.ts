/**
 * Topic metadata — the bridge between the free-form tags on posts and the
 * hand-drawn icon set in `src/icons/categories`.
 *
 * DESIGN_august.md §1: categories are never distinguished by colour, only by
 * icon. Every chip on the site uses the same sage surface; the drawing is what
 * tells them apart. Anything not listed here falls back to the pot.
 */

export interface TopicMeta {
	/** File name (without extension) in src/icons/categories. */
	icon: string;
	/** One sentence for the topic page header. */
	blurb: string;
}

const TOPICS: Record<string, TopicMeta> = {
	'power apps': {
		icon: 'power-apps',
		blurb: 'Model-driven and canvas apps: forms, business logic, and the details that decide whether people actually use what you built.',
	},
	'power platform': {
		icon: 'power-apps',
		blurb: 'The platform as a whole — solutions, environments, ALM, and the patterns that hold across all of it.',
	},
	'dynamics 365': {
		icon: 'dynamics-365',
		blurb: 'Dynamics 365 in production: the data model, the customisations, and what it takes to keep both maintainable.',
	},
	dataverse: {
		icon: 'dynamics-365',
		blurb: 'The layer everything else sits on: tables, relationships, plugins, and the security model most projects get wrong once.',
	},
	'power automate': {
		icon: 'power-automate',
		blurb: 'Flows that run on the first attempt and keep running: error handling, throttling, and the traps that only show up in production.',
	},
	'code app': {
		icon: 'code-app',
		blurb: 'Where low-code stops and real code starts — plugins, custom APIs, and the code you keep instead of clicking around it.',
	},
	javascript: {
		icon: 'code-app',
		blurb: 'Form scripts, web resources and the browser-side work that still carries a surprising amount of a Dynamics project.',
	},
	'customer insights - journeys': {
		icon: 'customer-insights-journeys',
		blurb: 'Real-time marketing that survives contact with legal: journeys, triggers, forms, and consent that actually holds up.',
	},
	'customer insights journeys': {
		icon: 'customer-insights-journeys',
		blurb: 'Real-time marketing that survives contact with legal: journeys, triggers, forms, and consent that actually holds up.',
	},
	marketing: {
		icon: 'marketing',
		blurb: 'Campaigns, segments and the plumbing underneath them — the parts nobody demos but everybody depends on.',
	},
	consent: {
		icon: 'marketing',
		blurb: 'Double opt-in, purposes, topics and audit trails: what you have to be able to prove, and how to store it so you can.',
	},
	'copilot studio': {
		icon: 'copilot-studio',
		blurb: 'Agents that answer from your own data without inventing anything — topics, knowledge sources, and where to draw the line.',
	},
	ai: {
		icon: 'ai',
		blurb: 'AI put to work on real Dynamics problems, with data protection treated as a requirement rather than an afterthought.',
	},
	copilot: {
		icon: 'ai',
		blurb: 'Copilot in the Power Platform: what it is genuinely good at, and where it still needs a human at the pass.',
	},
};

const FALLBACK: TopicMeta = { icon: 'default', blurb: '' };

export function topicMeta(tag: string): TopicMeta {
	const meta = TOPICS[tag.trim().toLowerCase()];
	if (meta) return meta;
	return { ...FALLBACK, blurb: `Everything on the site filed under ${tag}.` };
}

export function topicIcon(tag: string): string {
	return topicMeta(tag).icon;
}
