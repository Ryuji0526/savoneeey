<template>
  <v-container class="parallax scrollbox px-sm-15 px-7">
    <h1 class="text-center mb-15 text-h3 caption">\ Account</h1>
    <div class="width-1100">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6" order-md="last">
          <v-img
            :src="require('~/assets/image/top-account.jpeg')"
            aspect-ratio="1.4"
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
        <v-col cols="12" sm="5">
          <h3 class="text-h6 font-weight-bold">
            夢ごとに口座を分けて貯蓄をスタート
          </h3>
          <p class="text-body-2 mt-7">
            各項目の残高を「見える化」することで、使いすを防ぐことができたり、目標達成までどれくらい頑張ればいいのかが見えるようになります。「あとこれだけの金額しか残っていないから、今月はもう使いすぎないようにセーブしよう…」や、「今月は余裕があるから少し貯金を増やそう！」などを「Account」で調節することができます。
          </p>
          <v-btn
            outlined
            class="turn-black mt-10"
            color="#0009"
            to="/service/account"
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
  background-color: #0009;
  color: #e3dbd0;
}
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
