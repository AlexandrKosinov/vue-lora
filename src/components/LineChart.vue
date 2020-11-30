<script>
    import {Line} from 'vue-chartjs';
    export default {
        extends: Line,
        name: 'LineChart',
        props: {
            chartdata: {
                type: Object,
                default: null
            },
            options: {
                type: Object,
                default: null
            }
        },
        mounted () {
            this.renderChart(this.chartdata, this.options);
            // console.log(this.chartdata)
        }
    }
</script>

<style>

</style>