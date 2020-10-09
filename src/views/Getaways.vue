<template>
    <div name="Nodes">
        <h1>Nodes of {{this.name}} lora network</h1>

        <div v-for="getaway in listGetaway" :key="getaway.id">
            <table class="table table-dark">
                <thead>
                    <th scope="col">Getaway name</th>
                    <th scope="col">Latitude</th>
                    <th scope="col">Longitude</th>
                </thead>
                <tbody>
                <tr>
                    <td>{{getaway.name}}</td>
                    <td>{{getaway.latitude}}</td>
                    <td>{{getaway.longitude}}</td>
                </tr>
                </tbody>
            </table>
            <Node :nodes="getaway.nodes"/>
        </div>

    </div>
</template>

<script>
    import Node from "../components/Node"
    export default {
        name: "Getaways",
        props: ['id','name'],
        components: {Node},
        data() {
            return {
                listGetaway: [],
                token: '',
            }
        },
        created() {
            this.loadListGetaway()
        },
        methods: {
            async loadListGetaway() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listGetaway = await fetch(`${this.$store.getters.getServerUrl}/network/${this.id}/`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json())
                }
                // console.log(this.listNode)
            }
        }
    }
</script>

<style scoped>
    /*.table {*/
        /*background-color: #35a8e4;*/
    /*}*/
</style>