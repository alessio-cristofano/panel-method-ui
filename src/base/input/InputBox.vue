<template>
  <v-text-field :label="props.label" :type="props.type" variant="solo">
  </v-text-field>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
    type?: string;
  }
  const props = defineProps<Props>();
</script>
