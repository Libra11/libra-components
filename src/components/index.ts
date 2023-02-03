/*
 * @Author: Libra
 * @Date: 2023-02-01 15:14:30
 * @LastEditors: Libra
 * @Description:
 * @FilePath: /libra-components/src/components/index.ts
 */
import LDialog from "./LDialog/index.vue";

export { LDialog };

const components = [LDialog];
const install = (app: any) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
  return app;
};
export default {
  install,
};
