<template>
    <div id="nav">
        <nav class="navbar navbar-expand navbar-light bg-light">
            <h5><router-link class="navbar-brand" to="/">Home</router-link></h5>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <template v-if="auth">
                        <li class="nav-item">
                            <h5 class="nav-link"><router-link to="/nets">Lora nets</router-link></h5>
                        </li>
                        <li v-if="network_map"  class="nav-item">
                            <h5 class="nav-link"><router-link to="/netmap">Map</router-link></h5>
                        </li>
                        <li class="nav-item">
                            <h5 class="nav-link" @click="signOut"><router-link to="/">Sign Out</router-link></h5>
                        </li>
                    </template>
                    <li v-else   class="nav-item">
                        <h5 class="nav-link"><router-link to="/login">Sign In</router-link></h5>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>


<script>

    export default {
        name: 'Nav',
        data() {
            return {
                userName: 'guest',
                userId: 0,
            }
        },
        computed: {
            auth() {
                if(this.$store.getters.getUserName  != 'guest') {
                    this.loadUserName();
                    return true
                }
                return false
            },
            network_map() {
                if(this.$store.getters.getNetworkId  > 0) {
                    return true
                }
                return false
            }
        },
        created() {
            this.loadUserName()
        },
        methods: {
            async loadUserId() {
                var url = new URL(this.$store.getters.getServerUrl + "/user/" + this.userName);
                const listId = await fetch(url).then(response => response.json());
                sessionStorage.setItem("auth_id", listId[0].id);
                this.$store.commit('setUserId', listId[0].id);
                this.userId = listId[0].id
            },
            async loadUserName() {
                this.userName = this.$store.getters.getUserName;
                if(this.userName != 'guest') {
                    this.loadUserId();
                }
            },
            async signOut() {
                var token = 'Token ' + sessionStorage.getItem("auth_token");
                const response = await fetch(`${this.$store.getters.getTokenUrl}/auth/token/logout/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                });
                this.$store.commit('setUserName', 'guest');
                this.$store.commit('setUserId', 0);
                this.$store.commit('setNetworkId', 0);
                this.$store.commit('setToken', '');
                sessionStorage.removeItem("auth_token");
                sessionStorage.removeItem("auth_name");
                sessionStorage.removeItem("auth_id");
            }
        }
    }
</script>