<template>
  <v-container class="parallax scrollbox px-sm-15 px-7">
    <h1 class="text-center mb-15 text-h3 caption">\ WishList</h1>
    <div class="mx-auto width-1100">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-img
            :src="require('~/assets/image/top-wish-list.jpeg')"
            aspect-ratio="1"
            class="mx-auto"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminatef
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col cols="12" md="5">
          <h3 class="text-h6 font-weight-bold">
            貯蓄成功の秘訣は目標設定にあり
          </h3>
          <p class="text-body-2 mt-7">
            「これ欲しいな...」や、「ここへ行きたいな」と思ったらすぐに「WishLists」へ登録しましょう。「WishLists」を利用することで、自分は何が欲しいのか、何をしたいのか。そのためにはいくらかかるのかがわかります。また、それぞれの口座に紐づけることによって目標を分けることが可能です。
          </p>
          <v-btn
            outlined
            class="turn-black mt-10"
            color="#0009"
            to="/service/wish-list"
            block
          >
            MORE
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.scrollbox {
  background-color: #e3dbd0;
  color: #0009;
}
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
