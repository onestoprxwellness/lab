export const formatCurrency = (
  amount: number,
  options?: Intl.NumberFormatOptions
) => {
  const formattedAmount = new Intl.NumberFormat('NGN', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
  return formattedAmount;
};
