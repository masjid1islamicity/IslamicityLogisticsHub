interface Env {
  DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const path = params.path ? (Array.isArray(params.path) ? params.path.join("/") : params.path) : "";

  // GET /api/items - Ambil Data Master Barang & Stok Real-Time
  if (request.method === "GET" && path === "items") {
    const { results } = await env.DB.prepare(`
      SELECT i.*, 
        COALESCE(SUM(CASE WHEN st.transaction_type = "IN" THEN st.quantity ELSE -st.quantity END), 0) AS current_stock
      FROM items i
      LEFT JOIN stock_transactions st ON i.id = st.item_id
      GROUP BY i.id
    `).all();
    return Response.json(results);
  }

  return Response.json({ status: "online", message: "Islamicity Logistics Hub API Engine Active" });
};