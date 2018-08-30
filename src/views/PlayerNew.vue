<template>
  <div class="playersNew">
    <h1>Create a new player!</h1>
    <form @submit.prevent="create">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" name="firstName" v-model="first_name"/>
      <label for="lastName">Last Name</label>
      <input type="text" name="lastName" id="lastName" v-model="last_name"/>
      <label for="rating">Rating</label>
      <input type="number" name="rating" id="rating" v-model="rating"/>
      <label for="handedness">Handedness</label>
      <select v-model="handedness" id="handedness">
        <option disabled value="">Please select one</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
      <input id="create" type="submit" value="Create"/>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      rating: 0,
      handedness: ""
    };
  },
  methods: {
    create() {
      this.$store
        .dispatch("addPlayer", {
          first_name: this.first_name,
          last_name: this.last_name,
          handedness: this.handedness,
          rating: this.rating
        })
        .then(function(response) {
          console.log("Player Added", response);
        });
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
