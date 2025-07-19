<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from "vue";
  import { Chart, registerables } from "chart.js";

  // Register all needed components (you can optimize this later)
  Chart.register(...registerables);

  const props = defineProps<{ data: { x: number; y: number }[] }>();

  const canvasRef = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;

  onMounted(() => {
    const ctx = canvasRef.value?.getContext("2d");
    if (!ctx) return;

    chart = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter with Line",
            data: props.data,
            showLine: true,
            borderColor: "blue",
            backgroundColor: "blue",
          },
        ],
      },
      options: {
        animation: false,
        responsive: true,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
        },
      },
    });
  });

  // Watch for reactive updates
  watch(
    () => props.data,
    (newData) => {
      if (chart) {
        chart.data.datasets[0].data = [...newData]; // clone to avoid reactivity issues
        chart.update();
      }
    }
  );

  // Clean up
  onBeforeUnmount(() => {
    chart?.destroy();
  });
</script>

<style scoped>
  canvas {
    width: 100%;
    height: 300px;
  }
</style>
