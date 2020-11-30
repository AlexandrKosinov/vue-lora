<template>
    <div name="Chart">
        <h3>{{this.name}} sensor's chart</h3>
        <div v-if="chart_ok">
            <label>Choose a start date</label>
            <b-form-datepicker id="st-datepicker" v-model="date_start" class="mb-2"></b-form-datepicker>
            <label>Choose an end date</label>
            <b-form-datepicker id="e-datepicker" v-model="date_end" class="mb-2"></b-form-datepicker>
        </div>
        <div>
            <button type="button" class="btn btn-info" @click="loadChartData">Filter: date period</button>
        </div>
        <div v-if="chart_ok">
            <LineChart :chartdata="chartData" :options="chartOptions"/>
        </div>
    </div>
</template>

<script>
    import LineChart from "../components/LineChart";
    export default {
        name: "Chart",
        props: ['id', 'name', 'start_date', 'end_date'],
        components: {LineChart},
        data() { return {
            loaded: false,
            chartData:  {
                labels: [],
                datasets: []
            },
            chartOptions: {responsive: true, maintainAspectRatio: false},
            date_start: '',
            date_end: '',
        }},
        computed: {
            chart_ok() {
                return this.loaded
            },
        },
        created() {
            this.setDate(),
            this.loadChartData()
        },
        methods: {
            setDate() {
                this.date_start = this.start_date;
                this.date_end = this.end_date;
            },
            async loadChartData() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.loaded = false
                    try {
                        const resp = await fetch(`${this.$store.getters.getServerUrl}/chart/${this.id}/${this.date_start}/${this.date_end}/`,{
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `${this.token}`,
                            }
                        }).then(response => response.json())
                            .then(res => {
                                const datasets = [
                                    {
                                        label: '',
                                        backgroundColor: '#f87979',
                                        data: res.map(item => item.info)
                                    }
                                ];
                                this.chartData = {
                                    labels: res.map(item => item.date),
                                    datasets: datasets
                                }
                            });
                        // console.log(this.chartData.datasets[0].data);
                        // console.log(this.chartData.labels);
                        this.loaded = true;
                    } catch (e) {
                        console.error(e)
                    }
                }
                // console.log(this.chartData)
            },
        }
    }
</script>