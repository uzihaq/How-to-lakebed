import { capsule, mutation, query, string, table } from "lakebed/server";

// The entire backend for the ladybug crawling on the page.
// ONE shared row holds her spot as a CONTENT anchor: x = the index of a content section, y = "fx,fy"
// (a fractional offset within that section). Anchoring to content — not raw x%/y% of the page — means
// every client resolves the same section and lands her on the same content, so desktop and mobile
// sync from one row regardless of resolution/shape. A click writes a new anchor; everyone re-renders.
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
      const i = String(Math.max(0, Math.round(Number(p.i) || 0)));   // section index
      const fx = Math.max(0.05, Math.min(0.95, Number(p.fx)));
      const fy = Math.max(0.05, Math.min(0.95, Number(p.fy)));
      const y = `${fx.toFixed(4)},${fy.toFixed(4)}`;
      const row = ctx.db.bug.all().find((b) => b.key === "bug");
      if (row) ctx.db.bug.update(row.id, { x: i, y });
      else ctx.db.bug.insert({ key: "bug", x: i, y });
    }),
  },
});
