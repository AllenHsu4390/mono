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
import { hutao_xingqiu_albedo_zhongli, raiden_xingqiu_xiangling_bennett, yoimiya_xingqiu_fischl_zhongli, yoimiya_xingqiu_fischl_bennett, yoimiya_xingqiu_albedo_zhongli, hutao_xingqiu_fischl_zhongli, raiden_mona_jean_bennett, ganyu_xiangling_bennett_zhongli, eula_raiden_albedo_zhongli, eula_fischl_albedo_zhongli, eula_raiden_lisa_zhongli, yoimiya_xingqiu_bennett_zhongli, yoimiya_fischl_albedo_zhongli, yoimiya_fischl_bennett_zhongli, xiao_jean_albedo_zhongli, xingqiu_xiangling_bennett_zhongli, xiao_jean_fischl_zhongli, hutao_xingqiu_sara_zhongli, eula_raiden_rosaria_zhongli, eula_fischl_lisa_diona, hutao_xingqiu_sucrose_xinyan, xingqiu_xiangling_bennett_sucrose, yoimiya_xingqiu_sucrose_xinyan, yoimiya_xingqiu_sara_zhongli, xiao_jean_bennett_zhongli, xiao_raiden_albedo_zhongli, raiden_xingqiu_yoimiya_zhongli, itto_xingqiu_albedo_gorou, itto_raiden_albedo_gorou, itto_fischl_albedo_gorou, xiao_raiden_bennett_zhongli, itto_bennett_albedo_gorou } from './teams.js';

var args = process.argv.slice(2);

console.log(`-------Damage Calcs for ${args[0]}--------`);

export const print = (command) => {
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
        case 'itto':
            itto.print();
            break;
        case 'teams':
            yoimiya_xingqiu_fischl_zhongli();
            yoimiya_xingqiu_bennett_zhongli();
            yoimiya_xingqiu_sara_zhongli();
            yoimiya_xingqiu_albedo_zhongli();
            //yoimiya_fischl_bennett_zhongli();
            //yoimiya_fischl_albedo_zhongli();
            yoimiya_xingqiu_fischl_bennett();
            yoimiya_xingqiu_sucrose_xinyan();
            console.log("");
            hutao_xingqiu_albedo_zhongli();
            hutao_xingqiu_fischl_zhongli();
            hutao_xingqiu_sucrose_xinyan();
            hutao_xingqiu_sara_zhongli();
            console.log("");
            raiden_xingqiu_xiangling_bennett();
            raiden_mona_jean_bennett();
            raiden_xingqiu_yoimiya_zhongli();
            console.log("");
            ganyu_xiangling_bennett_zhongli();
            console.log("");
            eula_raiden_albedo_zhongli();
            eula_fischl_albedo_zhongli();
            eula_raiden_lisa_zhongli();
            eula_raiden_rosaria_zhongli();
            eula_fischl_lisa_diona();
            //eula_lisa_albedo_zhongli();
            console.log("");
            xiao_jean_albedo_zhongli();
            xiao_jean_fischl_zhongli();
            xiao_jean_bennett_zhongli();
            xiao_raiden_albedo_zhongli();
            xiao_raiden_bennett_zhongli();
            //xiao_jean_xiangling_bennett();
            console.log("");
            xingqiu_xiangling_bennett_zhongli();
            xingqiu_xiangling_bennett_sucrose();
            console.log("");
            itto_xingqiu_albedo_gorou();
            itto_raiden_albedo_gorou();
            itto_fischl_albedo_gorou();
            itto_bennett_albedo_gorou();
            break;
        default:
            console.log('Who?');
    }
};

print(args[0]);