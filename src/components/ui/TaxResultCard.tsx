import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../lib/utils';
import { RefreshCw, Info } from 'lucide-react';
import type { TaxResult } from '../../lib/tax-logic';

interface Props {
  result: TaxResult;
  onReset: () => void;
}

export const TaxResultCard = ({ result, onReset }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full bg-surface-glass backdrop-blur-xl border border-surface-border rounded-3xl overflow-hidden shadow-2xl relative"
    >
      {/* Gold Sheen Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-50" />

      <div className="p-8">
        {/* Header Stats */}
        <div className="text-center mb-8">
          <p className="text-emerald-200/60 text-xs font-bold uppercase tracking-widest mb-3">Total Annual Tax</p>
          <h2 className="text-5xl font-bold text-white tracking-tight mb-3 font-mono">
            {formatCurrency(result.totalAnnualTax)}
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/10 border border-gold-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-gold-400 text-xs font-semibold">Effective Rate: {result.effectiveRate.toFixed(1)}%</span>
          </div>
        </div>

        {/* Monthly Breakdown Box */}
        <div className="bg-forest-950/50 rounded-2xl p-6 mb-6 border border-white/5">
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
            <span className="text-gray-400 text-sm">Monthly Tax Deduction</span>
            <span className="text-white font-mono font-medium">{formatCurrency(result.totalMonthlyTax)}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-400 text-sm">Net Monthly Pay</span>
            <span className="text-emerald-400 font-mono font-bold text-lg">
              {formatCurrency((result.annualGross / 12) - result.totalMonthlyTax)}
            </span>
          </div>
        </div>

        {/* "The Why" Logic Explanation */}
        <div className="space-y-3 bg-white/5 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-white/90">
            <Info className="w-4 h-4 text-gold-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Analysis</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed text-justify">
            Based on a gross income of <strong className="text-white">{formatCurrency(result.annualGross)}</strong>, 
            we deducted <strong className="text-white">{formatCurrency(result.rentRelief)}</strong> for rent relief 
            {result.pensionDeduction > 0 && <span> and <strong className="text-white">{formatCurrency(result.pensionDeduction)}</strong> for pension</span>}.
            Your first ₦800k was tax-free. The remaining <strong className="text-white">{formatCurrency(result.chargeableIncome)}</strong> was taxed progressively.
          </p>
        </div>
      </div>

      {/* Footer Action */}
      <div className="bg-forest-950 p-4 flex justify-between items-center border-t border-white/5">
         <button 
           onClick={onReset}
           className="text-sm text-gold-400 hover:text-gold-500 font-medium flex items-center gap-2 transition-colors"
         >
           <RefreshCw className="w-4 h-4" />
           New Calculation
         </button>
         <span className="text-[10px] text-gray-600 uppercase tracking-widest">Act 2025 Compliant</span>
      </div>
    </motion.div>
  );
};