<template>
  <div class="container-fluid" style="margin-top: 100px">
    <div class="row">
      <div class="col-4">
        <div class="card shadow mb-4">
          <!-- <div class="col-4 d-flex justify-content-center"> -->
          <img 
            class="img-thumbnail"
            :src="detailGame.posterImage"
            alt="Game Image"
            height="auto"
          />
          <!-- </div> -->
        </div>

        <span v-if="detailGame.gameReady">
          <!-- <span v-if="detailGame.canPlay"> -->
            <span v-if="detailGame.uniqueCode">
        <a :href="'https://minigames.tranceformasiindonesia.com/'+detailGame.gameUrl+'?token='+accessToken" target="_blank" style="text-decoration: none">
          <button
            class="btn btn-success btn-lg d-flex align-items-center justify-content-center"
            style="width: 100%; margin: 20px auto"
          >
            <b-icon icon="play-fill" font-scale="2" aria-hidden="true"></b-icon
            ><b>Play Game</b>
          </button>
        </a>
        </span>
        <!-- </span> -->
        <span v-else>
        <button
          class="btn btn-warning btn-lg d-flex align-items-center justify-content-center"
          style="width: 100%; margin: 20px auto"
          data-fancybox data-src="#addToCart" href="javascript:;"
        >
        <span v-if="loading" class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>
        <span v-else>
          <b-icon icon="cart-plus-fill" font-scale="1.4" aria-hidden="true"></b-icon
          ><b>Add to Cart</b>
        </span>
        </button>
        </span>
        </span>

        <span v-else>
          <button
          class="btn btn-warning btn-lg d-flex align-items-center justify-content-center"
          style="width: 100%; margin: 20px auto"
          disabled
        ><b>Coming Soon</b>
        </button>
        </span>
      </div>

      <div class="col-8">
        <div class="card shadow mb-4">
          <div class="row gx-5">
              <div class="col-md-12 mt-3">
                  <div class="form">
                      <div class="form-group">
                            <div class="row">
                              <div class="col-md-12">
                                  <div class="panel panel-default">
                                      <div class="panel-body">

                                          <div class="col">
                                              <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                                  <div class="col">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <h1>
                                                            <b> {{detailGame.gameTitle}}</b>
                                                          </h1>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                          
                                          <div class="col">
                                              <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                                  <div class="col">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <h4>
                                                            <strong>Description</strong>
                                                          </h4>
                                                          <p>
                                                            {{detailGame.gameDescription}}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                          <div class="col">
                                              <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                                  <div class="col">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <h4>
                                                            <strong>Categories</strong>
                                                          </h4>
                                                          <div class="col-12" style="padding: 0">
                                                            <span>
                                                              <span v-for="(gameSplit, index) in detailGame.gameGenre" :key="index">
                                                                <span class="badge badge-pill badge-primary" style="margin: 0 10px 0 0; font-size:16px">
                                                                  {{gameSplit}}
                                                                </span>
                                                              </span>
                                                            </span>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                        
                                          <br>

                                          <div class="col">
                                              <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                                  <div class="col-6">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <div class="col">
                                                            <div class="row">
                                                              <h4>
                                                                <strong>Rating</strong>
                                                              </h4>
                                                              <br />
                                                              <div class="col-12">
                                                                <div class="row" v-if="detailGame.gameRating">
                                                                  <b-icon v-for="index in detailGame.gameRating" :key="index" class="h5 mb-2" icon="star-fill" style="color: orange"></b-icon>
                                                                </div>
                                                                <div class="row" v-else>
                                                                  <span>-</span>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>

                                                  <div class="col-6">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <div class="col">
                                                            <div class="row">
                                                              <h4>
                                                                <strong>Duration</strong>
                                                              </h4>
                                                              <br />
                                                              <div class="col-12">
                                                                <div class="row">
                                                                  <b-icon class="h5 mb-2" icon="stopwatch-fill" style="color: orange"></b-icon>
                                                                  {{detailGame.gameDuration}} Minutes
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>


                                          <div class="col">
                                              <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                                  <div class="col-6">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <div class="col">
                                                            <div class="row">
                                                              <h4>
                                                                <strong>Price</strong>
                                                              </h4>
                                                              <br />
                                                              <div class="col-12">
                                                                <div class="row">
                                                                  <b-icon class="h5 " icon="cash" style="color: orange"></b-icon>
                                                                  {{detailGame.gamePriceAfterDiscount | rupiah}}
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>

                                                  <div class="col-6">
                                                      <div class="input-container" style="flex-grow: 1;  ">
                                                          <div class="col">
                                                            <div class="row">
                                                              <h4>
                                                                <strong>Team</strong>
                                                              </h4>
                                                              <br />
                                                              <div class="col-12">
                                                                <div class="row">
                                                                  <b-icon class="h5 mb-2" icon="people-fill" style="color: orange"></b-icon> 
                                                                  {{detailGame.gameCapacity}} People
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>

        <!-- ONLY FOR DEVELOPING -->
            <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Game Members</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{gameMembers}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>ISO Date</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{date}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>My Profile</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{myProfile}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->

            <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Members</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{members}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>GameID</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{gameId}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              

              <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Detail Game</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{detailGame}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              
        <!-- <div class="card bg-light">
                <div class="card-header"> <h3>All Users</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{users}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->

        <!-- ONLY FOR DEVELOPING -->
      </div>

<div class="container-fluid">
<div style="display: none;" id="addToCart" >
  <h2>Add this game to cart?</h2>
  <p>Please select the date to play!</p>
  <div class="form">
      <div class="form-group">
            <div class="row">
              <div class="col-md-12">
                  <div class="panel panel-default">
                      <div class="panel-body">

                          <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                            <div class="col-6">
                              <label for="date"><strong>Date</strong></label>
                              <input type="date" id="date" class="form-control" v-model="date">
                            </div>

                            <div class="col-6">
                              <label for="time"><strong>Time</strong></label>
                              <select name="time" v-model="time" id="time" class="form-control">
                                  <option selected disabled>Select the Time</option>
                                  <option :value="index+1" v-for="(time, index) in chooseTime" :key="index" >{{time}}</option>
                              </select>
                            </div>
                          </div>

                          <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                            <div class="col">
                                    <label for="members"><strong>Members</strong></label>
                                    <multiselect v-model="members" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="username" :options="users" :multiple="true" :taggable="true"></multiselect>
                            </div>
                          </div>

                          <div class="col-md-12">
                              <div class="form-group" >
                                  <div class="input-container" style="flex-grow: 1;">
                                      <button @click="addToCart" data-fancybox-close class="btn btn-warning d-flex align-items-center justify-content-center" style="width:100%">
                                        <b-icon icon="cart-plus-fill" font-scale="1.4" aria-hidden="true"></b-icon>
                                        <b>Add to Cart!</b>
                                      </button>
                                  </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    </div>

    <b-toast id="my-toast" :variant="toastVariant" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto">{{toastTitle}}</strong>
          <small class="text-muted mr-2">{{countdown}} seconds ago</small>
        </div>
      </template>
      <b>{{toastMessage}}</b>
    </b-toast>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import moment from 'moment'
export default {
  components: {
    Multiselect
  },

  data() {
    return {
      gameId: this.$route.params.gameId,
      myProfile: '',
      accessToken: '',
      detailGame: '',
      joinedGenre: '',
      // genreLength: '',
      dateTime: '',
      date: '',
      time: '',
      users: [],
      currentUser: 'Current User',
      members: [], //jadi list users
      chooseTime: [
        '09:00',
        '12:00',
        '15:00',
        '19:00',
      ],
      values: [],

      gameMembers: [], //yang paling betul pake array

      //buat toastnya
      count: moment(0),
      toastTitle: '',
      toastMessage: '',
      toastVariant: '',

      // isoDate: '',
      loading: false
    };
  },
  methods: {
    getUsers() {
      this.axios.get('/user/list-web').then(response => {
        this.users = response.data.data
      })
    },
    getDetailGame() {
      this.axios.get('game/web/detail/'+this.gameId).then(response => {
        this.detailGame = response.data.data
        this.joinedGenre = this.detailGame.genre
      })
    },
    getMyProfile() {
      this.axios.get('user/profile').then(response => {
        this.myProfile = response.data.data
      })
    },
    addToCart() {
      this.loading = true
      // const date = d.toISOString(true).split('T')[0]

      // this.isoDate = moment().toISOString()
      // this.isoDate = moment(this.isoDate).toISOString()

      // this.isoDate = Date.now(this.date)
      // this.isoDate = new Date(this.date)

      // this.date = this.date+new Date().toISOString().split(moment().format('YYYY-MM-DD'))[1]

      for (let i = 0; i < this.members.length; i++) {
        this.gameMembers[i] = this.members[i].userId
      }
      this.gameMembers.unshift(this.myProfile.userId)
      this.count = moment(0)
      let headers = {
                "headers": {
                    "content-type": "application/json",
                },
            }
      this.axios.post('/cart/add', {
        gameId: this.gameId,
        playDate: this.date,
        time: this.time,
        members: this.gameMembers,
      },headers).then(response => {
        this.loading = false
        console.log(response)
        console.log('Berhasil Menambahkan ke Cart')

        // Buat Toast
        this.toastVariant = 'success'
        this.toastTitle = 'Berhasil!'
        this.toastMessage = response.data.message
        this.$bvToast.show('my-toast')
      }).catch(error => {
        this.loading = false
        console.log(error.response);

        // Buat Toast
        this.$bvToast.show('my-toast')
        this.toastVariant = 'danger'
        this.toastTitle = 'Terdapat Kesalahan'
        this.toastMessage = error.response.data.message;
      })
    },
  },
  computed: {
    countdown(){
        return this.count.format('s');
    }
  },
  mounted() {
    this.gameId = this.$route.params.gameId
    this.accessToken = localStorage.getItem('Authorization')
    this.getDetailGame()
    this.getUsers()
    this.getMyProfile()

    var timer = setInterval(() => {
        this.count = moment(this.count.add(1, 'seconds'));
        if(this.count.diff(moment(0)) === 60){
          clearInterval(timer);
        }
    }, 1000);

  },
};
</script>

<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>

