

async function getLowStockAlerts(companyId) {
  const alerts = [];

  // Step 1: Get all inventory items for this company
  // This includes multiple warehouses
  const inventories = await getCompanyInventories(companyId);

  // Step 2: Loop through inventory items
  for (let i = 0; i < inventories.length; i++) {
    const item = inventories[i];

    // Ignore products with no recent sales
    // Because alerting those does not make sense
    if (!item.recentSales || item.recentSales <= 0) {
      continue;
    }

    const currentStock = item.quantity;
    const threshold = item.product.lowStockThreshold;

    // Check if stock is below threshold
    if (currentStock < threshold) {
      alerts.push({
        product_id: item.product.id,
        product_name: item.product.name,
        sku: item.product.sku,

        warehouse_id: item.warehouse.id,
        warehouse_name: item.warehouse.name,

        current_stock: currentStock,
        threshold: threshold,

        supplier: {
          id: item.product.supplier.id,
          name: item.product.supplier.name,
          contact_email: item.product.supplier.contactEmail
        }
      });
    }
  }

  // Step 3: Return final response
  return {
    alerts: alerts,
    total_alerts: alerts.length
  };
}

module.exports = {
  getLowStockAlerts
};
