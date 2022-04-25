/* Create user account */
INSERT INTO user (email, avatarUrl)
VALUES (
        'testuser@testland',
        'https://source.unsplash.com/random/300x300'
    );
SET @my_user = LAST_INSERT_ID();
INSERT INTO creator (name, description, avatarUrl)
VALUES (
        "myCreations",
        "Lorem ipsum something i dont know",
        'https://source.unsplash.com/random/300x300'
    );
/* Create creator account */
INSERT INTO user (email, avatarUrl)
VALUES (
        'testuser2@testland',
        'https://source.unsplash.com/random/300x300'
    );
SET @creator_user = LAST_INSERT_ID();
INSERT INTO creator (name, description, avatarUrl, userId)
VALUES (
        "apes420",
        "Hi, I'm a creator. I make cool things. Check out my work!",
        'https://source.unsplash.com/random/300x300',
        @creator_user
    );
SET @creator_id = LAST_INSERT_ID();
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/545',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/863',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/156',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/668',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/323',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/764',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/434',
        @creator_id
    )
INSERT INTO asset (src, creatorId)
VALUES (
        'https://source.unsplash.com/collection/234',
        @creator_id
    )
    /* Add follow from user to creator */
INSERT INTO follow (userId, creatorId)
VALUES (@my_user, @creator_id)
    /* Add initial mint to users */
INSERT INTO transaction (userId, type, credit, debit, createdAt)
VALUES (@my_user, 'mint', 1000, 0, NOW());
INSERT INTO transaction (userId, type, credit, debit, createdAt)
VALUES (@creator_user, 'mint', 1000, 0, NOW());