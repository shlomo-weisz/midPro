<template>
    <div id="row">
        <div class="dayline">
            <div class="dayline-header">
                <p> יום {{ day }} </p>
                <p> -</p>
                <p>{{ date }}</p>
            </div>
            <div class="dayline-body">
                <p>-מ</p>
                <p>"{{ start[0] + ' פרק ' + start[1] + ' משנה ' + start[2] }}"</p>
                &nbsp
                <p>עד </p>
                &nbsp
                <p>"{{ end[0] + ' פרק ' + end[1] + ' משנה ' + end[2] }}"</p>
                
            </div><div class="sum">
                    <p>משניות ליום: {{ mishnayotPerDay }}</p>
                </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'Dayline',
    props: {
        day: String,
        date: String,
        start: Array,
        end: Array,
        mishnayotPerDay: Number

    },
}
</script>
<style scoped>
.dayline {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    background-color: #f5f5f5;
}

.dayline-header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    background-color: #f5f5f5;
}

.dayline-body {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    background-color: #f5f5f5;
}
.sum {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    margin: 5px;
    padding: 5px;
    background-color: #f5f5f5;
}
</style>