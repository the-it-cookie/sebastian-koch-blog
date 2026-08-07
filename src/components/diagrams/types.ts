/** Shared shapes for the article diagrams. */

export interface ChainStep {
	text: string;
	/** Small line underneath, for the "why" of a step. */
	note?: string;
	/** The step the surrounding prose is about. */
	pivot?: boolean;
	/** Renders the connector out of this step as dashed. */
	dashed?: boolean;
}

export interface SequenceRow {
	/** Actor doing the thing, e.g. "script" or "platform". */
	from?: string;
	/** Actor or surface being acted on, e.g. "DOM". */
	to?: string;
	text: string;
	/** `rest` is a deliberate wait, `note` is an observation about the outcome. */
	kind?: 'step' | 'rest' | 'note';
	/** Marks the row that decides whether this sequence works. */
	pivot?: boolean;
}
