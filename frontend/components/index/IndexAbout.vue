<template>
  <v-container class="parallax scrollbox px-sm-15 px-7">
    <h1 class="text-center mb-15 text-h3 caption">\ About</h1>
    <div class="mx-auto width-1100">
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6">
          <v-img
            :src="require('~/assets/image/savoneeey.png')"
            aspect-ratio="1"
            class="mx-auto rounded-circle"
            max-width="350"
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
          <h3 class="text-h6 font-weight-bold">仮想口座アプリ「SAVONEEEY」</h3>
          <p class="text-body-2 mt-7">
            「SAVONEEEY」は「袋分け管理法」を仮想口座によって実現した、お金管理アプリです。<br />
            実際の銀行口座では、1つしか口座が作れない銀行が多く、複数の銀行による管理では、お金の送金に手間がかかる他、手数料がかかってしまったり何かと不便ではありませんか?「SAVONEEEY」を利用することで、好きな時に何度でも、仮想口座内でのお金の移動ができ、簡単にお金を分け整理・整頓することができます。<br />みなさまの使いすぎを防ぎ、「貯める」を助けます。
          </p>
        </v-col>
        <v-col cols="12" md="8" class="mt-5" order="last">
          <v-card class="rounded-lg" color="#d7c6af" elevation="8">
            <v-card-text>
              <h3 class="text-h6 font-weight-bold">袋分け管理法とは?</h3>
              <p class="text-body-2 mt-3">
                「袋分け管理法」とは、生活費等の予算を袋に振り分けて、その範囲内でやりくりするというお金管理の方法です。予算を決めて、袋に入れたお金を予算の範囲内で使うことを守りさえすれば、細かく家計簿をつける必要はなく簡単にお金を管理することができます。
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.parallax {
  color: #0009;
}
.caption {
  font-family: 'Caveat', cursive !important;
}
</style>
