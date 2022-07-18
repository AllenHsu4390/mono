const team = {
    chars: [],
    buffs: [],
    debuffs: [],
};

let currentTeam = team;

export const setCurrentTeam = (newTeam) => {
    currentTeam = newTeam;
};

export const getCurrentTeam = () => currentTeam;

export const resetCurrentTeam = () => currentTeam = team;