<template>
  <div class="container-fluid" style="margin-top:100px">
    <div class="row">
      <div class="col-md-12">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Leaderboard</h6>
          </div>
          <div class="progress" style="height: 5px;" v-if="loading">
            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-4">
                <label for="selectGame">Choose Game</label>
                <select
                  class="form-control mb-2 mr-sm-3"
                  id="selectGame"
                  v-model="gameId"
                >
                  <option
                    :value="game.gameId"
                    v-for="(game, index) in games"
                    :key="index"
                    >{{ game.gameTitle }}</option
                  >
                </select>
              </div>
              <div class="col-2">
                <label for="selectDate">Sort By</label>
                <select
                  class="form-control mb-2 mr-sm-3"
                  id="selectDate"
                  v-model="sort"
                >
                <option value="" disabled selected></option>
                  <option
                    :value="sort"
                    v-for="(sort, index) in sortlist"
                    :key="index"
                    >{{ sort.toUpperCase() }}</option
                  >
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mt-3">
                <div class="table-responsive">
                  <table
                    class="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Team Name</th>
                        <th>Leader Name</th>
                        <th>Game Data</th>
                        <th>Score</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(leaderboard, index) in leaderboard"
                        :key="index"
                      >
                        <td>{{ index + 1 }}</td>
                        <td>
                          <span v-if="leaderboard.teamName">
                            <span>{{ leaderboard.teamName }}</span>
                          </span>
                          <span v-else>-</span>
                        </td>
                        <td>{{ leaderboard.leaderName }}</td>
                        <td>{{ leaderboard.gameData.gameTitle }}</td>
                        <td>{{ leaderboard.score | formatNumber}}</td>
                        <td>{{ leaderboard.createdAt | formatDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ONLY FOR DEVELOPING -->
        <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Games</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{games}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->

        <!-- <div class="card bg-light">
                <div class="card-header"> <h3>Game ID & Sort By</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{gameId}} SORTED BY {{sort}}</pre>
                      </div>
                    </div>
                </div>
              </div>
              <div class="card bg-light">
                <div class="card-header"> <h3>Leaderboard</h3> </div>
                  <div class="card-inner">
                    <div class="card bg-dark">
                      <div class="card-inner bg-dark">
                        <pre class="text-warning">{{getLeaderboard}}</pre>
                      </div>
                    </div>
                </div>
              </div> -->
              <span style="display: none">{{getLeaderboard}}</span>
        <!-- {{ leaderboard }} -->
        <!-- ONLY FOR DEVELOPING -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaderboard: '',
      gameId: '',
      sortlist: ['score', 'date'],
      sort: '',
      games: '',
      loading: false,
    };
  },
  methods: {
    getGames() {
      this.axios.get("game/mygame").then((response) => {
        this.games = response.data.data;
        this.gameId = this.games[0].gameId
        this.sort = this.sortlist[0]
        // localStorage.setItem("gameId", this.games[1].gameId);
        // localStorage.setItem("sort", this.sortlist[0]);
      });
    },
  },
  created() {
    this.getGames();
  },
  computed: {
    getLeaderboard() {
      this.loading = true

      if (!this.gameId && !this.sort) {
        this.gameId = localStorage.getItem("gameId");
        this.sort = localStorage.getItem("sort");
      }
      this.axios
        .get(`gameplay/leaderboard/game/${this.gameId}/sort/${this.sort}`)
        .then((response) => {
          this.loading = false
          console.log(response.data.message);
          if (this.sort == "date") {
            this.leaderboard = response.data.data.reverse();
          } else {
            this.leaderboard = response.data.data;
          }
        }).catch(error => {
          this.loading = false
          console.log(error);
        }) 
    },
  },
};
</script>

<style></style>
