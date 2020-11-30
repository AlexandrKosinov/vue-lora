<template>
    <div name="Data">
        <h3>Data from {{this.name}} sensor</h3>
        <div>
            <button type="button" class="btn btn-success" @click="goToChart">Chart</button>
        </div>
        <div>
            <label>Choose a start date</label>
            <b-form-datepicker id="start-datepicker" v-model="date_start" class="mb-2"></b-form-datepicker>
            <label>Choose an end date</label>
            <b-form-datepicker id="end-datepicker" v-model="date_end" class="mb-2"></b-form-datepicker>
        </div>
        <div>
            <button type="button" class="btn btn-info" @click="loadDateListData">Filter: date period</button>
        </div>
        <div>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">DateTime</th>
                    <th scope="col">Data</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="sensor in paginatedData" :key="sensor.id">
                    <td>{{sensor.date}}</td>
                    <td>{{sensor.info}}</td>
                </tr>
                </tbody>
            </table>
            <button @click="prevPage" :disabled="pageNumber==0">Previous</button>
            <button @click="nextPage" :disabled="pageNumber >= pageCount -1">Next</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: "Data",
        props: ['id', 'name'],
        data() {
            return {
                listData: [],
                token: '',
                pageNumber: 0,
                size: 10,
                date_start: '',
                date_end: '',
            }
        },
        computed: {
            pageCount(){
                let l = this.listData.length,
                    s = this.size;
                return Math.ceil(l/s);
            },
            paginatedData(){
                const start = this.pageNumber * this.size,
                    end = start + this.size;
                return this.listData.slice(start, end);
            },
        },
        created() {
            this.setToday(),
            this.loadDateListData()
        },
        methods: {
            setToday() {
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                this.date_start = date;
                this.date_end = date;
            },
            nextPage(){
                this.pageNumber++;
            },
            prevPage(){
                this.pageNumber--;
            },
            goToChart() {
                this.$router.push({name: 'Chart', params: {id: this.id, name: this.name, start_date: this.date_start, end_date: this.date_end}});
            },
            async loadDateListData() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listData = await fetch(`${this.$store.getters.getServerUrl}/device/${this.id}/${this.date_start}/${this.date_end}/`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json());
                }
                // console.log(this.listData)
            },
        }
    }
</script>