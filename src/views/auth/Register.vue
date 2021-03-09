<template>
<div class="row" id="ioginPanel">
        <div class="col-8"></div>
        <div class="col" style="background: white; right: 0; height: 100%">
            <div class="row d-flex justify-content-center" style="padding: 0 10px; height: 100% ">
                <form @submit.prevent="Register">
                    <div class="row d-flex justify-content-center">
                        <h2 style="text-align:center;">
                            Hi there!
                            <br>
                            Welcome to User Register Page!
                        </h2>
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="name" ><h4 ><b-icon icon="pencil-square" style="margin-right: 10px"></b-icon>Name</h4></label>
                        <input type="text" class="form-control form-control-lg" id="name" placeholder="Full Name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label for="username" ><h4 ><b-icon icon="pencil-square" style="margin-right: 10px"></b-icon>Username</h4></label>
                        <input type="text" class="form-control form-control-lg" id="username" aria-describedby="emailHelp" placeholder="Your username" v-model="username">
                    </div>
                    <div class="form-group">
                        <label for="email" ><h4 ><b-icon icon="envelope-fill" style="margin-right: 10px"></b-icon>Email</h4></label>
                        <input type="email" class="form-control form-control-lg" id="email" aria-describedby="emailHelp" placeholder="youremail@dress.com" v-model="email">
                    </div>
                    <p></p>
                    <div class="form-group">
                        <label for="password"> <h4><b-icon icon="shield-lock-fill" style="margin-right: 10px"></b-icon>Password</h4></label>
                        <input :type="passwordFieldType" class="form-control form-control-lg" id="password" placeholder="Password" v-model="password">
                        <span @click="showPassword('password')" class="field-icon"><b-icon :icon="iconPassword"></b-icon></span>
                    </div>          
                    <div class="form-group">
                        <label for="passwordConfirmation"> <h4><b-icon icon="shield-fill-check" style="margin-right: 10px"></b-icon>Password Confirmation</h4></label>
                        <input :type="confirmPasswordFieldType" class="form-control form-control-lg" id="passwordConfirmation" placeholder="Confirm Password" v-model="passwordConfirmation">
                        <span @click="showPassword('confirmPassword')" class="field-icon"><b-icon :icon="iconConfirmPassword"></b-icon></span>
                    </div>   
                    <button type="submit" class="btn btn-primary btn-block btn-lg" style="width:100%; margin:10px auto">
                        <span v-if="loading" class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
                        <span v-else>Sign Up</span>
                    </button>
                    <div class="row d-flex justify-content-center" style="text-align:center;">
                        <span>
                            Already have account?
                            <router-link to="/login" style="text-decoration: none">Sign In</router-link>
                        </span>
                    </div>
                </form>
            </div>
        </div>

        <b-toast id="my-toast" :variant="toastVariant" solid>
            <template #toast-title>
              <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                <strong class="mr-auto">{{toastTitle}}</strong>
                <small class="text-muted mr-2">{{time}} seconds ago</small>
              </div>
            </template>
            <b>{{toastMessage}}</b>
        </b-toast>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            name: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',

            // show password
            passwordFieldType: 'password',
            confirmPasswordFieldType: 'password',
            iconPassword: 'eye',
            iconConfirmPassword: 'eye',

            //buat toastnya
            date: moment(0),
            toastTitle: '',
            toastMessage: '',
            toastVariant: '',

            loading: false,
        }
    },
    methods: {
        Register() {   
            this.loading = true
            this.date = moment(0)
            const registerData = {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                confirmPassword: this.passwordConfirmation,
            }
            this.$store.dispatch('register', registerData)
            .then(response => {
                this.loading = false
                this.$router.push('/emailConfirmation')
                console.log(response);
            })
            .catch(err => {
                    this.loading = false
                    this.$bvToast.show('my-toast')
                    this.toastVariant = 'danger'
                    this.toastTitle = 'Terdapat Kesalahan'
                    if (err.response.data[0]) {
                        this.toastMessage = err.response.data[0].message
				    } else {
                        this.toastMessage = err.response.data.message;
                    }
                }
            )
        },
        showPassword(params) {
            if (params === 'confirmPassword') {
                this.iconConfirmPassword = this.iconConfirmPassword === 'eye' ? 'eye-slash' : 'eye'
                this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password'
            } else {
                this.iconPassword = this.iconPassword === 'eye' ? 'eye-slash' : 'eye'
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
            }
        }
    },
    computed: {
        time(){
            return this.date.format('s');
        }
    },

    mounted(){
  	    var timer = setInterval(() => {
            this.date = moment(this.date.add(1, 'seconds'));
            if(this.date.diff(moment(0)) === 60){
              clearInterval(timer);
            }
        }, 1000);
  }
}
</script>

<style>
    html {
        height: 100%;
        width: 100%;
    }
    body {
        width: 100%;
        height: 100%;
        background-image: url('../../../public/admin/img/bg-login.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    #ioginPanel {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    form {
        width: 100%;
        margin: auto 15px
    }
    .form-group {
        margin: 20px auto
    }
    a {
        text-decoration: none;
    }

    .field-icon {
        float: right; 
        margin-left: -25px; 
        margin-right: 25px; 
        margin-top: -35px; 
        /* margin-bottom: 25px;  */
        position: relative; 
        z-index: 2;
    }
</style>