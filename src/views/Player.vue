<template>
  <div class="roster">
    <h1>This is the Roster</h1>
    <ul >
      <li :key="player.id" v-for="player in players">
        {{player.first_name}}
        <a href="#" class="delete" v-on:click="deletePlayer(player)">Delete</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  created() {
    this.refreshPlayers();
  },
  methods: {
    async refreshPlayers() {
      this.loading = true;
      await this.$store.dispatch("getPlayers");
      this.loading = false;
    },
    async deletePlayer(player) {
      await this.$store.dispatch("deletePlayer", player);
      this.refreshPlayers();
    }
  },
  computed: {
    players() {
      return this.$store.state.players;
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  border: solid #333 1px;
  padding: 1em;
  margin: 1em auto;
  width: 90%;
  max-width: 990px;
  border-radius: 3px;
  text-align: left;
  .delete {
    float: right;
  }
}
</style>
