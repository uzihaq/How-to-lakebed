import { capsule, mutation, query, string, table } from "lakebed/server";

// The entire backend for the ladybug crawling on the page.
// One shared row holds its position (x%, y%). Everyone sees the same row,
// so everyone sees the bug in the same spot. A click writes a new position
// and every subscribed client re-renders — no sockets, no events, no loops.
export default capsule({
  name: "Howto",
  schema: {
    bug: table({ key: string(), x: string(), y: string() }),
  },
  queries: {
    bug: query((ctx) => ctx.db.bug.all()),
  },
  mutations: {
    move: mutation((ctx, to: string) => {
      const p = JSON.parse(to || "{}");
      const key = p.key === "mobile" ? "mobile" : "desktop";  // separate coords per device class
      const x = String(Math.max(3, Math.min(96, Number(p.x))));
      const y = String(Math.max(4, Math.min(94, Number(p.y))));
      const row = ctx.db.bug.all().find((b) => b.key === key);
      if (row) ctx.db.bug.update(row.id, { x, y });
      else ctx.db.bug.insert({ key, x, y });
    }),
  },
});
