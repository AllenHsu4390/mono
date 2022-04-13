INSERT INTO user (email, avatarUrl) VALUES ('testuser@testland', 'https://source.unsplash.com/random/300x300');
INSERT INTO creator (description, avatarUrl) VALUES ("Hi, I'm a creator. I make cool things. Check out my work!", 'https://source.unsplash.com/random/300x300');

SET @creator_id = LAST_INSERT_ID();

INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/545', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/863', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/156', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/668', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/323', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/764', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/434', @creator_id)
INSERT INTO asset (src, creatorId) VALUES ('https://source.unsplash.com/collection/234', @creator_id)