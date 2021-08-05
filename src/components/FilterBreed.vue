<template>
  <v-row class="selects-breeds">
    <v-col sm="4">
      <v-select :items="items" v-model="breed" label="Raça"></v-select>
    </v-col>
    <v-col sm="4">
      <v-select
        :items="subbreeds"
        v-model="subbreed"
        label="Sub-raça"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      breed: "akita",
      subbreed: "",
    };
  },
  computed: { ...mapState(["items", "breedGlobal", "subbreeds", "breeds"]) },
  watch: { // Quando a raça ou sub-raça mudam no vuex, altera também no select (e vice-versa)
    breedGlobal() {
      this.breed = this.breedGlobal;
    },
    breed() {
      this.subbreed="";
      this.$store.commit("SET_BREED", this.breed);
      this.$store.commit("SET_SUBBREEDS", this.breeds[this.breed]);
    },
    subbreed() {
      this.$store.commit("SET_SUBBREED", this.subbreed);
    },
  },
};
</script>

<style>
.selects-breeds {
  justify-content: center;
}
</style>