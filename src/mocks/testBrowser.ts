import { setupWorker, SetupWorkerApi } from "msw";
import { isProductionBuild } from "src/constants";
import store, { ApplicationState } from "src/store";
import { handlers } from "./serverHandlers";

let worker: SetupWorkerApi;

if (!isProductionBuild) {
  worker = setupWorker(...handlers);

}

export { worker };
