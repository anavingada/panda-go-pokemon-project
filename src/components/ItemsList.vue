<!-- NOTES

This component is a reusable to display list, ordered and unordered. -->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemsList',
  props: {
    data: { type: Array, required: false, default: () => [] },
    ordered: {
      type: Boolean,
      required: false,
      default: false
    }
  }
})
</script>

<template>
  <component :is="ordered ? 'ol' : 'ul'" :class="{ list: true, 'list--ordered': ordered }">
    <li v-for="(item, index) in data" :key="index" class="list__item">{{ item }}</li>
  </component>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--ordered {
    display: block;
    column-count: 1;

    @include size-m-up {
      column-count: 2;
    }

    @include size-l-up {
      column-count: 3;
    }

    @include size-xl-up {
      column-count: 4;
    }
  }

  &__item {
    font-size: 16px;
    color: var(--text-black);
  }
}
</style>
