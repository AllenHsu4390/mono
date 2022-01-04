let outputStr = '';

export const output = (str) => {
    outputStr += str + '\n';
};

export const getOutputString = () => {
    return outputStr;
};