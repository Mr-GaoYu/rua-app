import { createAction } from "@reduxjs/toolkit";

const actionCreator = createAction<number | undefined>(`@@manager/preferences`);
