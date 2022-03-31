import { gorou } from "./my_characters.js";

export const char = gorou;

export const bannerAction = () => {
    return {
        char: gorou,
        hits: [],
        delay: 2
    };
};