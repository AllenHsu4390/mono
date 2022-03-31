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
import * as shenhe from './shenhe.js';
import * as albedo from './albedo.js';
import * as bennett from './bennett.js';
import * as zhongli from './zhongli.js';
import * as gorou from './gorou.js';
import * as sucrose from './sucrose.js';
import * as jean from './jean.js';
import * as sara from './sara.js';
import * as itto from './itto.js';
import * as ayaka from './ayaka.js';
import * as yunjin from './yunjin.js';
import * as rosaria from './rosaria.js';
import * as diluc from './diluc.js';
import * as ayato from './ayato.js';
import * as yae from './yae.js';
import { amenoma, cinnabar, harbinger, lionroarR5, sacSword, skywardBlade, blackSword } from './swords.js';
import { circlet_10, circlet_11, circlet_12, circlet_13, circlet_20, circlet_23, circlet_3, circlet_4, circlet_25, circlet_7, circlet_8, circlet_9, feather_1, feather_10, feather_11, feather_13, feather_16, feather_2, feather_20, feather_4, feather_7, feather_8, feather_9, flower_1, flower_10, flower_11, flower_13, flower_18, flower_2, flower_20, flower_4, flower_7, flower_8, flower_9, goblet_1, goblet_10, goblet_11, goblet_15, goblet_2, goblet_20, goblet_4, goblet_43, goblet_8, goblet_9, sand_1, sand_10, sand_11, sand_13, sand_2, sand_20, sand_4, sand_7, sand_8, sand_9, sand_27, goblet_26, feather_28, circlet_29, sands_28, flower_28, flower_30, feather_30, sands_30, goblet_30, circlet_30, feather_31, circlet_28, flower_33, feather_33, sand_33, goblet_33, circlet_33, flower_34, feather_34, sand_34, goblet_34, circlet_5, sand_35, circlet_36, goblet_36, sand_36, feather_36, flower_36, circlet_2, circlet_37, feather_40, circlet_41, goblet_42, sand_42, feather_42, flower_42, circlet_44, circlet_45, feather_44, flower_44, goblet_44, sand_44 } from './my_artifacts.js';
import { baalE, bennBurst, cryoRes, geoRes, gorouBanner3, homNature, monaOmen, noblesse, pyroRes, saraBurst, makeShenheE, sucroseC6, sucroseSwirl, tom, ttds, xianglingC6, yoimiyaSaxi, yunjinBurst } from './traits.js';
import { amosR2, rustR5, skywardHarpR1, stringlessR2 } from './bows.js';
import { deathmatch1, jadeSpear, theCatchR5, homa, wavebreakerR3, lithic1 } from './polearms.js';
import { geoResShred, lapidus, lisaA2, raidenC2, shenheBurst, superConduct, vvShred } from './debuffs.js';
import { cryoMelt, pyroVape } from './amplifiers.js';
import { overloaded, swirl, superConducted, electroCharged } from './reactions.js';
import { redhorn, serpentSpine, wolfs } from './claymore.js';

import { output } from './output.js';
import { setCurrentEnemy } from './enemy.js';
import { widsith, widsith_dmg, widsith_mast } from './catalyst.js';

const yoimiyaArtifacts = [flower_4, feather_4, sand_35, goblet_26, circlet_4];

export const yoimiya_xingqiu_fischl_bennett = () => {
    const teamWide = [noblesse, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, ...teamWide];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: [noblesse, pyroRes, bennBurst],
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Fischl, Bennett: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            transforms: [fischl.icdElectroCharged]
        }),
        firedanceAction,
        bennett.passionAction(),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            duration: Math.floor(firedanceAction.duration / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
        })
    ])}`);
};

export const yoimiya_xingqiu_yae_bennett = () => {
    const teamWide = [noblesse, pyroRes, yoimiyaSaxi];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: [noblesse, pyroRes, bennBurst],
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Yae, Bennett: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
        }),
        firedanceAction,
        bennett.passionAction(),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
    ])}`);
};

export const yoimiya_xingqiu_yae_yunjin = () => {
    const teamWide = [pyroRes, yoimiyaSaxi];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: [pyroRes, yunjinBurst],
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Yae, Yunjin: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
        }),
        firedanceAction,
        yunjin.bannerAction(),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
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
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Fischl, Bennett, Zhong Li: ${teamDamageDps([
        firedanceAction,
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
        }),
        bennett.passionAction(),
        zhongli.lapidusAction(),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            duration: Math.floor(firedanceAction.duration / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
        })
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
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
        }),
        bennett.passionAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_yunjin_bennett = () => {
    const teamWide = [tom, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, yunjinBurst, ...teamWide];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        amps: [yoimiya.icdPyroVape],
    });

    output(`Yoimiya, Xingqiu, Yunjin, Bennett: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
        }),
        yunjin.bannerAction(),
        bennett.passionAction(),
    ])}`);
};

export const yoimiya_yae_yunjin_bennett = () => {
    const teamWide = [tom, pyroRes, yoimiyaSaxi];
    const onField = [bennBurst, yunjinBurst, ...teamWide];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
    });

    output(`Yoimiya, Yae, Yunjin, Bennett: ${teamDamageDps([
        firedanceAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdOverloaded]
        }),
        yunjin.bannerAction(),
        zhongli.lapidusAction(),
    ])}`);
};

export const yoimiya_yae_albedo_zhongli = () => {
    const teamWide = [tom, homNature, yoimiyaSaxi];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
    });

    output(`Yoimiya, Yae, Albedo, Zhong Li: ${teamDamageDps([
        firedanceAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdOverloaded]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_xingqiu_yunjin_zhongli = () => {
    const teamWide = [tom, yoimiyaSaxi];
    const onField = [geoRes, yunjinBurst, ...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
    });

    output(`Yoimiya, Xingqiu, Yunjin, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        yunjin.bannerAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const yoimiya_yae_yunjin_zhongli = () => {
    const teamWide = [tom, yoimiyaSaxi];
    const onField = [geoRes, yunjinBurst, ...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
    });

    output(`Yoimiya, Yae, Yunjin, Zhong Li: ${teamDamageDps([
        firedanceAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdOverloaded]
        }),
        yunjin.bannerAction(),
        zhongli.lapidusAction(),
    ])}`);
};

export const yoimiya_xingqiu_sara_zhongli = () => {
    const teamWide = [tom, noblesse, yoimiyaSaxi];
    const onField = [saraBurst, ...teamWide];
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
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: onField,
            debuffs,
            
        }),
        sara.subjugationAction({
            weapon: skywardHarpR1,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 386, critRate: 0.381, critDmg: 0.264, elemDmg: 0.587, atkPct: 0.2 }]
        }),
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
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Fischl, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
            transforms: [fischl.icdElectroCharged]
        }),
        zhongli.lapidusAction(),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: Math.floor(firedanceAction.duration / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            
        })
    ])}`);
};

export const yoimiya_xingqiu_yae_zhongli = () => {
    const teamWide = [tom, yoimiyaSaxi];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape],
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Yae, Zhong Li: ${teamDamageDps([
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdElectroCharged]
        }),
        zhongli.lapidusAction(),
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
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
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
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Fischl, Albedo, Zhong Li: ${teamDamageDps([
        firedanceAction, {
            char: stats(fischl.char, stringlessR2, [flower_13, feather_16, sand_13, goblet_15, circlet_45]),
            hits: fischl.hits(teamWide, debuffs),
        },
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            duration: Math.floor(firedanceAction.duration / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
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
        transforms: [yoimiya.icdOverloaded],
    });

    output(`Yoimiya, Xingqiu, Sucrose, Xinyan: ${teamDamageDps([
        firedanceAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        sucrose.swirlAction(),
        {
            char: { name: "xinyan", element: "pyro"},
            hits: [],
            delay: 4
        }
    ])}`);
};


export const hutao_xingqiu_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Albedo, Zhong Li: ${teamDamageDps([
        afterlifeAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_xingqiu_yae_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape],
        transforms: [hutao.icdOverloaded]
    });

    output(`Hutao, Xingqiu, Yae, Zhong Li: ${teamDamageDps([
        afterlifeAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdElectroCharged]
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_yae_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
    });

    output(`Hutao, Yae, Albedo, Zhong Li: ${teamDamageDps([
        afterlifeAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdOverloaded]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
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
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape],
        transforms: [hutao.icdOverloaded]
    });

    output(`Hutao, Xingqiu, Fischl, Zhong Li: ${teamDamageDps([
        afterlifeAction, 
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
            duration: 10
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
            duration: 10
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const hutao_xingqiu_sara_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide, saraBurst];
    const debuffs = [lapidus];

    const afterlifeAction = hutao.afterlifeAction({
        weapon: homa,
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Sara, Zhong Li: ${teamDamageDps([
        afterlifeAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        sara.subjugationAction({
            weapon: skywardHarpR1,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 386, critRate: 0.381, critDmg: 0.264, elemDmg: 0.587, atkPct: 0.2 }]
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
        artifacts: [flower_18, feather_13, sand_7, goblet_43, circlet_25],
        buffs: onField,
        debuffs,
        amps: [hutao.icdPyroVape]
    });

    output(`Hutao, Xingqiu, Sucrose, Xinyan: ${teamDamageDps([
        afterlifeAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            duration: afterlifeAction.duration,
            debuffs,
        }),
        sucrose.swirlAction(),
        {
            char: { name: "xinyan", element: "pyro"},
            hits: [],
            delay: 4
        }
    ])}`);
};

export const raiden_xingqiu_xiangling_bennett = () => {
    const teamWide = [noblesse, pyroRes, baalE];
    const onField = [bennBurst, ...teamWide];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasElectro", "hasPyro"]
    });

    output(`Raiden, Xingqiu, Xiangling, Bennett: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide
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
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
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
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
        amps: [yoimiya.icdPyroVape]
    });

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasElectro", "hasPyro"]
    });

    output(`Raiden, Xingqiu, Yoimiya, Zhongli: ${teamDamageDps([
        musouAction,
        firedanceAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs,
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction(),
    ])}`);
};

export const raiden_xingqiu_sara_jean = () => {
    const teamWide = [noblesse, baalE];
    const onField = [saraBurst, ...teamWide];
    const debuffs = [vvShred]
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasElectro", "hasPyro"]
    });

    output(`Raiden, Xingqiu, Sara, Jean: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        sara.subjugationAction({
            weapon: skywardHarpR1,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 386, critRate: 0.381, critDmg: 0.264, elemDmg: 0.587, atkPct: 0.2 }]
        }),
    ])}`);
};

export const raiden_xingqiu_bennett_fischl = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, ...teamWide];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasElectro", "hasPyro"]
    });

    output(`Raiden, Xingqiu, Bennett, Fischl: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: [bennBurst, ...teamWide],
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
        }),
    ])}`);
};

export const raiden_xingqiu_bennett_jean = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [vvShred]
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        transforms: [raiden.icdElectroCharged],
    });

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasElectro", "hasPyro"]
    });

    output(`Raiden, Xingqiu, Bennett, Jean: ${teamDamageDps([
        musouAction,
        xingqiu.raincutterAction({
            weapon: lionroarR5,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [overloaded, swirl],
            amps: [pyroVape]
        }),
    ])}`);
};

export const raiden_bennett_sara_jean = () => {
    const teamWide = [noblesse, baalE];
    const onField = [saraBurst, bennBurst, ...teamWide];
    const debuffs = [vvShred]
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Bennett, Sara, Jean: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        sara.subjugationAction({
            weapon: skywardHarpR1,
            buffs: [bennBurst, ...teamWide],
            debuffs,
            artifacts: [{ atk: 386, critRate: 0.381, critDmg: 0.264, elemDmg: 0.587, atkPct: 0.2 }]
        }),
    ])}`);
};

export const raiden_bennett_lisa_jean = () => {
    const teamWide = [noblesse, baalE];
    const onField = [ttds, bennBurst, ...teamWide];
    const debuffs = [vvShred, lisaA2];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Bennett, Lisa, Jean: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
    ])}`);
};

export const raiden_bennett_fischl_sucrose = () => {
    const teamWide = [noblesse, baalE];
    const onField = [ttds, bennBurst, sucroseSwirl, sucroseC6, ...teamWide];
    const debuffs = [vvShred];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Bennett, Fischl, Sucrose: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: [bennBurst, ...teamWide],
            debuffs,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
    ])}`);
};

export const raiden_bennett_sara_sucrose = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, sucroseSwirl, sucroseC6, saraBurst, ...teamWide];
    const debuffs = [vvShred];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Bennett, Sara, Sucrose: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        sara.subjugationAction({
            weapon: skywardHarpR1,
            buffs: [bennBurst, ...teamWide],
            debuffs,
            artifacts: [{ atk: 386, critRate: 0.381, critDmg: 0.264, elemDmg: 0.587, atkPct: 0.2 }]
        }),
    ])}`);
};

export const raiden_bennett_yae_sucrose = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, sucroseSwirl, sucroseC6, ...teamWide];
    const debuffs = [vvShred];
    
    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: onField,
        debuffs,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Bennett, Yae, Sucrose: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            debuffs,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        yae.comboAction({
            weapon: widsith_dmg,
            artifacts: [flower_42, feather_42, sand_42, goblet_42, circlet_11],
            buffs: onField,
            debuffs,
        }),
    ])}`);
};

export const raiden_mona_jean_bennett = () => {
    const teamWide = [noblesse, baalE];
    const onField = [bennBurst, ttds, monaOmen, ...teamWide];
    const debuffs = [vvShred];

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: debuffs,
        buffs: onField,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Raiden, Mona, Jean, Bennett: ${teamDamageDps([
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: teamWide,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
    ])}`);
};

export const ganyu_xiangling_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    output(`Ganyu, Xiangling, Bennett, Zhong Li: ${teamDamageDps([
        ganyu.chargeAtkAction({
            weapon: amosR2,
            artifacts: [flower_11, feather_11, sand_11, goblet_11, circlet_7],
            buffs: onField,
            debuffs,
            amps: [cryoMelt]
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: onField,
            debuffs
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        zhongli.lapidusAction(),
    ])}`);
};


export const ganyu_zhongli_jean_bennett = () => {
    const onField = [noblesse, tom, bennBurst];
    const debuffs = [vvShred, lapidus];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    const ganyuBurst = ({ elemDmg }, hit) => {
        if (hit.stats.includes("cryo")) {
            return {
                elemDmg: elemDmg + 0.2
            };
        }

        return {};
    };

    output(`Ganyu, Zhongli, Jean, Bennett: ${teamDamageDps([
        ganyu.chargeAtkAction({
            weapon: amosR2,
            artifacts: [flower_11, feather_11, sand_11, goblet_11, circlet_7],
            buffs: [...onField, ganyuBurst],
            debuffs,
            amps: [cryoMelt]
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: onField,
            debuffs: [lapidus],
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: onField,
            debuffs: [lapidus],
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
    ])}`);
};

export const ganyu_xiangling_bennett_shenhe = () => {
    const teamWide = [noblesse, pyroRes, cryoRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [shenheBurst];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    const shenheE = makeShenheE(7, 4000, true);

    output(`Ganyu, Xiangling, Bennett, Shenhe: ${teamDamageDps([
        ganyu.chargeAtkAction({
            weapon: amosR2,
            artifacts: [flower_11, feather_11, sand_11, goblet_11, circlet_7],
            buffs: [...onField, shenheE],
            debuffs,
            amps: [cryoMelt],
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: onField,
            debuffs
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: onField,
            debuffs
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const ganyu_shenhe_jean_bennett = () => {
    const onField = [noblesse, cryoRes, bennBurst];
    const debuffs = [shenheBurst, vvShred];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    const shenheE = makeShenheE(7, 4000, true);
    const ganyuBurst = ({ elemDmg }, hit) => {
        if (hit.stats.includes("cryo")) {
            return {
                elemDmg: elemDmg + 0.2
            };
        }

        return {};
    };

    output(`Ganyu, Shenhe, Jean, Bennett: ${teamDamageDps([
        ganyu.chargeAtkAction({
            weapon: amosR2,
            artifacts: [flower_11, feather_11, sand_11, goblet_11, circlet_7],
            buffs: [...onField, ganyuBurst, shenheE],
            debuffs,
            amps: [cryoMelt]
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: onField,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: onField,
            debuffs
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: onField,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: onField,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
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
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Albedo, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction, 
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }), 
        zhongli.lapidusAction()
    ])}`);
};

export const eula_raiden_shenhe_zhongli = () => {
    const teamWide = [tom, baalE];
    const onField = [makeShenheE(5), ...teamWide];
    const debuffs = [lapidus, superConduct, shenheBurst, geoResShred];

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
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Shenhe, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction,
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
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
        transforms: []
    });

    output(`Eula, Fischl, Albedo, Zhong Li: ${teamDamageDps([
        glacialAction, 
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: Math.floor(glacialAction.duration / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: glacialAction.duration
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        zhongli.lapidusAction(),
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
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        debuffs: [lapidus],
        buffs: onField,
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });
    
    const confessionAction = rosaria.confessionAction({
        weapon: wavebreakerR3,
        debuffs,
        buffs: onField,
        artifacts: [flower_36, feather_36, sand_36, goblet_36, circlet_36],
        transforms: [superConducted]
    });

    const terminationAction = rosaria.terminationAction({
        weapon: wavebreakerR3,
        debuffs,
        buffs: onField,
        artifacts: [flower_36, feather_36, sand_36, goblet_36, circlet_36],
        transforms: [superConducted]
    });

    output(`Eula, Raiden, Rosaria, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction,
        confessionAction,
        terminationAction,
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
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
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Eula, Raiden, Lisa, Zhong Li: ${teamDamageDps([
        glacialAction,
        musouAction, 
        raiden.omenAction({
            weapon: jadeSpear,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
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
        char: stats(fischl.char, stringlessR2, [flower_13, feather_16, sand_13, goblet_15, circlet_45]),
        hits: fischl.hits(teamWide, debuffs)
    }], duration, downtime)}`);
};

export const xiao_jean_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    output(`Xiao, Jean, Albedo, Zhong Li: ${teamDamageDps([
        baneAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        zhongli.lapidusAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }]
        }),
    ])}`);
};

export const xiao_jean_bennett_zhongli = () => {
    const teamWide = [tom, noblesse];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    output(`Xiao, Jean, Bennett, Zhong Li: ${teamDamageDps([
        baneAction,
        bennett.passionAction(),
        bennett.passionAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        
        zhongli.lapidusAction()
    ])}`);
};

export const xiao_jean_fischl_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
        transforms: [swirl]
    });

    output(`Xiao, Jean, Fischl, Zhong Li: ${teamDamageDps([
        baneAction, 
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs: [vvShred, ...debuffs],
            duration: baneAction.duration
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs: [vvShred, ...debuffs],
            duration: baneAction.duration
        }),
        zhongli.lapidusAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
    ])}`);
};

export const xiao_raiden_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const baneAction = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: onField,
        debuffs,
    });

    const musouAction = raiden.musouAction({
        weapon: deathmatch1,
        debuffs: [lapidus],
        buffs: [baalE, ...onField],
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Xiao, Raiden, Albedo, Zhong Li: ${teamDamageDps([
        baneAction,
        musouAction, 
        raiden.omenAction({
            weapon: deathmatch1,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
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
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: [bennBurst, ...onField],
        debuffs,
    });

    const baneAction2 = xiao.baneAction({
        weapon: jadeSpear,
        artifacts: [flower_8, feather_34, sand_27, goblet_8, circlet_8],
        buffs: [geoRes, tom],
        debuffs,
    });

    baneAction1.hits = baneAction1.hits.slice(0, 8).concat(baneAction2.hits.slice(8));
    const musouAction = raiden.musouAction({
        weapon: deathmatch1,
        debuffs: [lapidus],
        buffs: [baalE, geoRes, tom],
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Xiao, Raiden, Bennett, Zhong Li: ${teamDamageDps([
        baneAction1,
        musouAction, 
        raiden.omenAction({
            weapon: deathmatch1,
            debuffs: [lapidus],
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        zhongli.lapidusAction()
    ])}`);
};


export const xingqiu_xiangling_bennett_fischl = () => {
    const teamWide = [noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];

    output(`Xingqiu, Xiangling, Bennett, Fischl: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: onField,
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField],
            amps: [pyroVape],
            transforms: [overloaded],
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            transforms: [electroCharged]
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            transforms: [electroCharged]
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            transforms: [electroCharged]
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction()
    ])}`);
};

export const xingqiu_xiangling_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    output(`Xingqiu, Xiangling, Bennett, Zhongli: ${teamDamageDps([
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: onField,
            debuffs,
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField],
            amps: [pyroVape],
            debuffs,
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
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: onField,
            debuffs: [vvShred],
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField, sucroseC6],
            amps: [pyroVape],
            debuffs: [vvShred],
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction()
    ])}`);
};

export const itto_raiden_albedo_gorou = () => {
    const teamWide = [gorouBanner3];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    const musouAction = raiden.musouAction({
        weapon: jadeSpear,
        buffs: [baalE, ...onField],
        artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
    });

    output(`Itto, Raiden, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        musouAction, 
        raiden.omenAction({
            weapon: jadeSpear,
            buffs: onField,
            artifacts: [flower_9, feather_40, sand_9, goblet_9, circlet_9],
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        gorou.bannerAction()
    ])}`);
};

export const itto_xingqiu_albedo_gorou = () => {
    const teamWide = [gorouBanner3];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    const raincutterAction = xingqiu.raincutterAction({
        weapon: sacSword,
        artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
        buffs: teamWide,
        duration: 7
    });

    output(`Itto, Xingqiu, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        raincutterAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        gorou.bannerAction(),
    ])}`);
};

export const itto_fischl_albedo_gorou = () => {
    const teamWide = [gorouBanner3];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];
    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28],
    });

    const ozAction = fischl.ozAction({
        weapon: stringlessR2,
        artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
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
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs: [vvShred, ...debuffs],
            duration: royalAction.duration
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs: [vvShred, ...debuffs],
            duration: royalAction.duration
        }),
        gorou.bannerAction(),
    ])}`);
};

export const itto_bennett_albedo_gorou = () => {
    const teamWide = [gorouBanner3, noblesse];
    const onField = [geoRes, bennBurst, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    output(`Itto, Bennett, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        gorou.bannerAction(),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const itto_zhongli_albedo_gorou = () => {
    const teamWide = [gorouBanner3, tom];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred, lapidus];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    output(`Itto, Zhongli, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        gorou.bannerAction(),
        zhongli.lapidusAction(),
    ])}`);
};

export const itto_mona_albedo_gorou = () => {
    const teamWide = [gorouBanner3, tom, monaOmen];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    output(`Itto, Mona, Albedo, Gorou: ${teamDamageDps([
        royalAction,
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        gorou.bannerAction(),
    ])}`);
};

export const itto_mona_gorou_lisa = () => {
    const teamWide = [gorouBanner3, tom, monaOmen];
    const onField = [geoRes, ttds, ...teamWide];
    const debuffs = [geoResShred, lisaA2];

    const royalAction = itto.royalAction({
        weapon: redhorn,
        debuffs,
        buffs: onField,
        artifacts: [flower_20, feather_31, sands_28, goblet_30, circlet_28]
    });

    output(`Itto, Mona, Lisa, Gorou: ${teamDamageDps([
        royalAction,
        gorou.bannerAction(),
    ])}`);
};

export const ayaka_mona_venti_diona = () => {

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasFrozen"]
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
            buffs: [cryoRes, ttds, noblesse],
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
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasFrozen"]
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
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide })
    ])}`);
};

export const ayaka_kokomi_venti_shenhe = () => {
    const teamWide = [tom, cryoRes];
    const debuffs = [vvShred, shenheBurst];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasFrozen"]
    });
    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [ttds, makeShenheE(10), ...teamWide],
        artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
    });

    output(`Ayaka, Kokomi, Venti, Shenhe: ${teamDamageDps([
        soumetsuAction,
        ayaka.comboAction({
            weapon: amenoma,
            debuffs,
            buffs: teamWide,
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: [ttds, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        ayaka.hyoukaAction({
            weapon: amenoma,
            debuffs,
            buffs: teamWide,
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.baseQuillAction({ duration: 5, debuffs, teamWide }),
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
        stats: ["hasFrozen"]
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
            buffs: [ttds, ...teamWide],
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
            buffs: [monaOmen, ttds, ...teamWide],
            artifacts: [flower_33, feather_33, sand_33, goblet_33, circlet_33]
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
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
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
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

    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasFrozen"]
    });

    const soumetsuAction = ayaka.soumetsuAction({
        weapon: amenoma,
        debuffs,
        buffs: [monaOmen, makeShenheE(10), ...teamWide],
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
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            debuffs
        }),
        bennett.passionAction(),
        bennett.passionAction(),
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
        buffs: [makeShenheE(10), ...teamWide],
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
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
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
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasFrozen"]
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
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs: teamWide,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            debuffs
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const rosaria_shenhe_xiangling_bennett = () => {
    const buffs = [noblesse, cryoRes, bennBurst, pyroRes];
    const debuffs = [shenheBurst];
    const amps = [rosaria.icdCryoMelt];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    const shenheE = makeShenheE(10);

    const confessionAction = rosaria.confessionAction({
        weapon: deathmatch1,
        debuffs,
        buffs: [shenheE, ...buffs],
        amps,
        artifacts: [flower_36, feather_1, sand_36, goblet_36, circlet_2]
    });

    const terminationAction = rosaria.terminationAction({
        weapon: deathmatch1,
        debuffs,
        buffs: [shenheE, ...buffs],
        amps,
        artifacts: [flower_36, feather_1, sand_36, goblet_36, circlet_2],
    });

    output(`Rosaria, Shenhe, Xiangling, Bennett: ${teamDamageDps([
        confessionAction,
        terminationAction,
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs,
            debuffs
        }),
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs,
            debuffs
        }),
        confessionAction,
        bennett.passionAction(),
    ])}`);
};

export const rosaria_shenhe_jean_bennett = () => {
    const buffs = [noblesse, cryoRes, bennBurst];
    const debuffs = [shenheBurst, vvShred];
    const amps = [rosaria.icdCryoMelt];
    
    setCurrentEnemy({
        lvl: 90,
        res: 0.10,
        resBuff: 0,
        resDebuff: 0,
        defDebuff: 0,
        stats: ["hasPyro"]
    });

    const shenheE = makeShenheE(10);

    const confessionAction = rosaria.confessionAction({
        weapon: deathmatch1,
        debuffs,
        buffs: [shenheE, ...buffs],
        amps,
        artifacts: [flower_36, feather_1, sand_36, goblet_36, circlet_2]
    });

    const terminationAction = rosaria.terminationAction({
        weapon: deathmatch1,
        debuffs,
        buffs: [shenheE, ...buffs],
        amps,
        artifacts: [flower_36, feather_1, sand_36, goblet_36, circlet_2],
    });

    output(`Rosaria, Shenhe, Jean, Bennett: ${teamDamageDps([
        confessionAction,
        terminationAction,
        shenhe.springAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs,
            debuffs
        }),
        shenhe.divineAction({
            weapon: wavebreakerR3,
            artifacts: [flower_34, feather_34, sand_34, goblet_34, circlet_5],
            buffs,
            debuffs
        }),
        confessionAction,
        bennett.passionAction(),
        jean.galeAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: buffs,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: buffs,
            artifacts: [{ atk: 720, critRate: 0.359, critDmg: 0.249, elemDmg: 0.387 }],
            transforms: [swirl],
        }),
    ])}`);
};

export const diluc_xingqiu_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    const comboAction = diluc.comboAction({
        weapon: serpentSpine,
        artifacts: [flower_7, feather_7, sand_4, goblet_4, circlet_41],
        buffs: onField,
        debuffs,
        amps: [pyroVape],
    });

    output(`Diluc, Xingqiu, Bennett, Zhong Li: ${teamDamageDps([
        comboAction,
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
        }),
        bennett.passionAction(),
        zhongli.lapidusAction()
    ])}`);
};

export const yae_xingqiu_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    output(`Yae, Xingqiu, Albedo, Zhong Li: ${teamDamageDps([
        yae.comboAction({
            weapon: widsith_dmg,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: onField,
            debuffs,
            transforms: [yae.icdElectroCharged],
        }),
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yae_xingqiu_sucrose_zhongli = () => {
    const teamWide = [tom, sucroseSwirl];
    const onField = [sucroseC6, ...teamWide];
    const debuffs = [lapidus, vvShred];

    output(`Yae, Xingqiu, Sucrose, Zhong Li: ${teamDamageDps([
        yae.comboAction({
            weapon: widsith_dmg,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: onField,
            debuffs,
            transforms: [yae.icdElectroCharged],
        }),
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yae_xingqiu_sucrose_bennett = () => {
    const teamWide = [tom, noblesse];
    const onField = [sucroseC6, bennBurst, ...teamWide];
    const debuffs = [vvShred];

    output(`Yae, Xingqiu, Sucrose, Bennett: ${teamDamageDps([
        yae.comboAction({
            weapon: widsith_dmg,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: onField,
            debuffs,
            transforms: [yae.icdElectroCharged],
        }),
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
            
        }),
        bennett.passionAction(),
        bennett.passionAction(),
    ])}`);
};

export const yae_yoimiya_albedo_zhongli = () => {
    const teamWide = [tom, homNature, yoimiyaSaxi];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
    });

    output(`Yae, Yoimiya, Albedo, Zhong Li: ${teamDamageDps([
        firedanceAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdOverloaded]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const yae_yoimiya_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, yoimiyaSaxi];
    const onField = [geoRes, bennBurst, ...teamWide];
    const debuffs = [lapidus, geoResShred];
    
    const firedanceAction = yoimiya.fireDanceAction({
        weapon: rustR5,
        artifacts: yoimiyaArtifacts,
        buffs: onField,
        debuffs,
    });

    output(`Yae, Yoimiya, Bennett, Zhong Li: ${teamDamageDps([
        firedanceAction,
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdOverloaded]
        }),
        zhongli.lapidusAction(),
        bennett.passionAction(),
    ])}`);
};


export const ayato_yae_albedo_zhongli = () => {
    const teamWide = [tom, homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [lapidus, geoResShred];

    output(`Ayato, Yae, Albedo, Zhong Li: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const ayato_yae_albedo_gorou = () => {
    const teamWide = [gorouBanner3, homNature];
    const onField = [geoRes, yunjinBurst, ...teamWide];
    const debuffs = [geoResShred];

    output(`Ayato, Yae, Albedo, Gorou: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
    ])}`);
};

export const ayato_yae_albedo_xingqiu = () => {
    const teamWide = [homNature];
    const onField = [geoRes, ...teamWide];
    const debuffs = [geoResShred];

    output(`Ayato, Yae, Albedo, Xingqiu: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        xingqiu.raincutterAction({
            weapon: sacSword,
            artifacts: [flower_1, feather_9, sand_1, goblet_1, circlet_37],
            buffs: teamWide,
            debuffs,
        }),
    ])}`);
};

export const ayato_yae_albedo_yunjin = () => {
    const teamWide = [homNature];
    const onField = [geoRes, yunjinBurst, ...teamWide];
    const debuffs = [geoResShred];

    output(`Ayato, Yae, Albedo, Yunjin: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            transforms: [yae.icdElectroCharged]
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        yunjin.bannerAction()
    ])}`);
};

export const ayato_fischl_albedo_yunjin = () => {
    const teamWide = [homNature];
    const onField = [geoRes, yunjinBurst, ...teamWide];
    const debuffs = [geoResShred];

    output(`Ayato, Fischl, Albedo, Yunjin: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
            transforms: [fischl.icdElectroCharged]
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: Math.floor(17 / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        albedo.blossomAction({
            weapon: cinnabar,
            buffs: teamWide,
            debuffs,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29]
        }),
        albedo.tectonicAction({
            weapon: cinnabar,
            artifacts: [flower_28, feather_30, sands_30, goblet_20, circlet_29],
            buffs: onField,
            debuffs,
        }),
        yunjin.bannerAction()
    ])}`);
};

export const ayato_yae_yunjin_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide];
    const debuffs = [lapidus, geoRes];

    output(`Ayato, Yae, Yunjin, Zhong Li: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdElectroCharged]
        }),
        zhongli.lapidusAction(),
        yunjin.bannerAction(),
    ])}`);
};

export const ayato_yae_fischl_zhongli = () => {
    const teamWide = [tom];
    const onField = [...teamWide];
    const debuffs = [lapidus];

    output(`Ayato, Yae, Fischl, Zhong Li: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        yae.sesshouAction({
            weapon: widsith_mast,
            artifacts: [flower_42, feather_1, sand_42, goblet_42, circlet_11],
            buffs: teamWide,
            debuffs,
            transforms: [yae.icdElectroCharged]
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
        }),
        fischl.a2Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: Math.floor(17 / 3)
        }),
        fischl.c6Action({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        zhongli.lapidusAction()
    ])}`);
};

export const ayato_fischl_bennett_jean = () => {
    const teamWide = [noblesse];
    const onField = [yunjinBurst, bennBurst, ...teamWide];
    const debuffs = [vvShred];

    output(`Ayato, Fischl, Bennett, Jean: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        fischl.ozAction({
            weapon: stringlessR2,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: onField,
            debuffs,
        }),
        fischl.a2Action({
            weapon: skywardHarpR1,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
            duration: Math.floor(17 / 3)
        }),
        fischl.c6Action({
            weapon: skywardHarpR1,
            artifacts: [flower_13, feather_16, sand_13, goblet_15, circlet_45],
            buffs: teamWide,
            debuffs,
        }),
        bennett.passionAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [overloaded, swirl],
            amps: [pyroVape]
        }),
    ])}`);
};

export const ayato_yunjin_bennett_zhongli = () => {
    const teamWide = [noblesse];
    const onField = [yunjinBurst, bennBurst, ...teamWide];
    const debuffs = [lapidus];

    output(`Ayato, Yunjin, Bennett, Zhongli: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        bennett.passionAction(),
        yunjin.bannerAction(),
        zhongli.lapidusAction(),
    ])}`);
};

export const ayato_yunjin_bennett_jean = () => {
    const teamWide = [noblesse];
    const onField = [yunjinBurst, bennBurst, ...teamWide];
    const debuffs = [vvShred];

    output(`Ayato, Yunjin, Bennett, Jean: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        bennett.passionAction(),
        yunjin.bannerAction(),
        jean.breezeAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [swirl],
        }),
        jean.sunfireAction({
            weapon: sacSword,
            buffs: teamWide,
            debuffs,
            artifacts: [{ atk: 408, critRate: 0.366, critDmg: 0.311, elemDmg: 0.12, elemMast: 527 }],
            transforms: [swirl],
            amps: [pyroVape]
        }),
    ])}`);
};

export const ayato_xiangling_bennett_zhongli = () => {
    const teamWide = [tom, noblesse, pyroRes];
    const onField = [bennBurst, ...teamWide];
    const debuffs = [lapidus];

    output(`Ayato, Xiangling, Bennett, Zhongli: ${teamDamageDps([
        ayato.suiyuuAction({
            weapon: skywardBlade,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        ayato.kyoukaAction({
            weapon: skywardBlade,
            duration: 17,
            buffs: onField,
            debuffs,
            artifacts: [flower_44, feather_44, sand_44, goblet_44, circlet_13]
        }),
        xiangling.pyronadoAction({
            weapon: theCatchR5,
            artifacts: [flower_2, feather_2, sand_2, goblet_2, circlet_12],
            buffs: [...onField],
            amps: [pyroVape],
            debuffs,
        }),
        bennett.passionAction(),
        bennett.passionAction(),
        bennett.passionAction()
    ])}`);
};