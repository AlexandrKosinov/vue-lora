<template>
    <div class="log">
        <div class="form-row px-6">
            <form class="form-horizontal">
                <div class="form-group">
                    <div class="col-sm-6">
                        <input v-model="login" type="text" placeholder="login"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <input v-model="password" type="password" placeholder="password"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-6">
                        <button @click="setToken">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login: '',
                password: '',
            }
        },
        components: {},
        methods: {
            async setToken() {
                const response = await fetch(`${this.$store.getters.getTokenUrl}/auth/token/login/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username: this.login, password: this.password})
                })
                    .then(
                        function(response) {
                            if (response.status !== 200) {
                                // console.log('Looks like there was a problem. Status Code: ' + response.status);
                                return;
                            }
                            response.json().then(
                                 function(data) {
                                     // console.log(data.auth_token);
                                     sessionStorage.setItem("auth_token", data.auth_token);
                                 }
                            );
                        }
                    )
                    .catch(function(err) {
                        console.log('Fetch Error :-S', err);
                    });
                this.$store.commit('setToken', sessionStorage.getItem("auth_token"));
                sessionStorage.setItem("auth_name", this.login);
                this.$store.commit('setUserName', this.login);
                this.$router.push({name: "Home"});
            }
        }
    }
</script>

<style scoped>
</style>