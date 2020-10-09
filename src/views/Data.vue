<template>
    <div name="Data">
        <h1>Data from {{this.name}} sensor</h1>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">DateTime</th>
                <th scope="col">Data</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="sensor in listData" :key="sensor.id">
                <td>{{sensor.date}}</td>
                <td>{{sensor.info}}</td>
            </tr>
            </tbody>
        </table>
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
            }
        },
        created() {
            this.loadListData()
        },
        methods: {
            async loadListData() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listData = await fetch(`${this.$store.getters.getServerUrl}/device/${this.id}/`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json())
                }
                // console.log(this.listData)
            }
        }
    }
</script>