

<template>
  <form action="">
    <div class="form-line">
      <label for="name">{{ labelName }}</label>
      <input type="text" id="name" v-model="name">
    </div>

    <div class="form-line">
      <label for="date">תאריך התחלה:</label>
      <input type="date" id="date" v-model="date" :min="currentDate">
    </div>

    <div class="form-line">
      <label for="date">ימי לימוד:</label>
    </div>
    <div class="form-line">
      <div class="days-box">
        <label for="all"> {{ chooseAll }}</label>
        <input type="checkbox" id="all" value="all" v-model="daysAll">
      </div>
      <div class="days-box">
        <label for="sunday">א</label>
        <input type="checkbox" id="sunday" value="א" v-model="days[0]">
      </div>
      <div class="days-box">
        <label for="monday">ב</label>
        <input type="checkbox" id="monday" value="ב" v-model="days[1]">
      </div>
      <div class="days-box">
        <label for="tuesday">ג</label>
        <input type="checkbox" id="tuesday" value="ג" v-model="days[2]">
      </div>
      <div class="days-box">
        <label for="wednesday">ד</label>
        <input type="checkbox" id="wednesday" value="ד" v-model="days[3]">
      </div>
      <div class="days-box">
        <label for="thursday">ה</label>
        <input type="checkbox" id="thursday" value="ה" v-model="days[4]">
      </div>
      <div class="days-box">
        <label for="friday">ו</label>
        <input type="checkbox" id="friday" value="ו" v-model="days[5]">
      </div>
      <div class="days-box">
        <label for="saturday">ש</label>
        <input type="checkbox" id="saturday" value="ש" v-model="days[6]">
      </div>
    </div>

    <div class="form-line">
      <label for="limit">הגבלת מספר המשניות לכל יום (אופציונלי)</label>
      <select type="number" id="limit" :disabled="thereIsDuration" v-model="limit">
        <option value="0" default>ללא הגבלה</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
      </select>
    </div>

    <div class="form-line">
      <label for="duration">או בחר מספר ימים למחזור השינון</label>
      <input type="number" id="duration" min="0" max="365" :disabled="thereIsLimit" v-model="duration">
    </div>


    <div class="form-line">
      <div>
        <VueMultiselect v-model="selected" :options="options" :multiple="true">
        </VueMultiselect>
      </div>

    </div>

    <button type="submit" @click.prevent="creatNewTable">צור טבלה</button>
    <div>
      {{ name }}
      {{ date }}
      {{ days }}
      {{ limit }}
    </div>



  </form>
  <newTable v-if="showTable" :masechtot="selected" :date="date" :name="name" :days="days" :limit="limit"
    :duration="duration"></newTable>

  {{ selected }}
  {{ currentDate }}
</template>



<script>
import newTable from './components/newTable.vue'
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect, newTable },
  name: 'App',
  data() {
    return {
      showTable: false,
      currentDate: '',
      limit: 0,
      thereIsLimit: false,
      duration: "",
      thereIsDuration: false,
      labelName: ':שם',
      daysAll: false,
      chooseAll: ' :בחר הכול',
      name: '',
      date: '',
      days: [false, false, false, false, false, false, false],
      selected: null,
      options: ["ברכות", "פאה", "דמאי", "כלאים", "שביעית", "תרומות", "מעשרות", "מעשר שני", "חלה", "ערלה", "ביכורים", "שבת", "עירובין", "פסחים", "שקלים", "יומא", "סוכה", "ביצה", "ראש השנה", "תענית", "מגילה", "מועד קטן", "חגיגה", "יבמות", "כתובות", "נדרים", "נזיר", "סוטה", "גיטין", "קידושין", "בבא קמא", "בבא מציעא", "בבא בתרא", "סנהדרין", "מכות", "שבועות", "עדיות", "עבודה זרה", "אבות", "הוריות", "זבחים", "מנחות", "חולין", "בכורות", "ערכין", "תמורה", "כריתות", "מעילה", "תמיד", "מידות", "קנים", "כלים", "אהלות", "נגעים", "פרה", "טהרות", "מקואות", "נדה", "מכשירין", "זבים", "טבול יום", "ידיים", "עוקצין"]

    }
  },
  computed:
  {
    currentDate() {
      const currentDate = new Date();
      const year = currentDate.getFullYear(); // Get the current year (YYYY)
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11) and add 1 to get (1-12)
      const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day of the month

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;

    }
  },
  watch: {
    daysAll() {
      if (this.daysAll) {
        this.days = [true, true, true, true, true, true, true],
          this.chooseAll = 'בטל בחירת כולם'

      } else {
        this.days = [false, false, false, false, false, false, false]
        this.chooseAll = ' :בחר הכול'
      }
    },
    limit() {
      if (parseInt(this.limit) > 0) {
        this.thereIsLimit = true
      } else {
        this.thereIsLimit = false
      }
    },
    duration() {
      // if (parseInt(this.duration) === NaN) {
      //   this.duration = 0
      //   alert('יש להכניס מספר')
      // }
      if (parseInt(this.duration) > 0) {
        this.thereIsDuration = true
      } else {
        this.thereIsDuration = false
      }
    },


  },
  methods: {
    findIdOfMasechet(masechet) {
      for (let id in shas.massechtot) {
        if (shas.massechtot[id].hebrewName === masechet) {
          return id
        }
      }
    },
    creatNewTable() {
      if (this.name === '') {
        alert('יש להכניס שם לטבלה')
      } else if (this.date === '') {
        alert('יש להכניס תאריך התחלה')
      } else if (this.selected === null) {
        alert('יש לבחור מסכתות')
      } else if (this.days[0] === false && this.days[1] === false && this.days[2] === false && this.days[3] === false && this.days[4] === false && this.days[5] === false && this.days[6] === false) {
        alert('יש לבחור ימי לימוד')
      }
      else {
        this.showTable = true
      }
    }
    // findIdOfMasechet(masechet) {
    //   let id = 0;
    //   for (let i = 0; i < this.options.length; i++) {
    //     if (this.options[i] === masechet) {
    //       id = i + 1;
    //     }
    //   }
    //   return id;
    // }
  }
}

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
    1: { name: 'berakhot', hebrewName: 'ברכות', seder: 1, perekim: 9, mishnayot: 57 },
    2: { name: 'peah', hebrewName: 'פאה', seder: 1, perekim: 8, mishnayot: 69 },
    3: { name: 'demai', hebrewName: 'דמאי', seder: 1, perekim: 7, mishnayot: 53 },
    4: { name: 'kilayim', hebrewName: 'כלאים', seder: 1, perekim: 9, mishnayot: 77 },
    5: { name: 'sheviit', hebrewName: 'שביעית', seder: 1, perekim: 10, mishnayot: 89 },
    6: { name: 'terumot', hebrewName: 'תרומות', seder: 1, perekim: 11, mishnayot: 101 },
    7: { name: 'maasrot', hebrewName: 'מעשרות', seder: 1, perekim: 5, mishnayot: 40 },
    8: { name: 'maaserSheni', hebrewName: 'מעשר שני', seder: 1, perekim: 5, mishnayot: 57 },
    9: { name: 'challah', hebrewName: 'חלה', seder: 1, perekim: 4, mishnayot: 38 },
    10: { name: 'orlah', hebrewName: 'ערלה', seder: 1, perekim: 3, mishnayot: 35 },
    11: { name: 'bikurim', hebrewName: 'ביכורים', seder: 1, perekim: 4, mishnayot: 39 },
    12: { name: 'shaboat', hebrewName: 'שבת', seder: 2, perekim: 24, mishnayot: 139 },
    13: { name: 'eruvin', hebrewName: 'עירובין', seder: 2, perekim: 10, mishnayot: 96 },
    14: { name: 'pesachim', hebrewName: 'פסחים', seder: 2, perekim: 10, mishnayot: 89 },
    15: { name: 'shekalim', hebrewName: 'שקלים', seder: 2, perekim: 8, mishnayot: 52 },
    16: { name: 'yoma', hebrewName: 'יומא', seder: 2, perekim: 8, mishnayot: 61 },
    17: { name: 'sukka', hebrewName: 'סוכה', seder: 2, perekim: 5, mishnayot: 53 },
    18: { name: 'beitza', hebrewName: 'ביצה', seder: 2, perekim: 5, mishnayot: 42 },
    19: { name: 'roshHashana', hebrewName: 'ראש השנה', seder: 2, perekim: 4, mishnayot: 35 },
    20: { name: 'taanit', hebrewName: 'תענית', seder: 2, perekim: 4, mishnayot: 34 },
    21: { name: 'megilla', hebrewName: 'מגילה', seder: 2, perekim: 4, mishnayot: 33 },
    22: { name: 'moedKatan', hebrewName: 'מועד קטן', seder: 2, perekim: 3, mishnayot: 24 },
    23: { name: 'chagiga', hebrewName: 'חגיגה', seder: 2, perekim: 3, mishnayot: 23 },
    24: { name: 'yevamot', hebrewName: 'יבמות', seder: 3, perekim: 16, mishnayot: 128 },
    25: { name: 'ketubot', hebrewName: 'כתובות', seder: 3, perekim: 13, mishnayot: 111 },
    26: { name: 'nedarim', hebrewName: 'נדרים', seder: 3, perekim: 11, mishnayot: 90 },
    27: { name: 'nazir', hebrewName: 'נזיר', seder: 3, perekim: 9, mishnayot: 60 },
    28: { name: 'sota', hebrewName: 'סוטה', seder: 3, perekim: 9, mishnayot: 67 },
    29: { name: 'gittin', hebrewName: 'גיטין', seder: 3, perekim: 9, mishnayot: 75 },
    30: { name: 'kidushin', hebrewName: 'קידושין', seder: 3, perekim: 4, mishnayot: 47 },
    31: { name: 'bavaKama', hebrewName: 'בבא קמא', seder: 4, perekim: 10, mishnayot: 79 },
    32: { name: 'bavaMetzia', hebrewName: 'בבא מציעא', seder: 4, perekim: 10, mishnayot: 101 },
    33: { name: 'bavaBatra', hebrewName: 'בבא בתרא', seder: 4, perekim: 10, mishnayot: 86 },
    34: { name: 'sanhedrin', hebrewName: 'סנהדרין', seder: 4, perekim: 11, mishnayot: 71 },
    35: { name: 'makkot', hebrewName: 'מכות', seder: 4, perekim: 3, mishnayot: 34 },
    36: { name: 'shevuot', hebrewName: 'שבועות', seder: 4, perekim: 8, mishnayot: 62 },
    37: { name: 'eduyot', hebrewName: 'עדיות', seder: 4, perekim: 8, mishnayot: 74 },
    38: { name: 'avodaZara', hebrewName: 'עבודה זרה', seder: 4, perekim: 5, mishnayot: 50 },
    39: { name: 'avot', hebrewName: 'אבות', seder: 4, perekim: 6, mishnayot: 108 },
    40: { name: 'horayot', hebrewName: 'הוריות', seder: 4, perekim: 3, mishnayot: 20 },
    41: { name: 'zevachim', hebrewName: 'זבחים', seder: 5, perekim: 14, mishnayot: 101 },
    42: { name: 'menachot', hebrewName: 'מנחות', seder: 5, perekim: 13, mishnayot: 93 },
    43: { name: 'chulin', hebrewName: 'חולין', seder: 5, perekim: 12, mishnayot: 74 },
    44: { name: 'bechorot', hebrewName: 'בכורות', seder: 5, perekim: 9, mishnayot: 73 },
    45: { name: 'arachin', hebrewName: 'ערכין', seder: 5, perekim: 9, mishnayot: 50 },
    46: { name: 'temura', hebrewName: 'תמורה', seder: 5, perekim: 7, mishnayot: 35 },
    47: { name: 'keritot', hebrewName: 'כריתות', seder: 5, perekim: 6, mishnayot: 43 },
    48: { name: 'meila', hebrewName: 'מעילה', seder: 5, perekim: 6, mishnayot: 38 },
    49: { name: 'tamid', hebrewName: 'תמיד', seder: 5, perekim: 7, mishnayot: 34 },
    50: { name: 'middot', hebrewName: 'מידות', seder: 5, perekim: 5, mishnayot: 34 },
    51: { name: 'kinnim', hebrewName: 'קנים', seder: 5, perekim: 3, mishnayot: 15 },
    52: { name: 'keilim', hebrewName: 'כלים', seder: 6, perekim: 30, mishnayot: 254 },
    53: { name: 'ohalot', hebrewName: 'אהלות', seder: 6, perekim: 18, mishnayot: 134 },
    54: { name: 'negaim', hebrewName: 'נגעים', seder: 6, perekim: 14, mishnayot: 115 },
    55: { name: 'para', hebrewName: 'פרה', seder: 6, perekim: 12, mishnayot: 96 },
    56: { name: 'taharot', hebrewName: 'טהרות', seder: 6, perekim: 10, mishnayot: 92 },
    57: { name: 'mikvaot', hebrewName: 'מקואות', seder: 6, perekim: 10, mishnayot: 71 },
    58: { name: 'nidda', hebrewName: 'נדה', seder: 6, perekim: 10, mishnayot: 79 },
    59: { name: 'machshirin', hebrewName: 'מכשירין', seder: 6, perekim: 6, mishnayot: 54 },
    60: { name: 'zavim', hebrewName: 'זבים', seder: 6, perekim: 5, mishnayot: 32 },
    61: { name: 'tevulYom', hebrewName: 'טבול יום', seder: 6, perekim: 4, mishnayot: 26 },
    62: { name: 'yadayim', hebrewName: 'ידיים', seder: 6, perekim: 4, mishnayot: 22 },
    63: { name: 'oktzin', hebrewName: 'עוקצין', seder: 6, perekim: 3, mishnayot: 28 },







  }
}


const mishnayot = {

  1: {
    name: 'berakhot',
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
    name: 'peah',
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
    name: 'demai',
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
    name: 'kilayim',
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
    name: 'sheviit',
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
    name: 'terumot',
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
    name: 'maasrot',
    mishnayot: 40,
    perekim: 5,
    perek1: 8,
    perek2: 8,
    perek3: 10,
    perek4: 6,
    perek5: 8,

  },
  8: {
    name: 'maaserSheni',
    mishnayot: 57,
    perekim: 5,
    perek1: 7,
    perek2: 10,
    perek3: 13,
    perek4: 12,
    perek5: 15,
  },
  9: {
    name: 'challah',
    mishnayot: 38,
    perekim: 4,
    perek1: 9,
    perek2: 8,
    perek3: 10,
    perek4: 11,
  },
  10: {
    name: 'orlah',
    mishnayot: 35,
    perekim: 3,
    perek1: 9,
    perek2: 17,
    perek3: 9,
  },
  11: {
    name: 'bikurim',
    mishnayot: 39,
    perekim: 4,
    perek1: 11,
    perek2: 11,
    perek3: 12,
    perek4: 5,
  },



  12: {
    name: 'shaboat',
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
  13: {
    name: 'eruvin',
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
  14: {
    name: 'pesachim',
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
  15: {
    name: 'shekalim',
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
  16: {
    name: 'yoma',
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
  17: {
    name: 'sukka',
    mishnayot: 53,
    perekim: 5,
    perek1: 11,
    perek2: 9,
    perek3: 15,
    perek4: 10,
    perek5: 8,
  },
  18: {
    name: 'beitza',
    mishnayot: 42,
    perekim: 5,
    perek1: 10,
    perek2: 10,
    perek3: 8,
    perek4: 7,
    perek5: 7
  },
  19: {
    name: 'roshHashana',
    mishnayot: 35,
    perekim: 4,
    perek1: 9,
    perek2: 9,
    perek3: 8,
    perek4: 9
  },
  20: {
    name: 'taanit',
    mishnayot: 34,
    perekim: 4,
    perek1: 7,
    perek2: 10,
    perek3: 9,
    perek4: 8
  },
  21: {
    name: 'megilla',
    mishnayot: 33,
    perekim: 4,
    perek1: 11,
    perek2: 6,
    perek3: 6,
    perek4: 10
  },
  22: {
    name: 'moedKatan',
    mishnayot: 24,
    perekim: 3,
    perek1: 10,
    perek2: 5,
    perek3: 9
  },
  23: {
    name: 'chagiga',
    mishnayot: 23,
    perekim: 3,
    perek1: 8,
    perek2: 7,
    perek3: 8
  },
  24: {
    name: 'yevamot',
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
  25: {
    name: 'ketubot',
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
  26: {
    name: 'nedarim',
    mishnayot: 90,
    perekim: 11,
    perek1: 4,
    perek2: 5,
    perek3: 11,
    perek4: 8,
    perek5: 6,
    perek6: 9,
    perek7: 7,
    perek8: 10,
    perek9: 10,
    perek10: 8,
    perek11: 12,
  },
  27: {
    name: 'nazir',
    mishnayot: 60,
    perekim: 9,
    perek1: 7,
    perek2: 10,
    perek3: 7,
    perek4: 7,
    perek5: 7,
    perek6: 11,
    perek7: 4,
    perek8: 2,
    perek9: 5,
  },
  28: {
    name: 'sota',
    mishnayot: 67,
    perekim: 9,
    perek1: 9,
    perek2: 6,
    perek3: 8,
    perek4: 5,
    perek5: 5,
    perek6: 4,
    perek7: 8,
    perek8: 7,
    perek9: 15
  },
  29: {
    name: 'gittin',
    mishnayot: 75,
    perekim: 9,
    perek1: 6,
    perek2: 7,
    perek3: 8,
    perek4: 9,
    perek5: 9,
    perek6: 7,
    perek7: 9,
    perek8: 10,
    perek9: 10
  },
  30: {
    name: 'kidushin',
    mishnayot: 47,
    perekim: 4,
    perek1: 10,
    perek2: 10,
    perek3: 13,
    perek4: 14
  },
  31: {
    name: 'bavaKama',
    mishnayot: 79,
    perekim: 10,
    perek1: 4,
    perek2: 6,
    perek3: 11,
    perek4: 9,
    perek5: 7,
    perek6: 6,
    perek7: 7,
    perek8: 7,
    perek9: 12,
    perek10: 10
  },
  32: {
    name: 'bavaMetzia',
    mishnayot: 101,
    perekim: 10,
    perek1: 8,
    perek2: 11,
    perek3: 12,
    perek4: 12,
    perek5: 11,
    perek6: 8,
    perek7: 11,
    perek8: 9,
    perek9: 13,
    perek10: 6
  },
  33: {
    name: 'bavaBatra',
    mishnayot: 86,
    perekim: 10,
    perek1: 6,
    perek2: 14,
    perek3: 8,
    perek4: 9,
    perek5: 11,
    perek6: 8,
    perek7: 4,
    perek8: 8,
    perek9: 10,
    perek10: 8
  },
  34: {
    name: 'sanhedrin',
    mishnayot: 71,
    perekim: 11,
    perek1: 6,
    perek2: 5,
    perek3: 8,
    perek4: 5,
    perek5: 5,
    perek6: 6,
    perek7: 11,
    perek8: 7,
    perek9: 6,
    perek10: 6,
    perek11: 6
  },
  35: {
    name: 'makkot',
    mishnayot: 34,
    perekim: 3,
    perek1: 10,
    perek2: 8,
    perek3: 16
  },
  36: {
    name: 'shevuot',
    mishnayot: 62,
    perekim: 8,
    perek1: 7,
    perek2: 5,
    perek3: 11,
    perek4: 13,
    perek5: 5,
    perek6: 7,
    perek7: 8,
    perek8: 6
  },
  37: {
    name: 'eduyot',
    mishnayot: 74,
    perekim: 8,
    perek1: 14,
    perek2: 10,
    perek3: 12,
    perek4: 12,
    perek5: 7,
    perek6: 3,
    perek7: 9,
    perek8: 7
  },
  38: {
    name: 'avodaZara',
    mishnayot: 50,
    perekim: 5,
    perek1: 9,
    perek2: 7,
    perek3: 10,
    perek4: 12,
    perek5: 12
  },
  39: {
    name: 'avot',
    mishnayot: 108,
    perekim: 6,
    perek1: 18,
    perek2: 16,
    perek3: 18,
    perek4: 22,
    perek5: 23,
    perek6: 11
  },
  40: {
    name: 'horayot',
    mishnayot: 20,
    perekim: 3,
    perek1: 5,
    perek2: 7,
    perek3: 8
  },
  41: {
    name: 'zevachim',
    mishnayot: 101,
    perekim: 14,
    perek1: 4,
    perek2: 5,
    perek3: 6,
    perek4: 6,
    perek5: 8,
    perek6: 7,
    perek7: 6,
    perek8: 12,
    perek9: 7,
    perek10: 8,
    perek11: 8,
    perek12: 6,
    perek13: 8,
    perek14: 10
  },
  42: {
    name: 'menachot',
    mishnayot: 93,
    perekim: 13,
    perek1: 4,
    perek2: 5,
    perek3: 7,
    perek4: 5,
    perek5: 9,
    perek6: 7,
    perek7: 6,
    perek8: 7,
    perek9: 9,
    perek10: 9,
    perek11: 9,
    perek12: 5,
    perek13: 12
  },
  43: {
    name: 'chulin',
    mishnayot: 74,
    perekim: 12,
    perek1: 7,
    perek2: 10,
    perek3: 7,
    perek4: 7,
    perek5: 5,
    perek6: 7,
    perek7: 6,
    perek8: 6,
    perek9: 8,
    perek10: 4,
    perek11: 2,
    perek12: 5
  },
  44: {
    name: 'bechorot',
    mishnayot: 73,
    perekim: 9,
    perek1: 7,
    perek2: 9,
    perek3: 4,
    perek4: 10,
    perek5: 6,
    perek6: 12,
    perek7: 7,
    perek8: 10,
    perek9: 8
  },
  45: {
    name: 'arachin',
    mishnayot: 50,
    perekim: 9,
    perek1: 4,
    perek2: 6,
    perek3: 5,
    perek4: 4,
    perek5: 6,
    perek6: 5,
    perek7: 5,
    perek8: 7,
    perek9: 8
  },
  46: {
    name: 'temura',
    mishnayot: 35,
    perekim: 7,
    perek1: 6,
    perek2: 3,
    perek3: 5,
    perek4: 4,
    perek5: 6,
    perek6: 5,
    perek7: 6
  },
  47: {
    name: 'keritot',
    mishnayot: 43,
    perekim: 6,
    perek1: 7,
    perek2: 6,
    perek3: 10,
    perek4: 3,
    perek5: 8,
    perek6: 9
  },
  48: {
    name: 'meila',
    mishnayot: 38,
    perekim: 6,
    perek1: 4,
    perek2: 9,
    perek3: 8,
    perek4: 6,
    perek5: 5,
    perek6: 6
  },
  49: {
    name: 'tamid',
    mishnayot: 34,
    perekim: 7,
    perek1: 4,
    perek2: 5,
    perek3: 9,
    perek4: 3,
    perek5: 6,
    perek6: 3,
    perek7: 4
  },
  50: {
    name: 'middot',
    mishnayot: 34,
    perekim: 5,
    perek1: 9,
    perek2: 6,
    perek3: 8,
    perek4: 7,
    perek5: 4
  },
  51: {
    name: 'kinnim',
    mishnayot: 15,
    perekim: 3,
    perek1: 4,
    perek2: 5,
    perek3: 6
  },
  52: {
    name: 'keilim',
    mishnayot: 254,
    perekim: 30,
    perek1: 9,
    perek2: 8,
    perek3: 8,
    perek4: 4,
    perek5: 11,
    perek6: 4,
    perek7: 6,
    perek8: 11,
    perek9: 8,
    perek10: 8,
    perek11: 9,
    perek12: 8,
    perek13: 8,
    perek14: 8,
    perek15: 6,
    perek16: 8,
    perek17: 17,
    perek18: 9,
    perek19: 10,
    perek20: 7,
    perek21: 3,
    perek22: 10,
    perek23: 5,
    perek24: 17,
    perek25: 9,
    perek26: 9,
    perek27: 12,
    perek28: 10,
    perek29: 8,
    perek30: 4
  },
  53: {
    name: 'ohalot',
    mishnayot: 134,
    perekim: 18,
    perek1: 8,
    perek2: 7,
    perek3: 7,
    perek4: 3,
    perek5: 7,
    perek6: 7,
    perek7: 6,
    perek8: 6,
    perek9: 16,
    perek10: 7,
    perek11: 9,
    perek12: 8,
    perek13: 6,
    perek14: 7,
    perek15: 10,
    perek16: 5,
    perek17: 5,
    perek18: 10
  },
  54: {
    name: 'negaim',
    mishnayot: 115,
    perekim: 14,
    perek1: 6,
    perek2: 5,
    perek3: 8,
    perek4: 11,
    perek5: 5,
    perek6: 8,
    perek7: 5,
    perek8: 10,
    perek9: 3,
    perek10: 10,
    perek11: 12,
    perek12: 7,
    perek13: 12,
    perek14: 13
  },
  55: {
    name: 'para',
    mishnayot: 96,
    perekim: 12,
    perek1: 4,
    perek2: 5,
    perek3: 11,
    perek4: 4,
    perek5: 9,
    perek6: 5,
    perek7: 12,
    perek8: 11,
    perek9: 9,
    perek10: 6,
    perek11: 9,
    perek12: 11
  },
  56: {
    name: 'taharot',
    mishnayot: 92,
    perekim: 10,
    perek1: 9,
    perek2: 8,
    perek3: 8,
    perek4: 13,
    perek5: 9,
    perek6: 10,
    perek7: 9,
    perek8: 9,
    perek9: 9,
    perek10: 8
  },
  57: {
    name: 'mikvaot',
    mishnayot: 71,
    perekim: 10,
    perek1: 8,
    perek2: 10,
    perek3: 4,
    perek4: 5,
    perek5: 6,
    perek6: 11,
    perek7: 7,
    perek8: 5,
    perek9: 7,
    perek10: 8
  },
  58: {
    name: 'nidda',
    mishnayot: 79,
    perekim: 10,
    perek1: 7,
    perek2: 7,
    perek3: 7,
    perek4: 7,
    perek5: 9,
    perek6: 14,
    perek7: 5,
    perek8: 4,
    perek9: 11,
    perek10: 8
  },
  59: {
    name: 'machshirin',
    mishnayot: 54,
    perekim: 6,
    perek1: 6,
    perek2: 11,
    perek3: 8,
    perek4: 10,
    perek5: 11,
    perek6: 8
  },
  60: {
    name: 'zavim',
    mishnayot: 32,
    perekim: 5,
    perek1: 6,
    perek2: 4,
    perek3: 3,
    perek4: 7,
    perek5: 12
  },
  61: {
    name: 'tevulYom',
    mishnayot: 26,
    perekim: 4,
    perek1: 5,
    perek2: 8,
    perek3: 6,
    perek4: 7
  },
  62: {
    name: 'yadayim',
    mishnayot: 22,
    perekim: 4,
    perek1: 5,
    perek2: 4,
    perek3: 5,
    perek4: 8
  },
  63: {
    name: 'oktzin',
    mishnayot: 28,
    perekim: 3,
    perek1: 6,
    perek2: 10,
    perek3: 12
  }

}


const getSumOfPrakim = (masechetId) => {

  return mishnayot[masechetId].perekim
}

const getSumOfMishnayot = (masechetId) => {
  return mishnayot[masechetId].mishnayot
}

const getSumOfMishnayotInPerek = (masechetId, perek) => {
  return mishnayot[masechetId]['perek' + perek]
}

const getSumOfMishnayotInMasechtot = (massechtot) => {
  let sum = 0;
  for (let masechetId in massechtot) {
    sum += getSumOfMishnayot(masechetId)
  }
  return sum
}

// const findIdOfMasechet = (masechet) => {
//     for (let id in shas.massechtot) {
//         if (shas.massechtot[id].hebrewName === masechet) {
//             return id
//         }
//     }
// }



</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.form-line {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.days-box {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 3px solid #ccc;
  border-radius: 5px;
}
</style>