const basicEnemy = {
    lvl: 90,
    res: 0.10,
    resBuff: 0,
    resDebuff: 0,
    defDebuff: 0
};

let enemy = basicEnemy;

export const setCurrentEnemy = (newEnemy) => {
    enemy = newEnemy;
};

export const getCurrentEnemy = () => enemy;