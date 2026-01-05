## Issues Identified

1. No validation for incoming request data.
2. SKU uniqueness is not enforced.
3. Product is directly linked to a warehouse.
4. Multiple database commits can cause partial data.
5. Price precision handling is unclear.

## Impact

- Invalid data may crash the API.
- Duplicate SKUs can break inventory logic.
- Database inconsistency may occur.

## Suggested Fix (High-Level)

- Validate required fields.
- Enforce SKU uniqueness at database level.
- Separate product and inventory models.
- Use a single transaction for product creation.
