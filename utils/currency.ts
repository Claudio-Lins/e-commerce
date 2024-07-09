export function currency(currency: number, discount: number) {
  const discountedPrice = currency - (currency * discount) / 100
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(discountedPrice)
}
