import { createApp } from "./app";
import { env } from "./infrastructure/config/env";

const app = createApp();

app.listen(env.port, () => {
  console.log(`BFF running on http://localhost:${env.port}`);
});
