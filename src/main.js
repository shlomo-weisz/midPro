import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
createApp(App).mount('#app')

const shas = {
    sdarim: {
        1: 'zeroim',
        2: 'moed',
        3: 'nashim',
        4: 'nezikin',
        5: 'kodashim',
        6: 'taharot'
    },
    massechtot: {
        1: {name: 'berakhot', hebrewName: 'ברכות', seder: 1, perekim: 9, mishnayot: 57},
        2: {name: 'peah', hebrewName: 'פאה', seder: 1, perekim: 8, mishnayot: 69},
        3: {name: 'demai', hebrewName: 'דמאי', seder: 1, perekim: 7, mishnayot: 53},
        4: {name: 'kilayim', hebrewName: 'כלאים', seder: 1, perekim: 9, mishnayot: 77},
        5: {name: 'sheviit', hebrewName: 'שביעית', seder: 1, perekim: 10, mishnayot: 89},
        6: {name: 'terumot', hebrewName: 'תרומות', seder: 1, perekim: 11, mishnayot: 101},

        7: {name: 'maasrot', hebrewName: 'מעשרות', seder: 2, perekim: 5, mishnayot: 40},


        2: 'peah',
        3: 'demai',
        4: 'kilayim',
        5: 'sheviit',
        6: 'terumot',
        7: 'maasrot',
        8: 'maaserSheni',
        9: 'challah',
        10: 'orlah',
        11: 'bikurim',
        12: 'shaboat',
        13: 'eruvin',
        14: 'pesachim',
        15: 'shekalim',
        16: 'yoma',
        17: 'sukka',
        18: 'beitza',
        19: 'roshHashana',
        20: 'taanit',
        21: 'megilla',
        22: 'moedKatan',
        23: 'chagiga',
        24: 'yevamot',
        25: 'ketubot',
        26: 'nedarim',
        27: 'nazir',
        28: 'sota',
        29: 'gittin',
        30: 'kidushin',
        31: 'bavaKama',
        32: 'bavaMetzia',
        33: 'bavaBatra',
        34: 'sanhedrin',
        35: 'makkot',
        36: 'shvuot',
        37: 'eduyot',
        38: 'avodaZara',
        39: 'avot',
        40: 'horayot',
        41: 'zevachim',
        42: 'menachot',
        43: 'chulin',
        44: 'bechorot',
        45: 'arachin',
        46: 'temura',
        47: 'keritot',
        48: 'meila',
        49: 'tamid',
        50: 'middot',
        51: 'kinnim',
        52: 'kelim',
        53: 'ohalot',
        54: 'negaim',
        55: 'para',
        56: 'taharot',
        57: 'mikvaot',
        58: 'nidda',
        59: 'machshirin',
        60: 'zavim',
        61: 'tevulYom',
        62: 'yadayim',
        63: 'oktzin'
    }
}


const mishnayot = {
    
        1: {
            mishnayot: 57,
            perekim: 9,
            perek1: 5,
            perek2: 8,
            perek3: 6,
            perek4: 7,
            perek5: 5,
            perek6: 8,
            perek7: 5,
            perek8: 8,
            perek9: 5
        },
        2: {
            mishnayot: 69,
            perekim: 8,
            perek1: 6,
            perek2: 8,
            perek3: 8,
            perek4: 11,
            perek5: 8,
            perek6: 11,
            perek7: 8,
            perek8: 9
        },
        3: {
            mishnayot: 53,
            perekim: 7,
            perek1: 4,
            perek2: 5,
            perek3: 6,
            perek4: 7,
            perek5: 11,
            perek6: 12,
            perek7: 8
        },

        4: {
            mishnayot: 77,
            perekim: 9,
            perek1: 9,
            perek2: 11,
            perek3: 7,
            perek4: 9,
            perek5: 8,
            perek6: 9,
            perek7: 8,
            perek8: 6,
            perek9: 10
        },
        5: {
            mishnayot: 89,
            perekim: 10,
            perek1: 8,
            perek2: 10,
            perek3: 10,
            perek4: 10,
            perek5: 9,
            perek6: 6,
            perek7: 7,
            perek8: 11,
            perek9: 9,
            perek10: 9
        },
        6: {
            mishnayot: 101,
            perekim: 11,
            perek1: 10,
            perek2: 6,
            perek3: 9,
            perek4: 13,
            perek5: 9,
            perek6: 6,
            perek7: 7,
            perek8: 12,
            perek9: 7,
            perek10: 12,
            perek11: 10

        },
        7: {
            mishnayot: 40,
            perekim: 5,
            perek1: 8,
            perek2: 8,
            perek3: 10,
            perek4: 6,
            perek5: 8,

        },
        8: {
            mishnayot: 57,
            perekim: 5,
            perek1: 7,
            perek2: 10,
            perek3: 13,
            perek4: 12,
            perek5: 15,
        },
        9: {
            mishnayot: 38,
            perekim: 4,
            perek1: 9,
            perek2: 8,
            perek3: 10,
            perek4: 11,
        },
        10: {
            mishnayot: 35,
            perekim: 3,
            perek1: 9,
            perek2: 17,
            perek3: 9,
        },
        11: {
            mishnayot: 39,
            perekim: 4,
            perek1: 11,
            perek2: 11,
            perek3: 12,
            perek4: 5,
        },


    
    moed: {
        shaboat: {
            mishnayot: 139,
            perekim: 24,
            perek1: 11,
            perek2: 7,
            perek3: 6,
            perek4: 2,
            perek5: 4,
            perek6: 10,
            perek7: 4,
            perek8: 7,
            perek9: 7,
            perek10: 6,
            perek11: 6,
            perek12: 6,
            perek13: 7,
            perek14: 4,
            perek15: 3,
            perek16: 8,
            perek17: 8,
            perek18: 3,
            perek19: 6,
            perek20: 5,
            perek21: 3,
            perek22: 6,
            perek23: 5,
            perek24: 5,
        },
        eruvin: {
            mishnayot: 96,
            perekim: 10,
            perek1: 10,
            perek2: 6,
            perek3: 9,
            perek4: 11,
            perek5: 9,
            perek6: 10,
            perek7: 11,
            perek8: 11,
            perek9: 4,
            perek10: 15,
        },
        pesachim: {
            mishnayot: 89,
            perekim: 10,
            perek1: 7,
            perek2: 8,
            perek3: 8,
            perek4: 9,
            perek5: 10,
            perek6: 6,
            perek7: 13,
            perek8: 8,
            perek9: 11,
            perek10: 9,
        },
        shekalim: {
            mishnayot: 52,
            perekim: 8,
            perek1: 7,
            perek2: 5,
            perek3: 4,
            perek4: 9,
            perek5: 6,
            perek6: 6,
            perek7: 7,
            perek8: 8
        },
        yoma: {
            mishnayot: 61,
            perekim: 8,
            perek1: 8,
            perek2: 7,
            perek3: 11,
            perek4: 6,
            perek5: 7,
            perek6: 8,
            perek7: 5,
            perek8: 9
        },
        sukka: {
            mishnayot: 53,
            perekim: 5,
            perek1: 11,
            perek2: 9,
            perek3: 15,
            perek4: 10,
            perek5: 8,
        },
        beitza: {
            mishnayot: 42,
            perekim: 5,
            perek1: 10,
            perek2: 10,
            perek3: 8,
            perek4: 7,
            perek5: 7
        },
        roshHashana: {
            mishnayot: 35,
            perekim: 4,
            perek1: 9,
            perek2: 9,
            perek3: 8,
            perek4: 9
        },
        taanit: {
            mishnayot: 34,
            perekim: 4,
            perek1: 7,
            perek2: 10,
            perek3: 9,
            perek4: 8
        },
        megilla: {
            mishnayot: 33,
            perekim: 4,
            perek1: 11,
            perek2: 6,
            perek3: 6,
            perek4: 10
        },
        moedKatan: {
            mishnayot: 24,
            perekim: 3,
            perek1: 10,
            perek2: 5,
            perek3: 9
        },
        chagiga: {
            mishnayot: 23,
            perekim: 3,
            perek1: 8,
            perek2: 7,
            perek3: 8
        },
    },
    nashim: {
        yevamot: {
            mishnayot: 128,
            perekim: 16,
            perek1: 4,
            perek2: 10,
            perek3: 10,
            perek4: 13,
            perek5: 6,
            perek6: 6,
            perek7: 6,
            perek8: 6,
            perek9: 6,
            perek10: 9,
            perek11: 7,
            perek12: 6,
            perek13: 13,
            perek14: 9,
            perek15: 10,
            perek16: 7,
        },
        ketubot: {
            mishnayot: 111,
            perekim: 13,
            perek1: 10,
            perek2: 10,
            perek3: 9,
            perek4: 12,
            perek5: 9,
            perek6: 7,
            perek7: 10,
            perek8: 8,
            perek9: 9,
            perek10: 6,
            perek11: 6,
            perek12: 4,
            perek13: 11,
        },
        nedarim: {
            mishnayot: 90,
            perekim: 11,
            perek1: 10,
            perek2: 10,
            perek3: 10,
            perek4: 10,
            perek5: 10,
            perek6: 10,
            perek7: 10,
            perek8: 10,
            perek9: 10,
            perek10: 10,
            perek11: 10,
        },
        nazir: {
            mishnayot: 66,
            perekim: 9,
            perek1: 10,
            perek2: 10,
            perek3: 10,
            perek4: 10,
            perek5: 10,
            perek6: 10,
            perek7: 10,
            perek8: 10,
            perek9: 6,
        },
        sota: {
            mish
        },
        nezikin: {},
        kodashim: {},
        taharot: {}
    }
}

const getSumOfPrakim = (masechet) => {
    
    return mishnayot[masechet].perekim
}

const getSumOfMishnayot = (masechet) => {
    return mishnayot[masechet].mishnayot
}

const getSumOfMishnayotInPerek = (masechet, perek) => {
    return mishnayot[masechet]['perek' + perek]
}

const getSumOfMishnayotInMasechtot = (massechtot) => {
    let sum = 0;
    for (let masechet in massechtot) {
        sum += getSumOfMishnayot(masechet)
    }
    return sum
}

const findIdOfMasechet = (masechet) => {
    for (let id in shas.massechtot) {
        if (shas.massechtot[id].hebrewName === masechet) {
            return id
        }
    }
}