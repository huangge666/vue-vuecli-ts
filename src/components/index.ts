import { createApp } from "vue";

import BaseSearch from "./BaseSearch/index.vue";

const compList = [BaseSearch];

export default function registerGlobComp(app: ReturnType<typeof createApp>) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
