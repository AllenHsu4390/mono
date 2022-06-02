
SET @user_email = "test1@testland.com"


INSERT INTO creator (name, description, avatarUrl, createdAt, updatedAt)
VALUES ("creator_name",
        "Default description for creator",
        'https://source.unsplash.com/random/300x300',
        NOW(),
        NOW());
SET @creator_id = LAST_INSERT_ID();

INSERT INTO daily_top_up (createdAt, updatedAt)
VALUES (NOW(), NOW());
SET @daily_top_up_id = LAST_INSERT_ID();

INSERT INTO user (email, creatorId, dailyTopUpId, createdAt, updatedAt)
VALUES (@user_email,
        @creator_id,
        @daily_top_up_id,
        NOW(),
        NOW());
SET @user_id = LAST_INSERT_ID();