<template>
  <div class="container-fluid" style="margin-top: 100px">
    <div class="row">
      <div class="col-4">
        <div class="card shadow mb-4">
          <!-- <div class="col-4 d-flex justify-content-center"> -->
          <img 
            class="img-thumbnail"
            :src="detailGame.posterUrl"
            alt="Game Image"
            height="auto"
          />
          <!-- </div> -->
        </div>

        <a :href="'https://minigames.tranceformasiindonesia.com/'+detailGame.url" target="_blank" style="text-decoration: none">
          <button
            class="btn btn-success d-flex align-items-center justify-content-center"
            style="width: 100%; margin: 20px auto"
          >
            <b-icon icon="play-fill" font-scale="2" aria-hidden="true"></b-icon
            ><b>Play Game</b>
          </button>
        </a>

        <button
          class="btn btn-warning d-flex align-items-center justify-content-center"
          style="width: 100%; margin: 20px auto"
          data-fancybox data-src="#addToCart" href="javascript:;"
        >
          <b-icon icon="cart-plus-fill" font-scale="1.4" aria-hidden="true"></b-icon
          ><b>Add to Cart</b>
        </button>
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
                                                            <b> {{detailGame.title}}</b>
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
                                                            {{detailGame.description}}
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
                                                            <!-- {{detailGame.genre.length}}
                                                            <span
                                                              v-for="(category, index ) in detailGame.genre" :key="index"
                                                              class="badge badge-pill badge-primary"
                                                              style="margin: 0 10px 0 0; font-size: 16px"
                                                              >{{category}}</span
                                                            > -->
                                                            <span v-if="detailGame.genre.length > 1">
                                                              <span class="badge badge-pill badge-primary" v-for="(genre, index) in detailGame.genre" :key="index" style="margin: 0 10px 0 0; font-size:16px">
                                                                {{genre}}
                                                              </span>
                                                            </span>
                                                            <span v-else>
                                                              <span v-for="(gameSplit, index) in detailGame.genre.join(',').split(',')" :key="index">
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
                                                                <div class="row" v-if="detailGame.rating">
                                                                  <b-icon v-for="index in detailGame.rating" :key="index" class="h5 mb-2" icon="star-fill" style="color: orange"></b-icon>
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
                                                                  {{detailGame.duration}} Minutes
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
                                                                  {{detailGame.price | rupiah}}
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
                                                                  {{detailGame.capacity}} People
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

        <!-- <div class="card shadow mb-4">
          <div
            class="row"
            v-for="(game, index) in data"
            :key="index"
            style="margin: 10px 0"
          >
            <div class="col-4 d-flex justify-content-center">
              <img
                @click="gameDetail(index)"
                :src="game.imageUrl"
                alt="Game Image"
                height="200px"
                style="border-radius:5px"
                id="imageZoom"
              />
            </div>
            <div class="col-8 d-flex align-items-center">
              <div class="col">
                <div class="row">
                  <h1>
                    <b>{{ game.title }}</b>
                  </h1>
                </div>
                <div class="row">
                  <span
                    class="badge badge-pill badge-primary"
                    v-for="(genre, index) in game.genre"
                    :key="index"
                    style="margin: 0 10px 0 0; font-size:16px"
                    >{{ genre }}</span
                  >
                </div>
                <div class="row">
                  <li
                    v-for="index in game.rating"
                    :key="index"
                    style="display:inline"
                  >
                    <span style="color:orange;"><h2>&starf;</h2> </span>
                  </li>
                </div>
                <div class="row">
                  <button class="btn btn-warning d-flex align-items-center">
                    <b-icon
                      icon="play-fill"
                      font-scale="2"
                      aria-hidden="true"
                    ></b-icon
                    ><b>Play Game</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- ONLY FOR DEVELOPING -->
          <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Members</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{values}}</pre>
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

              <div class="card bg-light">
                <div class="card-header"> <h3>Detail Game</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{detailGame}}</pre>
                      </div>
                    </div>
                </div>
              </div>
              
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
                                <!-- <div class="input-container" style="flex-grow: 1;  "> -->
                                    <label for="date"><strong>Date</strong></label>
                                    <input type="date" id="date" class="form-control" v-model="date">
                                <!-- </div> -->
                            </div>

                            <div class="col-6">
                                <!-- <div class="input-container" style="flex-grow: 1;  "> -->
                                    <label for="time"><strong>Time</strong></label>
                                    <select name="time" v-model="time" id="time" class="form-control">
                                        <option selected disabled>Select the Time</option>
                                        <option :value="index+1" v-for="(time, index) in chooseTime" :key="index" >{{time}}</option>
                                    </select>
                                <!-- </div> -->
                            </div>

                            <!-- <div class="col-6">
                                <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                      <div class="input-container" style="flex-grow: 1;  ">
                                          <label for="date"><strong>Date</strong></label>
                                          <input type="date" id="date" class="form-control" v-model="date">
                                      </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                                      <div class="input-container" style="flex-grow: 1;  ">
                                          <label for="time"><strong>Time</strong></label>
                                          <select name="time" v-model="time" id="time" class="form-control">
                                              <option selected disabled>Select the Time</option>
                                              <option :value="index+1" v-for="(time, index) in chooseTime" :key="index" >{{time}}</option>
                                          </select>
                                      </div>
                                </div>
                            </div> -->
                          </div>

                          <div class="form-group" style="display: flex; align-items: flex-end; justify-content: space-between;">
                            <div class="col">
                                <!-- <div class="input-container" style="flex-grow: 1;  "> -->
                                    <label for="members"><strong>Members</strong></label>
                                    <!-- <Multiselect v-model="value" :options="options" :multiple="true" group-values="libs" group-label="language" :group-select="true" placeholder="Type to search" track-by="name" label="name"><span slot="noResult">Oops! No elements found. Consider changing the search query.</span></Multiselect> -->
                                    <multiselect v-model="values" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="username" :options="users" :multiple="true" :taggable="true"></multiselect>
                                    <!-- <pre class="language-json"><code>{{ members}}</code></pre> -->
                                <!-- </div> -->
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
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  components: {
    Multiselect
  },

  data() {
    return {
      detailGame: '',
      gameId: '',
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
      values: []
    };
  },
  methods: {
    getUsers() {
      this.axios.get('/user/list').then(response => {
        this.users = response.data.data
      })
    // this.currentUser = this.$route.params.currentUser
    },
    getDetailGame() {
      this.axios.get('/game/detail/'+this.gameId).then(response => {
        this.detailGame = response.data.data
      })
    },
    addToCart() {
      console.log(this.gameId);
      let headers = {
                "headers": {
                    "content-type": "application/json",
                },
            }
      this.axios.post('/cart/add', {
        dateTime: this.date,
        gameId: this.gameId,
        members: [
          { 
            name: '',
            userId: '',
          }
        ],
        time: this.time
      },headers).then(response => {
        console.log(response)
        console.log('Berhasil Menambahkan ke Cart')
        this.showToast()
      }).catch(error => {
        console.log(error.response);
      })
    },
    showToast() {{
        this.$bvToast.toast(`Success Adding Game to Cart!`, {
          title: 'Success',
          autoHideDelay: 5000,
        })
      }

    }
  },
  mounted() {
    this.gameId = this.$route.params.gameId

      if (this.gameId) {
        console.log(this.gameId);
      } else {
        console.log('id game nya kosong gannn');
      }

    this.getDetailGame()
    this.getUsers()
    
  },
};
</script>

<style src="../../node_modules/vue-multiselect/dist/vue-multiselect.min.css"></style>

