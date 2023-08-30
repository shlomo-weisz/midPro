<template></template>

<script>
export default {
    name: 'newTable',
    props: {
        masechtot: Array,
        date: String,
        name: String,
        days: Array,
        limit: Number,
    },
    data() {
        return {
            masechtotIds: [],
            SumOfMishnayot: 0,
            SumOfPrakim: 0,
            SumOfMasechtot: 0,
            daysNeeded: 0,



        }
    },
    computed:
    {
        masechtotIds() {
            for (let masechet in this.masechtot) {
                this.masechtotIds.push(findIdOfMasechet(masechet))
            }
        },
        SumOfMishnayot() {
            let sum = 0;
            for (let masechetId in this.masechtotIds) {
                sum += this.getSumOfMishnayot(masechetId)
            }
            return sum
        },
        SumOfPrakim() {
            let sum = 0;
            for (let masechetId in this.masechtotIds) {
                sum += this.getSumOfPrakim(masechetId)
            }
            return sum
        },
        SumOfMasechtot() {
            return this.masechtotIds.length
        },
        daysNeeded() {
            if (this.limit)
                return Math.ceil(this.SumOfMishnayot / this.limit)
            else
                return 30
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


        getSumOfPrakim(masechetId) {

            return mishnayot[masechetId].perekim
        },

        getSumOfMishnayot(masechetId) {
            return mishnayot[masechetId].mishnayot
        },

        getSumOfMishnayotInPerek(masechetId, perek) {
            return mishnayot[masechetId]['perek' + perek]
        },

        getSumOfMishnayotInMasechtot(massechtot) {
            let sum = 0;
            for (let masechetId in massechtot) {
                sum += getSumOfMishnayot(masechetId)
            }
            return sum
        }

    }
}
</script>