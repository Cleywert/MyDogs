<template>
  <v-row>
    <v-col v-for="(dog, index) in dogs.message" :key="dog">
      <v-card width="350" elevation="1">
        <v-img :src="dog" height="450"></v-img>
        <v-card-actions>
          <v-btn
            :id="`btn-fav-${index}`"
            icon
            @click="favoriteDog(dog, index)"
            :color="verifyFavorite(dog)"
          >
            <v-icon>mdi-star</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["dogs", 'favorites']),
  },
  methods: {
    verifyFavorite(dog) { // Verifica se a imagem está entre os favoritos
      let pos = this.favorites.indexOf(dog);

      if (pos > -1) {
        return "yellow";
      }
    },
    favoriteDog(dog, index) { // Adiciona ou remove a imagem dos favoritos
      let btn = document.querySelector(`#btn-fav-${index}`);
      let position = this.favorites.indexOf(dog);

      if (position > -1) {
        btn.classList.remove("yellow--text");

        this.favorites.splice(position, 1);
      } else {
        btn.classList.add("yellow--text");

        this.favorites.push(dog);
      }
      window.localStorage.favorites = JSON.stringify(this.favorites);
    },
  },
};
</script>

<style>
.v-card {
  margin: 0 auto;
}
</style>