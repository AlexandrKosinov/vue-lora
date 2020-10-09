<template>
    <div name="Nets">
        <h1>{{this.userName}} lora networks</h1>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Nodes</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="net in listNet" :key="net.id">
                <th scope="row">{{net.id}}</th>
                <td>{{net.name}}</td>
                <td><a href="#" @click="goToGetaways(net.id,net.name)" >nodes</a></td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        name: "Nets",
        // props: ['id','name'],
        data() {
            return {
                listNet: [],
                userName: String,
                userId: 0,
                token: '',
            }
        },
        components: {},
        created() {
            this.loadListNet()
        },
        methods: {
            async loadListNet() {
                if(sessionStorage.getItem("auth_token")) {
                    this.userId = sessionStorage.getItem("auth_id");
                    this.userName = sessionStorage.getItem("auth_name");
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listNet = await fetch(`${this.$store.getters.getServerUrl}/owner/${this.userId}/`,{
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json());
                }
                // console.log(this.userId)
                // console.log(this.userName)
                // console.log(this.token)
            },
            goToGetaways(id, name) {
                this.$router.push({name: 'Getaways', params: {id: id, name: name}})
            }
        }
    }
</script>