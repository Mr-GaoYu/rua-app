import { rest } from "msw";

export const handlers = [
  rest.get("*/profile/preferences", (req, res, ctx) => {
    return res(ctx.json({ display: "compact" }));
  }),
];
