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
                  <b-table
                    id="my-table"
                    class="table table-bordered"
                    :items="leaderboard"
                    :per-page="perPage"
                    :current-page="currentPage"
                    :fields="fields"
                  >

                      <template v-slot:cell(no)="data">
                          <span>{{data.index+1}}</span>
                      </template>
                      <template v-slot:cell(team_name)="data">
                        <span v-if="data.item.teamName">
                            <span>{{ data.item.teamName }}</span>
                        </span>
                        <span v-else>-</span>
                      </template>
                      <template v-slot:cell(leader_name)="data">
                          {{data.item.leaderName }}
                      </template>
                      <template v-slot:cell(game_data)="data">
                        {{data.item.gameData.gameTitle}}
                      </template>
                      <template v-slot:cell(score)="data">
                        {{data.item.score | formatNumber}}
                      </template>
                      <template v-slot:cell(date)="data">
                        {{data.item.createdAt | formatDate}}
                      </template>
                  </b-table>
                  <br>
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="my-table"
                    align="center"
                  ></b-pagination>

                </div>
              </div>
            </div>
          </div>
        </div>
        <span style="display: none">{{getLeaderboard}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      leaderboard: [],
      gameId: '',
      sortlist: ['score', 'date'],
      sort: '',
      games: '',
      loading: false,
      currentPage: 1,
      perPage: 10,
      fields: ['no', 'team_name', 'leader_name', 'game_data', 'score', 'date']
    };
  },
  methods: {
    getGames() {
      this.axios.get("game/web/list").then((response) => {
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
    rows() {
        return this.leaderboard.length
    },
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
