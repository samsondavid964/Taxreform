export interface TaxResult {
  annualGross: number;
  rentRelief: number;
  pensionDeduction: number;
  chargeableIncome: number;
  totalAnnualTax: number;
  totalMonthlyTax: number;
  effectiveRate: number;
}

const TAX_BANDS = [
  { limit: 800000, rate: 0.00 },      // First 800k: 0%
  { limit: 2200000, rate: 0.15 },     // Next 2.2m (up to 3m)
  { limit: 9000000, rate: 0.18 },     // Next 9m (up to 12m)
  { limit: 13000000, rate: 0.21 },    // Next 13m (up to 25m)
  { limit: 25000000, rate: 0.23 },    // Next 25m (up to 50m)
  { limit: Infinity, rate: 0.25 }     // Above 50m
];

export const calculateTax = (
  gross: number, 
  rent: number, 
  isMonthly: boolean, 
  hasPension: boolean
): TaxResult => {
  
  // Step A: Normalization
  const annualGross = isMonthly ? gross * 12 : gross;
  const annualRent = isMonthly ? rent * 12 : rent;

  // Step B: Deductions
  // Rent Relief: 20% of rent, capped at 500k
  const rentRelief = Math.min(annualRent * 0.20, 500000);
  
  // Pension: 8% of Gross if active
  const pensionDeduction = hasPension ? annualGross * 0.08 : 0;
  
  const totalRelief = rentRelief + pensionDeduction;
  
  // Chargeable Income cannot be < 0
  let chargeableIncome = Math.max(0, annualGross - totalRelief);
  const finalChargeable = chargeableIncome; // Store for return object

  // Step C: Apply Tax Bands
  let totalTax = 0;
  
  for (const band of TAX_BANDS) {
    if (chargeableIncome <= 0) break;
    
    // How much income falls into this band?
    const taxableInBand = Math.min(chargeableIncome, band.limit);
    
    totalTax += taxableInBand * band.rate;
    chargeableIncome -= taxableInBand;
  }

  return {
    annualGross,
    rentRelief,
    pensionDeduction,
    chargeableIncome: finalChargeable,
    totalAnnualTax: totalTax,
    totalMonthlyTax: totalTax / 12,
    effectiveRate: annualGross > 0 ? (totalTax / annualGross) * 100 : 0
  };
};