<template>
  <v-container
    fluid
    class="fill-height d-flex flex-column justify-center align-center"
  >
    <!-- Placeholder for image -->
    <div class="mb-6 text-center">
      <img style="height: 150px" src="../assets/logo_inverted.png" />
    </div>

    <!-- Login form -->
    <v-card class="pa-6" elevation="4" width="400">
      <v-card-text>
        <input-box label="Username"></input-box>
        <input-box label="Password" type="password"></input-box>
        <Button @click="login" label="Enter"></Button>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import router from "@/router";
  import InputBox from "../base/input/InputBox.vue";
  import Button from "../base/trigger/Button.vue";

  function login(): void {
    router.push("/home");
  }
</script>
