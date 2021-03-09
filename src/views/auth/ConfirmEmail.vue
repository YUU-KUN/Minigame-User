<template>
  <div class="row-lg-4 mx-auto" style="margin-top: 300px">
    <div class="col-lg-4 mx-auto" style="margin: auto auto">
      <div class="card" style="text-align: center">
        <div class="auth-form-light p-5">
          <h4><b>Thanks for signing up!</b></h4>
          <!-- <h4><b>Verify Your Email Address</b></h4> -->
          <h6 class="font-weight-light">
            Please check the email we sent and click the button to verify your
            account.
          </h6>
          <b>Tips:</b> Psst. If you couldn't find it, check the spam folder!
          <br />
          <br />
          <!-- <h6 class="font-weight-light">Or click the button below to request new verification email</h6> -->
          <b>Not receiving our email yet?</b>
          <button class="btn btn-success btn-lg btn-block">
            Request New Verification Email
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  methods: {
  },
};
</script>

<style scoped>
html {
  height: 100%;
  width: 100%;
}
body {
  width: 100%;
  height: 100%;
}
</style>
