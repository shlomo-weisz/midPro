<template>
    <div class="mainDiv">
        <div class="firstLine">
            <p>בס"ד</p>
            <p>שלום {{ name }}</p>
            <p>{{ currentDate }}</p>

        </div>

        <div class="second">
            <p>תכנית לימוד עבור מסכתות {{ masechtos }}</p>
            <p>בימים {{ days }}</p>
        </div>
        <div class="third">
            <p>מתאריך {{ hestartDate }} עד {{ heendDate }}</p>
        </div>
        <div class="fourth">
            <p>סה"כ {{ totalMishnayos }} משניות במשך {{ totalDays }} ימי לימוד</p>

        </div>

    </div>
</template>
<script>
import {HebrewCalendar, HDate, Location, Event} from '@hebcal/core';

export default {
    name: 'header',
    props: {
        name: String,
        currentDate: String,
        startDate: String,
        endDate: String,
        totalDays: Number,
        totalMishnayos: Number,
        days: Array,
        masechtos: Array,

    },
    data() {
        return {
            hestartDate: "",
            heendDate: "",

        }
    },
    computed: {

    },
    mounted() {
        this.setHeDate();
    },
    methods: {       
        setHeDate() {
            let hebDate = new HDate(this.startDate).renderGematriya();    
            this.hestartDate = hebDate;
            hebDate = new HDate(this.endDate).renderGematriya();
            this.heendDate = hebDate;
        },

    }
}
</script>
<style scoped>
.mainDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #6ad5f0;
    border: 5px solid black;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    height: 100%;
    
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #000000;
}

.firstLine {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #000000;
}

.second {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #000000;
}

.third {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #000000;
}
.fourth {
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #000000;
}
</style>