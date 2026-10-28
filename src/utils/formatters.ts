/**
 * Currency and date formatting utilities for Benchmark Hotel (Indian Rupees / INR)
 */

export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

export const formatINRNumber = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0';
  }
  return Math.round(amount).toLocaleString('en-IN');
};

