export const formatINR = (value: number, opts: Intl.NumberFormatOptions = {}) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0, ...opts }).format(value);
