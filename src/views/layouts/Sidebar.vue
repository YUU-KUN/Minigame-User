<template>
<ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar" style="background-color: #111;">
    <!-- Sidebar - Brand -->
    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="">
        <span v-if="whoami">Halo, {{userProfile.name}}</span> <span v-else>Halo, User</span>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <li class="nav-item">
        <router-link to="/" class="nav-link">
            <i class="fas fa-fw fa-school"></i>
            <span>Dashboard</span>
        </router-link>
    </li>
    <li class="nav-item">
        <router-link to="/myGame" class="nav-link">
            <i class="fas fa-fw fa-school"></i>
            <span>My Game</span>
        </router-link>
    </li>

    <li class="nav-item">
        <router-link to="/transaction" class="nav-link">
            <i class="fas fa-fw fa-school"></i>
            <span>Transaction</span>
        </router-link>
    </li>

    <li class="nav-item">
        <router-link to="/cart" class="nav-link">
            <i class="fas fa-fw fa-school"></i>
            <span>Cart</span>
        </router-link>
    </li>

    <li class="nav-item" >
        <div class="nav-link" @click="logout" style="cursor: pointer">
            <i class="fas fa-fw fa-school"></i>
            <span>Logout</span>
        </div>
    </li>
</ul>
</template>

<script>
export default {
    data() {
        return {
            whoami: false,
            userProfile: '',
        }
    },
    methods: {
        whoAmi() {
            this.axios.get('user/profile').then(response => {
                this.userProfile = response.data.data
                this.whoami = true
            }).catch(error => {
                console.log(error.response);
            })
        },
        logout() {
            console.log('Logout Terpencet');
            this.$store.dispatch('logout')
            .then(() => this.$router.push('/login'))
            .catch(err => console.log(err.response))
        }
    },
    mounted() {
        this.whoAmi()
    }

}
</script>

<style>
.nav-item a.router-link-exact-active::before{
  position: absolute;
  content: "";
  left: 5px;
  width: 5px;
  height: 23px;
  background: #5f6be3;
  border-radius: 25px;
}
</style>