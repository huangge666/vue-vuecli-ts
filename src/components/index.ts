import { createApp } from "vue";

import BaseSearch from "./BaseSearch/index.vue";
import BaseDatePicker from "./BaseDatePicker/index.vue";
import BaseFormDialog from "./BaseFormDialog/index.vue";

const compList = [BaseSearch, BaseDatePicker, BaseFormDialog];

export default function registerGlobComp(app: ReturnType<typeof createApp>) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });
}
