<template>
  <v-btn rounded="lg" :block="props.blockBool" :color="props.color" class="mt-4"
    >{{ props.label }}
  </v-btn>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
    color?: string;
    blockBool?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    color: "primary",
    blockBool: true,
  });
</script>
