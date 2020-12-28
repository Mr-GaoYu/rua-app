import { setupWorker, SetupWorkerApi } from "msw";
import { isProductionBuild } from "src/constants";

let worker: SetupWorkerApi;

if (!isProductionBuild) {
}

export { worker };
