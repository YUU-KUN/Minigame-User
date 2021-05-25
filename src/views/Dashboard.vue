<template>
  <div class="container-fluid" style="margin-top:100px">
  <div class="row">
        <div class="col-md-12">
            <div class="card shadow mb-4" >
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Dashboard</h6>
              </div>
              <div class="progress" style="height: 5px;" v-if="loading">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="row" v-if="!loading && gameweb.length == 0" style="text-align:center">
                <div class="col">
                  <img
                    src="../../public/assets/icons/Astronaut-01.svg"
                    class="card-img-top"
                    alt="..."
                    style="margin:auto; width: 300px"
                  />
                  <div style="margin-bottom: 50px">
                    <h1><strong>OH NO!</strong></h1>
                    <p>You have no transactions yet <br />Let's change that!</p>
                  </div>
                </div>
              </div>
              <div class="row" v-for="(game, index) in gameweb" :key="index" v-else style="margin: 10px 0">
                  <div class="col-4 d-flex justify-content-center">
                    <img v-if="game.gameReady" @click="gameDetail(index)" :src="game.gameImage" alt="Game Image" height="200px" style="border-radius:5px" id="imageHover" class="img-thumbnail">
                    <img v-else :src="game.gameImage" alt="Game Image" height="200px" style="border-radius:5px; cursor: not-allowed" class="img-thumbnail">
                  </div>
                  <div class="col-8 d-flex align-items-center">
                    <div class="col">
                      <div class="row" >
                        <h1><b>{{game.gameTitle}}</b></h1>
                      </div>
                      <div class="row" >
                        <span v-if="game.gameGenre.length > 1">
                          <span class="badge badge-pill badge-primary" v-for="(genre, index) in game.gameGenre" :key="index" style="margin: 0 10px 0 0; font-size:16px">
                            {{genre}}
                          </span>
                        </span>
                        <span v-else>
                          <span v-for="(gameSplit, index) in game.gameGenre.join(',').split(',')" :key="index">
                            <span class="badge badge-pill badge-primary" style="margin: 0 10px 0 0; font-size:16px">
                              {{gameSplit}}
                            </span>
                          </span>
                        </span>
                      </div>
                      <div class="row" v-if="game.gameRating" >
                          <li v-for="index in game.gameRating" :key="index" style="display:inline">
                            <span style="color:orange;"><h2>&starf;</h2> </span>
                          </li>
                      </div>
                      <div class="row" v-else>
                            <span><h2>-</h2> </span>
                      </div>
                      <div class="row">
                          <b-icon class="h4 mb-1" icon="cash" style="color: orange; margin: 0 5px"></b-icon>
                          <span v-if="!game.gameDiscount" ><h5><b>{{game.gamePrice | rupiah}}</b></h5></span>
                          <span v-else><span style="text-decoration: line-through;">{{game.gamePrice | rupiah}}</span>&nbsp;	<span style="margin: 0 10px" ><h5><b>{{game.gamePriceAfterDiscount | rupiah}}</b>&nbsp;</h5><span style="color:red"><h5><b>{{game.gameDiscount}}% OFF!</b></h5></span></span> </span>
                      </div>
                      <br>
                      <div class="row">
                          <button v-if="game.gameReady" @click="gameDetail(index)" class="btn btn-warning d-flex align-items-center">
                            <b>Detail Game</b>
                          </button>
                          <button v-else class="btn btn-warning d-flex align-items-center" disabled>
                            <b>Coming Soon</b>
                          </button>
                      </div>
                    </div>
                  </div>

                  <!-- <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
                    <div class="toast" style="position: absolute; top: 0; right: 0;">
                      <div class="toast-header">
                        <img src="" class="rounded mr-2" alt="...">
                        <strong class="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                        <button @click="info == false" type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="toast-body">
                        Welcome {{user.username}}
                      </div>
                    </div>
                  </div> -->
              </div>
            </div>


            <!-- ONLY FOR DEVELOPING -->
              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Current User</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{currentUser}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <!-- ONLY FOR DEVELOPING -->

        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      gameweb: '',
      gameId: '',
      currentUser: '',
      totalUser: '',
      loading: false,
    }
  },
  methods: {
    // getCurrentUser() {
    //   this.axios.get('user/profile').then(response => {
    //     this.currentUser = response.data.data
    //   })
    // },
    getWebGame() {
      this.loading = true
      this.axios.get('/game/web/list').then(response => {
        this.gameweb = response.data.data
        this.loading = false
      }).catch(error => {
        console.log(error.response);
        this.loading = false
        this.$store.dispatch('logout')
      })
    },
    gameDetail(index) {
      this.gameId = this.gameweb[index].gameId
      this.$router.push({name: 'GameDetail', params:{
          gameId: this.gameId,
          currentUser: this.currentUser,
        } 
      })
    },
    setTimeout() {
      setTimeout(this.getWebGame(), 2000)
    }
  },
  mounted() {
    this.setTimeout()
    this.getWebGame()
    // this.getCurrentUser()
  },
  created() {
      const token = localStorage.getItem('Authorization')
      this.axios.defaults.headers.common['Authorization'] = 'Bearer '+token
  }

}
</script>

<style>

#imageHover{
  transition: .5s ease;
}

#imageHover:hover{
  cursor: pointer;
  opacity: 0.5;
}
</style>