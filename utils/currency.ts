export function currency(price: number, discount?: number) {
  const discountedPrice = price - (price * (discount || 0)) / 100;
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(discountedPrice);
}
