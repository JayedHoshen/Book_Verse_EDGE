export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function calculateDiscount(originalPrice, discountPercent) {
  return originalPrice - (originalPrice * discountPercent) / 100;
}

export function generateOrderNumber() {
  return `SG-${Date.now().toString(36).toUpperCase()}`;
}
