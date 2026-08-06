/** Difficulty, in chef's hats (DESIGN_august.md §5). */
export type Difficulty = 'easy' | 'medium' | 'advanced';

export const DIFFICULTY_TOQUES: Record<Difficulty, number> = {
	easy: 1,
	medium: 2,
	advanced: 3,
};
