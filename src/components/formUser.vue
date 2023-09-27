<template>
    <div class="formDiv">
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
        <div class="form-line daysLine">
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
            <select id="limit" :disabled="thereIsDuration" v-model="limit">
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
            <input type="text" id="duration" min="0" max="365" :disabled="thereIsLimit" v-model="duration">
        </div>


        <div class="form-line">
            <div>
                <VueMultiselect v-model="selected" :options="options" :multiple="true">
                </VueMultiselect>
            </div>

        </div>
        <div class="form-line">
            <button type="submit" @click.prevent="creatNewTable">צור טבלה</button>
        </div>


    </form>
</div>
</template>
<script>
import VueMultiselect from 'vue-multiselect'
export default {
    emits: {
        creatNewTable: ([name, date, days, limit, duration, selected]) => {
            if (name === '') {
                alert('יש להכניס שם לטבלה')
                return false
            } else if (date === '') {
                alert('יש להכניס תאריך התחלה')
                return false
            } else if (selected === null) {
                alert('יש לבחור מסכתות')
                return false
            } else if (days[0] === false && this.days[1] === false && this.days[2] === false && this.days[3] === false && this.days[4] === false && this.days[5] === false && this.days[6] === false) {
                alert('יש לבחור ימי לימוד')
                return false
            }
            else {
                return true
            }
        }
    },
    components: { VueMultiselect},
    name: 'formUser',
    data() {
        return {
            showTable: false,
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
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            return today
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
            if (parseInt(this.duration) > 0) {
                this.thereIsDuration = true
            } else {
                this.thereIsDuration = false
            }
        },


    },
    methods: {
        creatNewTable() {
            this.$emit('creatNewTable', [this.name, this.date, this.days, this.limit, this.duration, this.selected])
        }
    }
}
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
    margin: 10px;
    padding: 10px;
    border: 3px solid #ccc;
    border-radius: 5px;
}

.formDiv {
    display: flex;
    width: 50%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(177, 234, 238);
    margin: 10px;
    padding: 10px;
    border: 9px solid #1b1313;
    border-radius: 5px;
}

.daysLine {
    width: 100%;
    flex-wrap: wrap;
}
</style>