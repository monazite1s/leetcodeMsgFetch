<!-- <template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.scss";
</style> -->
<template>
  <div class="color-picker">
    <el-color-picker v-model="baseColor" @change="generateColorPalette" />
    <div class="color-palette">
      <div
        v-for="(color, index) in colorPalette"
        :key="index"
        class="color"
        :style="{ backgroundColor: color }"
        @click="showColorCode(color)"
      ></div>
    </div>
    <el-banner v-if="selectedColor" type="success" effect="light" closable>
      <span>{{ selectedColor }}</span>
    </el-banner>
  </div>
</template>

<script>
import { rgbToHsl, hslToRgb } from "color-convert";

export default {
  data() {
    return {
      baseColor: "#409EFF",
      colorPalette: [],
      selectedColor: null,
    };
  },
  methods: {
    generateColorPalette() {
      const hslBaseColor = rgbToHsl(this.hexToRgb(this.baseColor));
      const lightnessWeights = [-0.4, -0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4];
      this.colorPalette = lightnessWeights.map((weight) => {
        const adjustedHslColor = [
          hslBaseColor[0],
          hslBaseColor[1],
          this.clamp(hslBaseColor[2] + weight),
        ];
        const rgbColor = this.rgbToHex(hslToRgb(adjustedHslColor));
        return rgbColor;
      });
    },
    showColorCode(color) {
      this.selectedColor = color;
    },
    hexToRgb(hex) {
      const bigint = parseInt(hex.substring(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    },
    rgbToHex(rgb) {
      return (
        "#" +
        ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2])
          .toString(16)
          .slice(1)
      );
    },
    clamp(value) {
      return Math.max(0, Math.min(1, value));
    },
  },
};
</script>

<style>
.color-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.color {
  width: 40px;
  height: 40px;
  margin: 5px;
  cursor: pointer;
}

.el-banner {
  margin-top: 10px;
}
</style>
