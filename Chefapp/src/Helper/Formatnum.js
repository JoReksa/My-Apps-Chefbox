export function numberWithCommas(x) {
  if (x == null) {
    return null;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
