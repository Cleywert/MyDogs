<template>
  <v-app>
    
    <Menu></Menu>

    <v-container>
      <v-btn icon outlined fixed fab bottom right elevation="2" @click="$vuetify.goTo(0,options)"><v-icon>mdi-arrow-up</v-icon></v-btn>
      <h1 class="title">Dogs List</h1>

      <filter-breed></filter-breed>

      <cards-dogs></cards-dogs>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CardsDogs from "./components/CardsDogs.vue";
import Menu from './components/Menu.vue';
import FilterBreed from './components/FilterBreed.vue';
export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  components: { CardsDogs, Menu, FilterBreed},
  computed: {
    ...mapState(["dogs", "breeds", "subbreeds", "items", "favorites", "breedGlobal", "subbreedGlobal"]),
    options () {
        return {
          duration: 500,
          offset: 70,
          easing: "linear",
        }
      },
  },
  watch: { // Quando a raça ou a sub raça mudar, um novo filtro é feito
    breedGlobal(){
      this.getDogBreed(this.breedGlobal);
    },
    subbreedGlobal() {
      this.getDogBreed(this.breedGlobal, this.subbreedGlobal);
    },
  },
  methods: {
    getBreeds() { // Lista todas as raças e as põe no array de itens do select
      axios.get("https://dog.ceo/api/breeds/list/all").then((response) => {
        this.$store.commit("SET_BREEDS", response.data.message);
        for (let breed in response.data.message) {
          this.items.push(breed);
        }
        this.getDogBreed(this.breedGlobal);
      });
    },
    getDogBreed(breed, sub) { // Faz um get das raças e subraças
      if (breed=="") return
    
      this.$store.commit("SET_SUBBREEDS", this.breeds[breed]);
      if (sub == "" || sub == undefined) {
        sub = this.subbreeds[0];
      }

      if (this.subbreeds.length > 0) {
        axios
          .get(`https://dog.ceo/api/breed/${breed}/${sub}/images`)
          .then((response) => {
            this.$store.commit("SET_DOGS", response.data);
          });
      } else {
        axios
          .get(`https://dog.ceo/api/breed/${breed}/images`)
          .then((response) => {
            this.$store.commit("SET_DOGS", response.data);
          });
      }
    },
    getFavoriteDogs() { // Pega os favoritados do localstorage
      let favorites = window.localStorage.favorites;

      if (favorites == undefined) favorites = [];
      else favorites = JSON.parse(favorites);
      this.$store.commit("SET_FAVORITES", favorites);
    },
  },
  created() {
    this.getFavoriteDogs();
    this.getBreeds();
  },
};
</script>

<style scoped>

.title {
  text-align: center;
}

</style>