<template>
  <div class="text-h2 py-10 mb-13 caption" data-testid="title">
    <span class="text-h1 caption">{{ initial }}</span
    >{{ exceptInitial }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: 'Title',
    },
  },
  computed: {
    initial() {
      return this.title.substr(0, 1)
    },
    exceptInitial() {
      return this.title.substr(1)
    },
  },
}
</script>

<style lang="scss" scoped>
div {
  border-bottom: 1px solid white;
  .caption {
    font-family: 'Caveat', cursive !important;
  }
}
</style>
