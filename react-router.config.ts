import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  basename: "/",
  buildDirectory: "./build",
  appDirectory: "./app",
} satisfies Config;
