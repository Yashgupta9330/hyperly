// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "CRXJS React Vite Example with LinkedIn Auth",
  version: "1.0.0",
  permissions: [
    "identity",
    "storage"
  ],
  host_permissions: [
    "https://www.linkedin.com/*"
  ],
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["https://www.linkedin.com/*"]
    }
  ],
  action: {
    default_popup: "index.html"
  }
};

// vite.config.ts
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    crx({ manifest: manifest_default })
  ],
  css: {
    postcss
  },
  resolve: {
    alias: {
      "@": path.resolve("C:\\Users\\yaahg\\linkedin-ext", "./src")
    }
  },
  build: {
    rollupOptions: {
      input: {
        background: "src/background.ts",
        content: "src/content.tsx",
        popup: "index.html"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi9tYW5pZmVzdC5qc29uJ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIGNyeCh7IG1hbmlmZXN0IH0pXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3MsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXHlhYWhnXFxcXGxpbmtlZGluLWV4dFwiLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgYmFja2dyb3VuZDogJ3NyYy9iYWNrZ3JvdW5kLnRzJyxcbiAgICAgICAgY29udGVudDogJ3NyYy9jb250ZW50LnRzeCcsXG4gICAgICAgIHBvcHVwOiAnaW5kZXguaHRtbCdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsU0FBUyxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVwQixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sSUFBSSxFQUFFLDJCQUFTLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBa0MsT0FBTztBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
