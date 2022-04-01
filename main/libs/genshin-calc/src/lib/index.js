import * as xingqiu from './xingqiu.js';
import * as xiangling from './xiangling.js';
import * as yoimiya from './yoimiya.js';
import * as hutao from './hutao.js';
import * as xiao from './xiao.js';
import * as raiden from './raiden.js';
import * as eula from './eula.js';
import * as ganyu from './ganyu.js';
import * as fischl from './fischl.js';
import * as albedo from './albedo.js';
import * as itto from './itto.js';
import * as ayaka from './ayaka.js';
import * as shenhe from './shenhe.js';
import * as yunjin from './yunjin.js';
import * as rosaria from './rosaria.js';
import * as diluc from './diluc.js';
import * as jean from './jean.js';
import * as sara from './sara.js';
import * as yae from './yae.js';
import * as ayato from './ayato.js';
import * as teams from './teams.js';

import { getOutputString, output } from './output.js';
export { getOutputString } from './output.js';

var args = process.argv.slice(2);

export const print = (command, searches = []) => {
    output(`-------Damage Calcs for ${command}${` ${searches.join(" ")}`}--------`);
    switch (command) {
        case 'xiangling':
            xiangling.print();
            break;
        case 'xingqiu':
            xingqiu.print();
            break;
        case 'yoimiya':
            yoimiya.print();
            break;
        case 'hutao':
            hutao.print();
            break;
        case 'xiao':
            xiao.print();
            break;
        case 'raiden':
            raiden.print();
            break;
        case 'eula':
            eula.print();
            break;
        case 'ganyu':
            ganyu.print();
            break;
        case 'fischl':
            fischl.print();
            break;
        case 'albedo':
            albedo.print();
            break;
        case 'itto':
            itto.print();
            break;
        case 'ayaka':
            ayaka.print();
            break;
        case 'shenhe':
            shenhe.print();
            break;
        case 'yunjin':
            yunjin.print();
            break;
        case 'rosaria':
            rosaria.print();
            break;
        case 'diluc':
            diluc.print();
            break;
        case 'jean':
            jean.print();
            break;
        case 'sara':
            sara.print();
            break;
        case 'yae':
            yae.print();
            break;
        case 'ayato':
            ayato.print();
            break;
        case 'teams':
            if (searches.length > 0) {
                Object
                    .keys(teams)
                    .filter((key) => searches.filter((search) => key.includes(search)).length === searches.length)
                    .reduce((foundMap, teamKey) => foundMap.set(teamKey, teams[teamKey]), new Map())
                    .forEach((team) => team());
                break;
            }
            Object
                .keys(teams)
                .reduce((foundMap, teamKey) => foundMap.set(teamKey, teams[teamKey]), new Map())
                .forEach((team) => team());
                break;
        default:
            output('Who?');
    }
};

print(args[0], args.slice(1));
console.log(getOutputString());