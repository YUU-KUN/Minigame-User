<template>
  <div>
    <!-- Redirecting to Login Page... -->
    <div class="row-lg-4 mx-auto" style="margin-top: 300px ">
        <div class="col-lg-4 mx-auto" style="margin: auto auto;">
            <div class="card" style="text-align:center">
              <div class="auth-form-light p-5">
                <h4><b>Thanks for Verifying!</b></h4>
                <h6 class="font-weight-light">Hold on, we're gonna redirect you to the login page.</h6>
                <br>
                <h6 class="font-weight-light">Or click the button below you're not redirected in 10 seconds!</h6>
                <button @click="redirect" class="btn btn-success btn-lg btn-block">Redirect me now!</button>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        getUrl() {
            this.token = this.$route.query.token
            console.log('Token: '+this.token);
        },
        verify() {
            this.axios.get('user/verify/'+this.token).then(response => {
                console.log(response);
                console.log('User is Verified!');
            }).catch(error => {
                console.log('Verification Failed');
                console.log(error.response);
            })
        },
        redirect() {
            this.$router.push('/login')
        }
    }, 
    mounted() {
        this.getUrl()
        this.verify()
        setTimeout(function(){
            this.redirect()
        }, 10000);
    }
}
</script>

<style>

</style>