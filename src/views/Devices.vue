<template>
    <div name="Devs">
        <h1>Devices of {{this.name}} lora node</h1>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Units</th>
                <th scope="col">DataList</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="device in listDevice" :key="device.id">
                <td>{{device.name}}</td>
                <td>{{device.description}}</td>
                <td>{{device.units}}</td>
                <td><a href="#" @click="goToData(device.id, device.name)" >data</a></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
    export default {
        name: "Devices",
        props: ['id', 'name'],
        data() {
            return {
                listDevice: [],
                token: '',
            }
        },
        created() {
            this.loadListDevice()
        },
        methods: {
            async loadListDevice() {
                if(sessionStorage.getItem("auth_token")) {
                    this.token = 'Token ' + sessionStorage.getItem("auth_token");
                    this.listDevice = await fetch(`${this.$store.getters.getServerUrl}/node/${this.id}/`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `${this.token}`,
                        }
                    }).then(response => response.json())
                }
                // console.log(this.listDevice)
            },
            goToData(id, name) {
                this.$router.push({name: 'Data', params: {id: id, name: name}})
            }
        }
    }
</script>