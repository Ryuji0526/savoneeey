<template>
  <v-container class="parallax scrollbox px-sm-15">
    <div class="mx-auto mb-16 box">
      <v-row ref="scrollNum" align="center">
        <v-col cols="12" md="6" :order-md="reverse">
          <v-img
            :src="container.image"
            aspect-ratio="1.5"
            max-width="600"
            class="mx-auto"
            data-testid="image"
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
        <v-col cols="12" md="6">
          <h3 class="text-h5 font-weight-bold" data-testid="subtitle">
            {{ container.subtitle }}
          </h3>
          <p class="text-body-1 mt-7" data-testid="content">
            {{ container.content }}
          </p>
          <div class="d-flex justify-end mt-10">
            <v-btn
              v-show="!(container.containerNum === 0)"
              text
              class="turn-black"
              color="#0009"
              data-testid="backBtn"
              @click="scrollUp"
              >BACK
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
              v-show="
                !(container.containerNum + 1 === container.containersLength)
              "
              text
              class="turn-black"
              color="#0009"
              data-testid="nextBtn"
              @click="scrollDown"
              >NEXT
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    container: {
      type: Object,
      required: true,
    },
  },
  computed: {
    reverse() {
      return this.container.i % 2 === 0 ? 'first' : 'last'
    },
  },
  methods: {
    scrollUp() {
      const center =
        document.documentElement.clientHeight / 2 -
        (this.$refs.scrollNum.getBoundingClientRect().top +
          this.$refs.scrollNum.getBoundingClientRect().bottom) /
          2
      window.scrollBy(0, -document.documentElement.clientHeight - center)
    },
    scrollDown() {
      const center =
        document.documentElement.clientHeight / 2 -
        (this.$refs.scrollNum.getBoundingClientRect().top +
          this.$refs.scrollNum.getBoundingClientRect().bottom) /
          2
      window.scrollBy(0, document.documentElement.clientHeight - center)
    },
  },
}
</script>

<style scoped>
.box {
  width: 100%;
  max-width: 1100px;
}
</style>
