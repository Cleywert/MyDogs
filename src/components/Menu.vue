<template>
  <v-app-bar color="secondary" dark>
    <v-toolbar-title>MyDogs</v-toolbar-title>
    <v-btn class="btn-fav" @click="getFavorites" icon
      ><v-icon>mdi-star</v-icon></v-btn
    >
    <v-form ref="form" @submit="buscar">
      <v-text-field label="buscar por raça" v-model="search"></v-text-field>
      <v-btn type="submit" icon color="light">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-form>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: { ...mapState(["favorites"]) },
  methods: {
    getFavorites() {
      let favoritos = { message: this.favorites }; // Quando a listagem vem da api as fotos ficam dentro de um param 'message', por isso esta estrutura
      this.$store.commit("SET_DOGS", favoritos);
      this.$store.commit("SET_BREED", "");
    },
    buscar(e) {
      // Altera a raça para disparar uma nova filtragem de imagens
      e.preventDefault();

      this.$store.commit("SET_BREED", this.search);
      this.search = "";
    },
  },
};
</script>

<style>
form {
  display: flex;
  margin-left: auto;
  margin-right: 16px;
  align-items: baseline;
}
.btn-fav {
  margin-left: 16px;
}
@media only screen and (max-width: 900px) {
  form {
    margin-right: 0;
  }
}
</style>