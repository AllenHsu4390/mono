let outputStr = '';

const dmgOutputs = [];

export const getOutputString = (sorted = false) => {
    if (sorted) {
        dmgOutputs.sort((a, b) => b.dmg - a.dmg);
        return dmgOutputs.reduce((accum, d) => accum + d.str + '\n', '');
    }

    return outputStr;
};

export const output = (str) => {
    const regex = /([0-9]+),([0-9]+ dps)/;
    const found = str.match(regex);
    if (found) {
        dmgOutputs.push({
            dmg: parseFloat(found[0].split('dps')[0].replace(/,/g, '')),
            str
        });
    }
    outputStr += str + '\n';
};