import { lapidus } from "./debuffs.js";
import { zhongli } from "./my_characters.js";

export const char = zhongli;

export const lapidusAction = () => {
    return {
        char: zhongli,
        hits: [],
        delay: 2,
        team: {
            debuffs: [lapidus]
        }
    };
};