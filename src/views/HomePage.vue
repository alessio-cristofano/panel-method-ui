<template>
  <v-container fluid>
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Solve and Display Chart</v-toolbar-title>
    </v-toolbar>

    <v-row>
      <!-- Left column: Form -->
      <v-col cols="12" md="5">
        <v-form @submit.prevent="solve">
          <!-- Solver type dropdown -->
          <v-select
            v-model="formData.solverType"
            :items="['Type A', 'Type B', 'Type C']"
            label="Solver Type"
            outlined
            dense
            class="mb-4"
          ></v-select>

          <!-- Split inputs in 3 columns -->
          <v-row dense>
            <v-col cols="12" sm="4">
              <InputBox
                v-model="formData.ib"
                label="ib (Pannelli chordwise)"
                type="number"
              />
              <InputBox
                v-model="formData.jb"
                label="jb (Pannelli spanwise)"
                type="number"
              />
              <InputBox
                v-model="formData.nst"
                label="nst (Numero step)"
                type="number"
              />
              <InputBox
                v-model="formData.vt"
                label="vt (Velocità)"
                type="number"
              />
              <InputBox
                v-model="formData.b"
                label="b (Apertura alare)"
                type="number"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <InputBox
                v-model="formData.amed"
                label="amed (Angolo attacco medio)"
                type="number"
              />
              <InputBox
                v-model="formData.temp"
                label="temp (Divisore temporale)"
                type="number"
              />
              <InputBox
                v-model="formData.aa"
                label="aa (Ampiezza pitch)"
                type="number"
              />
              <InputBox
                v-model="formData.oma"
                label="oma (Omega pitch)"
                type="number"
              />
            </v-col>

            <v-col cols="12" sm="4">
              <InputBox
                v-model="formData.sza"
                label="sza (Ampiezza heave)"
                type="number"
              />
              <InputBox
                v-model="formData.omh"
                label="omh (Omega heave)"
                type="number"
              />
              <InputBox
                v-model="formData.fase"
                label="fase (Fase heave)"
                type="number"
              />
              <InputBox
                v-model="formData.thic"
                label="thic (Spessore NACA)"
                type="number"
              />
            </v-col>
          </v-row>

          <!-- Submit button -->
          <Button label="Solve" type="submit" :loading="solving" class="mt-4" />
        </v-form>
      </v-col>

      <!-- Vertical divider -->
      <v-col cols="12" md="1" class="d-flex align-center justify-center">
        <v-divider vertical class="mx-auto" style="height: 100%"></v-divider>
      </v-col>

      <!-- Right column: Chart -->
      <v-col cols="12" md="6">
        <ScatterChart :data="data" />
      </v-col>
    </v-row>

    <!-- Loading dialog -->
    <v-dialog v-model="solving" persistent width="300">
      <v-card class="pa-6" outlined>
        <v-progress-circular
          indeterminate
          color="primary"
          size="40"
          class="mx-auto"
        ></v-progress-circular>
        <div class="text-center mt-3">Solving...</div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import ScatterChart from "../components/charts/ScatterChart.vue";
  import Button from "@/base/trigger/Button.vue";
  import InputBox from "@/base/input/InputBox.vue";
  import { fetchSolution } from "@/api/api";

  // Chart data
  const data = ref<{ x: number; y: number }[]>([]);
  const solving = ref(false);

  // Form state
  const formData = ref({
    solverType: "Type A",
    ib: 10,
    jb: 10,
    nst: 60,
    vt: 1.0,
    b: 4.0,
    amed: 0.0,
    temp: 0.5,
    aa: 5.0,
    oma: 2.0,
    sza: 0.1,
    omh: 2.0,
    fase: 0.0,
    thic: 0.04,
  });

  const solve = async () => {
    solving.value = true;
    try {
      const payload = { ...formData.value }; // Shallow copy for safety
      const liftCoefficients = await fetchSolution(payload);

      data.value = liftCoefficients.map((value: number, index: number) => ({
        x: index + 1,
        y: value,
      }));
    } catch (error) {
      console.error("API error:", error);
    } finally {
      solving.value = false;
    }
  };
</script>
