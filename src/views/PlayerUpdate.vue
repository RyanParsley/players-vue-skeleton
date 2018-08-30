<template>
  <div class="playerUpdate">
    <h1>Update a player</h1>
    <form @submit.prevent="update">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" v-model="player.first_name"/>
      <label for="lastName">Last Name</label>
      <input type="text" name="lastName" id="lastName" v-model="player.last_name"/>
      <label for="rating">Rating</label>
      <input type="number" name="rating" id="rating" v-model="player.rating"/>
      <label for="handedness">Handedness</label>
      <select v-model="player.handedness" id="handedness">
        <option disabled value="">Please select one</option>
        <option value="Left">Left</option>
        <option value="Right">Right</option>
      </select>
      <input id="create" type="submit" value="Update"/>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    player() {
      return this.$store.getters.getPlayerById(this.$route.params.id);
    }
  },
  methods: {
    update(player) {
      console.log("update player", player);
    }
  }
};
</script>

<style lang="scss" scoped>
input[type="text"],
input[type="number"],
input[type="submit"],
select {
  display: block;
  margin: 0.25em auto 1em auto;
}
</style>
