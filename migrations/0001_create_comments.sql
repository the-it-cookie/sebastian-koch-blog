CREATE TABLE comments (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	post_slug TEXT NOT NULL,
	parent_id INTEGER REFERENCES comments(id),
	author_name TEXT NOT NULL,
	body TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'pending',
	created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_comments_post_slug ON comments(post_slug);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_status ON comments(status);
