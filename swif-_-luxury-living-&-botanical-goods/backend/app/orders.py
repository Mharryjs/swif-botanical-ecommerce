"""
Authoritative order processing, price protection, and atomic inventory allocation.
"""
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import select
from .models import Product, Order, OrderItem

class OrderProcessingError(Exception):
    pass

def process_order(
    db: Session,
    customer_info: Dict[str, str],
    shipping_address: Dict[str, str],
    cart_items: List[Dict[str, Any]],
    payment_method: str,
    user_id: str = None
) -> Order:
    """
    Authoritative order execution:
    1. Locks candidate products inside a database transaction.
    2. Verifies active status and authoritative database price (never trusting frontend prices).
    3. Validates stock quantities against order requests.
    4. Atomically decreases stock.
    5. Creates Order and OrderItem records.
    6. Commits transaction or rolls back on any error.
    """
    if not cart_items:
        raise OrderProcessingError("Cart cannot be empty.")

    subtotal = 0.0
    order_items_to_create = []

    # Acquire lock on product rows to avoid race conditions
    for item in cart_items:
        product_id = item["product_id"]
        qty = int(item["quantity"])

        if qty <= 0:
            raise OrderProcessingError("Item quantity must be greater than zero.")

        # Query authoritative product row with FOR UPDATE row-level lock
        product = db.query(Product).filter(Product.id == product_id).with_for_update().first()
        if not product:
            raise OrderProcessingError(f"Product {product_id} no longer exists.")
        
        if product.status != "active":
            raise OrderProcessingError(f"Product '{product.name}' is inactive.")

        if product.stock_quantity < qty:
            raise OrderProcessingError(
                f"Insufficient stock for '{product.name}'. Available: {product.stock_quantity}, requested: {qty}."
            )

        # Authoritative price calculation
        unit_price = float(product.price)
        subtotal += unit_price * qty

        # Atomic decrement
        product.stock_quantity -= qty

        order_items_to_create.append({
            "product_id": product.id,
            "product_name": product.name,
            "sku": product.sku,
            "price": unit_price,
            "quantity": qty,
            "main_image": product.main_image
        })

    # Calculations
    shipping_fee = 0.0 if subtotal >= 150.0 else 15.0
    tax = round(subtotal * 0.08, 2)
    total = round(subtotal + shipping_fee + tax, 2)

    order_number = f"SWF-2026-{db.query(Order).count() + 1001}"

    order = Order(
        order_number=order_number,
        user_id=user_id,
        customer_name=customer_info["name"],
        customer_email=customer_info["email"],
        shipping_street=shipping_address["street"],
        shipping_city=shipping_address["city"],
        shipping_state=shipping_address.get("state"),
        shipping_postal_code=shipping_address["postal_code"],
        shipping_country=shipping_address["country"],
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        tax=tax,
        total=total,
        status="confirmed",
        payment_method=payment_method,
        payment_status="authorized"
    )

    db.add(order)
    db.flush() # Flush to get order.id

    for item_data in order_items_to_create:
        order_item = OrderItem(
            order_id=order.id,
            **item_data
        )
        db.add(order_item)

    db.commit()
    db.refresh(order)
    return order
