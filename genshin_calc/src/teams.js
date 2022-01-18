import { teamDamageDps } from './damage.js';
import { stats } from './stats.js';
import * as yoimiya from './yoimiya.js';
import * as xingqiu from './xingqiu.js';
import * as xiangling from './xiangling.js';
import * as fischl from './fischl.js';
import * as hutao from './hutao.js';
import * as raiden from './raiden.js';
import * as ganyu from './ganyu.js';
import * as eula from './eula.js';
import * as xiao from './xiao.js';
import * as albedo from './albedo.js';
import * as bennett from './bennett.js';
import * as zhongli from './zhongli.js';
import * as gorou from './gorou.js';
import * as sucrose from './sucrose.js';
import * as jean from './jean.js';
import * as itto from './itto.js';
import { cinnabar, harbinger, lionroarR5, sacSword } from './swords.js';
import { circlet_10, circlet_11, circlet_12, circlet_13, circlet_20, circlet_23, circlet_3, circlet_4, circlet_25, circlet_7, circlet_8, circlet_9, feather_1, feather_10, feather_11, feather_13, feather_16, feather_2, feather_20, feather_4, feather_7, feather_8, feather_9, flower_1, flower_10, flower_11, flower_13, flower_18, flower_2, flower_20, flower_4, flower_7, flower_8, flower_9, goblet_1, goblet_10, goblet_11, goblet_15, goblet_2, goblet_20, goblet_4, goblet_7, goblet_8, goblet_9, sand_1, sand_10, sand_11, sand_13, sand_2, sand_20, sand_4, sand_7, sand_8, sand_9, sand_27, goblet_26, feather_28, circlet_29, sands_28, flower_28, flower_30, feather_30, sands_30, goblet_30, circlet_30, feather_31, circlet_28 } from './my_artifacts.js';
import { baalE, bennBurst, cryoRes, geoRes, gorouBanner3C6, homNature, monaOmen, noblesse, pyroRes, saraC6Burst, sucroseC6, sucroseSwirl, tom, ttds, xianglingC6, yoimiyaSaxi } from './traits.js';
import { amosR2, rustR5, stringlessR2 } from './bows.js';
import { deathmatch1, jadeSpear, theCatchR5, homa } from './polearms.js';
import { geoResShred, lapidus, lisaA2, raidenC2, superConduct, vvShred } from './debuffs.js';
import { cryoMelt, pyroVape } from './amplifiers.js';
import { overloaded, swirl } from './reactions.js';
import { redhorn, wolfs } from './claymore.js';

import { output } from './output.js';

const yoimiyaArtifacts = [flower_4, feather_4, sand_27, goblet_26, circlet_4];
//[flower_4, feather_4, sand_4, goblet_4, circlet_4];

export const yoimiya_xingqiu_fischl_bennett = () => {
    const teamWide = [noblesse, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, ...teamWide];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded, yoimiya.fischlBonus(teamWide)],
    });

    output(`Yoimiya, Xingqiu, Fischl, Bennett: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            duration: firedanceAction.duration
        }), fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: onField,
            transforms: [fischl.icdElectroCharged]
        }),
        firedanceAction,
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const yoimiya_fischl_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        transforms: [yoimiya.icdOverloaded, yoimiya.fischlBonus(teamWide)],
    });

    output(`Yoimiya, Fischl, Bennett, Zhong Li: ${teamDamageDps([
        firedanceAction,
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: onField,
            debuffs,
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
    });

    output(`Yoimiya, Xingqiu, Bennett, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            debuffs,
            duration: firedanceAction.duration
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_sara_zhongli = () => {
    const teamWide = [tom, noblesse, yoimiyaSaxi];
    const onField = [saraC6Burst, ...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
    });

    output(`Yoimiya, Xingqiu, Sara, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: onField,
            debuffs,
            duration: firedanceAction.duration
        }),
        {
            char: {
                name: "sara"
            },
            hits: [],
            delay: 3
        },
        {
            char: {
                name: "sara"
            },
            hits: [],
            delay: 3
        },
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_fischl_zhongli = () => {
    const teamWide = [tom, yoimiyaSaxi];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded, yoimiya.fischlBonus(teamWide)],
    });

    output(`Yoimiya, Xingqiu, Fischl, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            debuffs,
            duration: firedanceAction.duration
        }), fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: onField,
            debuffs,
            transforms: [fischl.icdElectroCharged]
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_albedo_zhongli = () => {
    const teamWide = [tom, homNature, yoimiyaSaxi];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
    });

    output(`Yoimiya, Xingqiu, Albedo, Zhong Li: ${teamDamageDps([
        firedanceAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            debuffs,
            duration: firedanceAction.duration
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_fischl_albedo_zhongli = () => {
    const teamWide = [tom, homNature, yoimiyaSaxi];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        transforms: [yoimiya.icdOverloaded, yoimiya.fischlBonus(teamWide)],
    });

    output(`Yoimiya, Fischl, Albedo, Zhong Li: ${teamDamageDps([
        firedanceAction, {
            char: stats(fischl.char, stringlessR2, [flower_13, feather_16, sand_13, goblet_15, circlet_13]),
            hits: fischl.hits(teamWide, debuffs),
        },
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: teamWide,
            debuffs,
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_sucrose_xinyan = () => {
    const teamWide = [tom, yoimiyaSaxi];
    const onField = [...teamWide, sucroseSwirl, sucroseC6];
    const debuffs = [vvShred];
    
    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        transforms: [yoimiya.icdOverloaded, yoimiya.fischlBonus(teamWide)],
    });

    output(`Yoimiya, Xingqiu, Sucrose, Xinyan: ${teamDamageDps([
        firedanceAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            debuffs,
            duration: firedanceAction.duration
        }),,
        sucrose.swirlAction()
    ])}`);
};


export const hutao_xingqiu_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_7, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Albedo, Zhong Li: ${teamDamageDps([
        afterlifeAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_xingqiu_fischl_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_7, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape],
        transforms: [hutao.icdOverloaded, yoimiya.fischlBonus(onField, debuffs)]
    });

    output(`Hutao, Xingqiu, Fischl, Zhong Li: ${teamDamageDps([
        afterlifeAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: teamWide,
            debuffs,
        }),,
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_xingqiu_sara_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide, saraC6Burst];
    const debuffs = [lapidus];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_7, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Sara, Zhong Li: ${teamDamageDps([
        afterlifeAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_xingqiu_sucrose_xinyan = () => {
    const teamWide = [tom, pyroRes];
    const onField = [...teamWide, sucroseSwirl, sucroseC6];
    const debuffs = [vvShred];
    
    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_7, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Sucrose, Xinyan: ${teamDamageDps([
        afterlifeAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        },
        sucrose.swirlAction(),
        {
            hits: [],
            delay: 4
        }
    )])}`);
};

export const raiden_xingqiu_xiangling_bennett = () => {
    const teamWide = [noblesse, pyroRes, baalE];
    const onField = [bennBurst, ...teamWide];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    output(`Raiden, Xingqiu, Xiangling, Bennett: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            hitStats: ["hasElectro"]
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: onField,
            amps: [pyroVape],
            transforms: [overloaded],
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
    ])}`);
};

export const raiden_xingqiu_yoimiya_zhongli = () => {
    const teamWide = [tom, baalE, yoimiyaSaxi];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape]
    });

    output(`Raiden, Xingqiu, Yoimiya, Zhongli: ${teamDamageDps([
        musouAction,
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            debuffs,
            hitStats: ["hasElectro"]
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs,
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction(),
    ])}`);
};

export const raiden_xingqiu_sara_jean = () => {
    const teamWide = [noblesse, baalE];
    const onField = [saraC6Burst, ...teamWide];
    const debuffs = [vvShred]
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    output(`Raiden, Xingqiu, Sara, Jean: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: teamWide,
            hitStats: ["hasElectro"]
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
    ])}`);
};

export const raiden_sara_jean_bennett = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, saraC6Burst, ...teamWide];
    const debuffs = [vvShred];

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: debuffs,
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Sara, Jean, Bennett: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
    ])}`);
};

export const raiden_mona_jean_bennett = () => {
    const teamWide = [noblesse, baalE, ttds, monaOmen];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [vvShred];

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: debuffs,
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Mona, Jean, Bennett: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
    ])}`);
};

export const ganyu_xiangling_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    output(`Ganyu, Xiangling, Bennett, Zhong Li: ${teamDamageDps([
        {
            char: stats(ganyu.char, amosR2, [flower_11, feather_11, sand_11, goblet_11, circlet_7]),
            hits: ganyu.hits(onField, debuffs, [cryoMelt])
        },
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: onField,
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        zhongli.lapidusAction(),
    ])}`);
};

export const eula_raiden_albedo_zhongli = () => {
    const teamWide = [tom, homNature, baalE];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, superConduct, geoResShred];

    const glacialAction = eula.glacialAction({
        weapon: wolfs,
        artifacts: [flower_10, feather_10, sand_10, goblet_10, circlet_23],
        buffs: onField,
        debuffs,
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: [lapidus],
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Albedo, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction, 
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }), 
        zhongli.lapidusAction()
    ])}`);
};

export const eula_fischl_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, superConduct, geoResShred];

    const glacialAction = eula.glacialAction({
        weapon: wolfs,
        artifacts: [flower_10, feather_10, sand_10, goblet_10, circlet_23],
        buffs: onField,
        debuffs,
        transforms: [yoimiya.fischlBonus(teamWide, debuffs)]
    });

    output(`Eula, Fischl, Albedo, Zhong Li: ${teamDamageDps([
        glacialAction, 
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: onField,
            debuffs,
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const eula_raiden_rosaria_zhongli = () => {
    const teamWide = [tom, baalE];
    const onField = [cryoRes, ...teamWide];
    const debuffs = [lapidus, superConduct];
    
    const glacialAction = eula.glacialAction({
        weapon: wolfs,
        artifacts: [flower_10, feather_10, sand_10, goblet_10, circlet_23],
        buffs: onField,
        debuffs,
        transforms: [yoimiya.fischlBonus(teamWide, debuffs)]
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: [lapidus],
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Rosaria, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const eula_raiden_lisa_zhongli = () => {
    const teamWide = [tom, baalE];
    const onField = [geoRes, ttds, ...teamWide];
    const debuffs = [lapidus, superConduct, lisaA2, geoResShred];

    const glacialAction = eula.glacialAction({
        weapon: wolfs,
        artifacts: [flower_10, feather_10, sand_10, goblet_10, circlet_23],
        buffs: onField,
        debuffs,
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: [lapidus],
        buffs: onField,
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Lisa, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction, 
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const eula_fischl_lisa_diona = () => {
    const teamWide = [noblesse, baalE];
    const onField = [cryoRes, ttds, ...teamWide];
    const debuffs = [superConduct, lisaA2];
    const duration = 10;
    const downtime = 4;

    output(`Eula, Fischl, Lisa, Diona: ${teamDamageDps([{
        char: stats(eula.char, wolfs, [flower_10, feather_10, sand_10, goblet_10, circlet_23]),
        hits: eula.hits(onField, debuffs)
    }, {
        char: stats(fischl.char, stringlessR2, [flower_13, feather_16, sand_13, goblet_15, circlet_13]),
        hits: fischl.hits(teamWide, debuffs)
    }], duration, downtime)}`);
};

export const xiao_jean_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    output(`Xiao, Jean, Albedo, Zhong Li: ${teamDamageDps([
        baneAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        zhongli.lapidusAction(),
        jean.galeAction(),
    ])}`);
};

export const xiao_jean_bennett_zhongli = () => {
    const teamWide = [tom, noblesse];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    output(`Xiao, Jean, Bennett, Zhong Li: ${teamDamageDps([
        baneAction,
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        jean.galeAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const xiao_jean_fischl_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide];
    const debuffs = [lapidus];
    const enemy = {
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0
    };
    const fischlBonus = (traits, debuffs) => {
        return (attr, hit) => {
            return fischl.fischlA2(enemy, traits, debuffs)(attr, hit) + fischl.fischlC6(enemy, traits, debuffs)(attr, hit);
        };
    };

    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
        transforms: [fischlBonus(teamWide, [vvShred, ...debuffs]), swirl]
    });

    output(`Xiao, Jean, Fischl, Zhong Li: ${teamDamageDps([
        baneAction, 
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
            buffs: onField,
        }),
        zhongli.lapidusAction(),
        jean.galeAction(),
    ])}`);
};

export const xiao_raiden_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    const musouAction = raiden.musouAction({
        weapon: deathmatch1,
        debuffs: [lapidus],
        buffs: [baalE, ...onField],
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Xiao, Raiden, Albedo, Zhong Li: ${teamDamageDps([
        baneAction,
        musouAction, 
        raiden.omenAction({
            weapon: deathmatch1,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const xiao_raiden_bennett_zhongli = () => {
    const teamWide = [tom, homNature, noblesse];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const baneAction1 = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: [bennBurst, ...onField],
        debuffs,
    });

    const baneAction2 = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_8, sand_8, goblet_8, circlet_8],
        buffs: [geoRes, tom],
        debuffs,
    });

    baneAction1.hits = baneAction1.hits.slice(0, 8).concat(baneAction2.hits.slice(8));
    const musouAction = raiden.musouAction({
        weapon: deathmatch1,
        debuffs: [lapidus],
        buffs: [baalE, geoRes, tom],
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Xiao, Raiden, Bennett, Zhong Li: ${teamDamageDps([
        baneAction1,
        musouAction, 
        raiden.omenAction({
            weapon: deathmatch1,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const xingqiu_xiangling_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    output(`Xingqiu, Xiangling, Bennett, Zhongli: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: onField,
            debuffs,
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField, sucroseC6],
            amps: [pyroVape],
            debuffs,
            transforms: [overloaded],
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction()
    ])}`);
};

export const xingqiu_xiangling_bennett_sucrose = () => {
    const teamWide = [noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide, sucroseSwirl];

    output(`Xingqiu, Xiangling, Bennett, Sucrose: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
            buffs: onField,
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField, sucroseC6],
            amps: [pyroVape],
            debuffs: [vvShred],
            transforms: [overloaded],
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction()
    ])}`);
};

export const itto_raiden_albedo_gorou = () => {
    const teamWide = [gorouBanner3C6];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_28, feather_31, sands_28, goblet_20, circlet_29]
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: [baalE, ...onField],
        artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
    });

    output(`Itto, Raiden, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        musouAction, 
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_9, sand_9, goblet_9, circlet_9],
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        gorou.bannerAction()
    ])}`);
};

export const itto_xingqiu_albedo_gorou = () => {
    const teamWide = [gorouBanner3C6];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_28, feather_31, sands_28, goblet_20, circlet_29]
    });

    const raincutterAction = xingqiu.raincutterAction({
        weapon: sacSword,
        artifacts: [flower_1, feather_1, sand_1, goblet_1, circlet_3],
        buffs: teamWide,
    });

    output(`Itto, Xingqiu, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        raincutterAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        gorou.bannerAction(),
    ])}`);
};

export const itto_fischl_albedo_gorou = () => {
    const teamWide = [gorouBanner3C6];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const enemy = {
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0
    };

    const fischlBonus = (traits, debuffs) => {
        return (attr, hit) => {
            return fischl.fischlA2(enemy, traits, debuffs)(attr, hit) + fischl.fischlC6(enemy, traits, debuffs)(attr, hit);
        };
    };

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_28, feather_31, sands_28, goblet_20, circlet_29],
        transforms: [fischlBonus(teamWide)],
    });

    const ozAction = fischl.ozAction({
        weapon: stringlessR2,
        artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_13],
        buffs: onField,
        debuffs,
    });

    output(`Itto, Fischl, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        ozAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        gorou.bannerAction(),
    ])}`);
};

export const itto_bennett_albedo_gorou = () => {
    const teamWide = [gorouBanner3C6, noblesse];
    const onField = [geoRes, bennBurst, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_28, feather_31, sands_28, goblet_20, circlet_29]
    });

    output(`Itto, Bennett, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_20, feather_30, sands_30, goblet_30, circlet_28]
        }),
        gorou.bannerAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const ayaka_mona_venti_diona = () => {

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["frozen"]
    });
    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs: [vvShred],
        buffs: [monaOmen, noblesse, ttds, cryoRes],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Mona, Venti, Diona: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs: [vvShred],
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs: [vvShred],
            buffs: [monaOmen, noblesse, ttds, cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs: [vvShred],
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
    ])}`);
};

export const ayaka_mona_venti_shenhe = () => {
    const teamWide = [cryoRes];
    const debuffs = [vvShred, shenheBurst];
    
    // prototype amber mona
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["frozen"]
    });
    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [monaOmen, makeShenheE(10), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Mona, Venti, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [monaOmen, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide })
    ])}`);
};

export const ayaka_mona_diona_shenhe = () => {
    const teamWide = [cryoRes, noblesse];
    const debuffs = [shenheBurst];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["frozen"]
    });

    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [monaOmen, ttds, makeShenheE(10), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Mona, Diona, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [monaOmen, ttds, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide })
    ])}`);
};

export const ayaka_venti_diona_shenhe = () => {
    const teamWide = [cryoRes, noblesse];
    const debuffs = [shenheBurst, vvShred];

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasCryo"]
    });
    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [makeShenheE(10), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Venti, Diona, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide })
    ])}`);
};

export const ayaka_mona_bennett_shenhe = () => {
    const teamWide = [cryoRes, noblesse, bennBurst];
    const debuffs = [shenheBurst];

    // prototype amber mona
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["frozen"]
    });

    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [monaOmen, makeShenheE(10, 4000), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Mona, Bennett, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [monaOmen, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            debuffs
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        {
            char: { name: "ayaka", element: "cryo"},
            hits: [],
            delay: 4
        }
    ])}`);
};

export const ayaka_venti_bennett_shenhe = () => {
    const teamWide = [cryoRes, noblesse, bennBurst];
    const debuffs = [shenheBurst, vvShred];

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasCryo"]
    });

    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [makeShenheE(10, 4000), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Venti, Bennett, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [cryoRes],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide }),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const ayaka_mona_zhongli_shenhe = () => {
    const teamWide = [cryoRes, tom];
    const debuffs = [shenheBurst, lapidus];
    
    // prototype amber mona
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["frozen"]
    });

    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [monaOmen, makeShenheE(10), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Mona, Zhongli, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: [ ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [monaOmen, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: lithic1,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide }),
        zhongli.lapidusAction(),
        {
            char: { name: "ayaka", element: "cryo"},
            hits: [],
            delay: 4
        }
    ])}`);
};