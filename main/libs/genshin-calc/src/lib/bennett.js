import { bennett } from "./my_characters.js";
import { traitsModifiers } from "./traits.js";

export const char = bennett;

// level 90 override
traitsModifiers.BENNETT_ATK_BONUS = 1.26;

export const passionAction = () => {
    return {
        char: bennett,
        hits: [],
        delay: 4,
    };
};