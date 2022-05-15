

START TRANSACTION;
USE creator_network;

/* Create creators */
INSERT INTO creator (name, description, avatarUrl, createdAt, updatedAt)
VALUES (
        "me123",
        "Hey I'm a fan. I use the site to like creator's works",
        'https://source.unsplash.com/random/300x300',
        NOW(),
        NOW()
    );
SET @user_creator_id = LAST_INSERT_ID();

INSERT INTO creator (name, description, avatarUrl, createdAt, updatedAt)
VALUES (
        "apes420",
        "Hi, I'm a creator. I make cool things. Check out my work!",
        'https://source.unsplash.com/random/300x300',
        NOW(),
        NOW()
    );
SET @creator_id = LAST_INSERT_ID();

/* Create dailyTopUps */
INSERT INTO daily_top_up (createdAt, updatedAt)
VALUES (NOW(), NOW());
SET @user_dailytopup_id = LAST_INSERT_ID();

INSERT INTO daily_top_up (createdAt, updatedAt)
VALUES (NOW(), NOW()) ;
SET @creator_dailytopup_id = LAST_INSERT_ID();

/* Create users */
INSERT INTO user (email, creatorId, dailyTopUpId, createdAt, updatedAt)
VALUES ('test1@testland.com',
        @user_creator_id,
        @user_dailytopup_id,
        NOW(),
        NOW());
SET @my_user = LAST_INSERT_ID();
INSERT INTO user (email, creatorId, dailyTopUpId, createdAt, updatedAt)
VALUES ('test2@testland.com', @creator_id, @creator_dailytopup_id, NOW(), NOW());
SET @creator_user = LAST_INSERT_ID();

/* Create assets */
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/545',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/863',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/156',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/668',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/323',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/764',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/434',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/234',
        @creator_id, NOW(), NOW()
    );

INSERT INTO follow (userId, creatorId, createdAt, updatedAt)
VALUES (@my_user, @creator_id, NOW(), NOW());

/* Create creator account 1 */
INSERT INTO creator (name, description, avatarUrl, createdAt, updatedAt)
VALUES (
        "blarg",
        "something something something",
        'https://source.unsplash.com/random/300x300',
        NOW(),
        NOW()
    );
SET @creator_id = LAST_INSERT_ID();
INSERT INTO daily_top_up (createdAt, updatedAt)
VALUES (NOW(), NOW());
SET @dailytopup_id = LAST_INSERT_ID();
INSERT INTO user (email, creatorId, dailyTopUpId, createdAt, updatedAt)
VALUES ('test3@testland.com', @creator_id, @dailytopup_id, NOW(), NOW());
SET @creator_user = LAST_INSERT_ID();

INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/540',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/862',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/152',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/658',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/363',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/714',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/474',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/264',
        @creator_id, NOW(), NOW()
    );

INSERT INTO follow (userId, creatorId, createdAt, updatedAt)
VALUES (@my_user, @creator_id, NOW(), NOW());

/* Create creator account 2 */
INSERT INTO creator (name, description, avatarUrl, createdAt, updatedAt)
VALUES (
        "fooooo",
        "I'm foooooooooooo",
        'https://source.unsplash.com/random/300x300',
        NOW(),
        NOW()
    );
SET @creator_id = LAST_INSERT_ID();
INSERT INTO daily_top_up (createdAt, updatedAt)
VALUES (NOW(), NOW());
SET @dailytopup_id = LAST_INSERT_ID();
INSERT INTO user (email, creatorId, dailyTopUpId, createdAt, updatedAt)
VALUES ('test4@testland.com', @creator_id, @dailytopup_id, NOW(), NOW());
SET @creator_user = LAST_INSERT_ID();

INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/412',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/124',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/631',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/123',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/111',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/222',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/434',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/424',
        @creator_id, NOW(), NOW()
    );

    INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/664',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/326',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/768',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/414',
        @creator_id, NOW(), NOW()
    );
INSERT INTO asset (src, creatorId, createdAt, updatedAt)
VALUES (
        'https://source.unsplash.com/collection/235',
        @creator_id,
        NOW(), NOW()
    );

INSERT INTO follow (userId, creatorId, createdAt, updatedAt)
VALUES (@my_user, @creator_id, NOW(), NOW());


/* Add initial mint to users */
INSERT INTO transaction (userId, type, credit, debit, createdAt, updatedAt)
VALUES (@my_user, 'mint', 1000, 0, NOW(), NOW());
INSERT INTO transaction (userId, type, credit, debit, createdAt, updatedAt)
VALUES (@creator_user, 'mint', 1000, 0, NOW(), NOW());

ROLLBACK;
COMMIT;
