<script setup lang="ts">
import { useData } from "vuepress/client";
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";

const { frontmatter } = useData();
</script>

<template>
  <Blog>
    <template v-if="!frontmatter.bgImage" #heroBg>
      <BingHeroBackground />
    </template>
    <template v-if="!frontmatter.tagline" #heroInfo>
      <HitokotoBlogHero :text="frontmatter.heroText" />
    </template>
  </Blog>
</template>
