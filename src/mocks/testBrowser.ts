import { setupWorker, SetupWorkerApi } from "msw";
import { isProductionBuild } from "src/constants";
import store, { ApplicationState } from 'src/store';

let worker: SetupWorkerApi;

if (!isProductionBuild) {
}

export { worker };
