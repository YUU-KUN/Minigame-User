<template>
  <div class="container-fluid" style="margin-top:100px">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow mb-4">
          <div class="row" v-if="myGame.length == 0" style="text-align:center">
            <div class="col">
              <img
                src="../../public/assets/icons/Astronaut-01.svg"
                class="card-img-top"
                alt="..."
                style="margin:auto; width: 300px"
              />
              <div style="margin-bottom: 50px">
                <h1><strong>OH NO!</strong></h1>
                <p>You have no playable games yet <br />Let's change that!</p>
              </div>
            </div>
          </div>

          <div
            v-else
            class="row"
            v-for="(game, index) in myGame"
            :key="index"
            style="margin: 10px 0"
          >
            <div class="col-4 d-flex justify-content-center">
              <img
                v-if="game.gameReady"
                @click="getDetailGame(index)"
                :src="game.posterImage"
                alt="Game Image"
                height="200px"
                style="border-radius:5px"
                id="imageHover"
                class="img-thumbnail"
              />
              <img
                v-else
                :src="game.posterImage"
                alt="Game Image"
                height="200px"
                style="border-radius:5px; cursor: not-allowed"
                class="img-thumbnail"
              />
            </div>
            <div class="col-8 d-flex align-items-center">
              <div class="col">
                <div class="row">
                  <h1>
                    <b>{{ game.gameTitle }}</b>
                  </h1>
                </div>
                <div class="row">
                  <span v-if="game.gameGenre.length > 1">
                    <span
                      class="badge badge-pill badge-primary"
                      v-for="(genre, index) in game.gameGenre"
                      :key="index"
                      style="margin: 0 10px 0 0; font-size:16px"
                    >
                      {{ genre }}
                    </span>
                  </span>
                  <span v-else>
                    <span
                      v-for="(gameSplit, index) in game.gameGenre
                        .join(',')
                        .split(',')"
                      :key="index"
                    >
                      <span
                        class="badge badge-pill badge-primary"
                        style="margin: 0 10px 0 0; font-size:16px"
                      >
                        {{ gameSplit }}
                      </span>
                    </span>
                  </span>
                </div>
                <div class="row" v-if="game.gameRating">
                  <li
                    v-for="index in game.gameRating"
                    :key="index"
                    style="display:inline"
                  >
                    <span style="color:orange;"><h2>&starf;</h2> </span>
                  </li>
                </div>
                <div class="row" v-else>
                  <span><h2>-</h2> </span>
                </div>
                <div class="row">
                  <b-icon
                    class="h4 mb-1"
                    icon="cash"
                    style="color: orange; margin: 0 5px"
                  ></b-icon>
                  <span v-if="!game.gameDiscount"
                    ><h5>
                      <b>{{ game.gamePrice | rupiah }}</b>
                    </h5></span
                  >
                  <span v-else
                    ><span style="text-decoration: line-through;">{{
                      game.gamePrice | rupiah
                    }}</span
                    >&nbsp;
                    <span style="margin: 0 10px"
                      ><h5>
                        <b>{{ game.gamePriceAfterDiscount | rupiah }}</b
                        >&nbsp;
                      </h5>
                      <span style="color:red"
                        ><h5>
                          <b>{{ game.gameDiscount }}% OFF!</b>
                        </h5></span
                      ></span
                    >
                  </span>
                </div>
                <div class="row">
                  <span
                    >Playing Time: {{ game.playingSchedule | dateOnly }} pukul
                    {{ game.timeStart }}.00 -
                    {{ Math.round(game.timeEnd) }}.00</span
                  >
                </div>
                <br />
                <div class="row">
                  <span v-if="game.gameReady">
                    <div class="row">
                      <div class="col">
                        <a
                          :href="
                            'https://minigames.tranceformasiindonesia.com/' +
                              game.gameUrl +
                              '?token=' +
                              accessToken
                          "
                          target="_blank"
                          style="text-decoration: none"
                        >
                          <button
                            class="btn btn-success d-flex align-items-center"
                          >
                            <b>Play Game</b>
                          </button>
                        </a>
                      </div>
                      <div>
                        <button
                          @click="getGameCode(index)"
                          data-fancybox
                          data-src="#code"
                          class="btn btn-warning d-flex align-items-center"
                        >
                          <b>View Code</b>
                        </button>
                      </div>
                    </div>
                  </span>
                  <button
                    v-else
                    class="btn btn-warning d-flex align-items-center"
                    disabled
                  >
                    <b>Coming Soon</b>
                  </button>

                  <div style="display: none;" id="code" class="animated-modal">
                    <h2>Hello!</h2>
                    <p>This is your Code!</p>
                    <button
                      class="btn btn-outline-success btn-block"
                      @click="copyText"
                    >
                      <b>{{ code }}</b>
                    </button>
                    <!-- <button id="copyButton" class="btn btn-outline-primary" @click="copyText"><b-icon icon="files"></b-icon></button> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ONLY FOR DEVELOPING -->
        <!-- <div class="card bg-light">
                <div class="card-header"> <h3>My Game</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{myGame}}</pre>
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
      myGame: "",
      gameId: "",
      code: "",
      accessToken: "",
    };
  },
  methods: {
    getMyGame() {
      this.axios.get("game/mygame").then((response) => {
        this.myGame = response.data.data.reverse();
      });
    },
    getDetailGame(index) {
      this.gameId = this.myGame[index].gameId;
      this.$router.push({
        name: "GameDetail",
        params: {
          gameId: this.gameId,
          currentUser: this.currentUser,
        },
      });
    },
    getGameCode(index) {
      this.code = this.myGame[index].uniqueCode;
    },
    copyText() {
      this.$copyText(this.code).then(
        alert(`${this.code} is copied!`),
        console.log(this.code)
      );
    },
  },
  mounted() {
    this.accessToken = localStorage.getItem("Authorization");
    this.getMyGame();
  },
};
</script>
