export function formatPrice(value) {
  return `R$ ${Number(value).toFixed(2).replace(".", ",")}`;
}