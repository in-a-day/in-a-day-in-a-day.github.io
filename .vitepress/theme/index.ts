import { EnhanceAppContext, inBrowser, useRouter } from 'vitepress'
import { nextTick, watchEffect } from 'vue'
import mediumZoom from 'medium-zoom'
import DefaultTheme from "vitepress/theme";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import MyLayout from "./components/MyLayout.vue";
import "./custom.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
    const { app } = ctx;
    // register global components
    app.component("Archives", Archives);
    app.component("Tags", Tags);
  },
  setup() {
    const router = useRouter()
    watchEffect(() => {
      // 将router.route.path作为依赖收集 首次访问即添加监听
      const path = router.route.path
      nextTick(() => (inBrowser ? mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) : null))
    })
  }
};
