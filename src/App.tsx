import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calculator, CheckCircle, ShieldCheck, RefreshCw } from 'lucide-react';
import { formatCurrency, parseCurrencyInput } from './lib/utils';
import { calculateTax, TaxResult } from './lib/tax-logic';
import { TaxResultCard } from './components/ui/TaxResultCard';

export default function App() {
  // Navigation State
  const [view, setView] = useState<'welcome' | 'calculator' | 'results'>('welcome');
  
  // Form State
  const [period, setPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [status, setStatus] = useState<'salary' | 'freelance'>('salary');
  const [grossInput, setGrossInput] = useState<string>('');
  const [rentInput, setRentInput] = useState<string>('');
  const [pension, setPension] = useState<boolean>(true);
  
  // Results
  const [result, setResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    if (status === 'salary') setPension(true);
  }, [status]);

  const handleCalculate = () => {
    const gross = parseCurrencyInput(grossInput);
    const rent = parseCurrencyInput(rentInput);
    
    const data = calculateTax(gross, rent, period === 'monthly', pension);
    setResult(data);
    setView('results');
  };

  const handleReset = () => {
    setView('calculator');
    setResult(null);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-forest-900 p-4">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-forest-800/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          
          {/* 1. Welcome Screen */}
          {view === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 mt-10"
            >
              <div className="flex justify-center">
                <div className="p-5 bg-surface-glass rounded-3xl border border-surface-border shadow-2xl backdrop-blur-md">
                  <ShieldCheck className="w-16 h-16 text-gold-400" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h1 className="text-4xl font-bold text-white tracking-tight">Nigeria Tax 2025</h1>
                <p className="text-gray-400 text-lg font-light">
                  Precision financial planning for the modern professional.
                </p>
              </div>

              <button
                onClick={() => setView('calculator')}
                className="group w-full py-4 bg-gold-400 hover:bg-gold-500 text-forest-950 font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-400/20"
              >
                Calculate My Tax
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* 2. Calculator Form */}
          {view === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="bg-surface-glass backdrop-blur-xl border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Calculator className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Input Details</h2>
                </div>

                <div className="space-y-5">
                  {/* Toggles */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setPeriod(period === 'monthly' ? 'annual' : 'monthly')}
                      className="p-3 text-sm font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-gray-300"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {period === 'monthly' ? 'Monthly' : 'Annual'}
                    </button>
                    <button 
                      onClick={() => setStatus(status === 'salary' ? 'freelance' : 'salary')}
                      className="p-3 text-sm font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-gray-300"
                    >
                      {status === 'salary' ? 'Salary' : 'Freelance'}
                    </button>
                  </div>

                  {/* Gross Income Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Gross Income ({period})</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-serif text-lg">₦</span>
                      <input 
                        type="text" 
                        value={grossInput}
                        onChange={(e) => {
                          const val = parseCurrencyInput(e.target.value);
                          setGrossInput(val ? val.toLocaleString() : '');
                        }}
                        placeholder="0"
                        className="w-full bg-forest-950/50 border border-white/10 focus:border-gold-400/50 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-gray-700 font-mono text-lg transition-all"
                      />
                    </div>
                  </div>

                  {/* Rent Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Rent Paid ({period})</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 font-serif text-lg">₦</span>
                      <input 
                        type="text" 
                        value={rentInput}
                        onChange={(e) => {
                          const val = parseCurrencyInput(e.target.value);
                          setRentInput(val ? val.toLocaleString() : '');
                        }}
                        placeholder="0"
                        className="w-full bg-forest-950/50 border border-white/10 focus:border-gold-400/50 rounded-xl py-4 pl-10 pr-4 text-white placeholder:text-gray-700 font-mono text-lg transition-all"
                      />
                    </div>
                  </div>

                  {/* Pension Toggle */}
                  <div 
                    onClick={() => setPension(!pension)}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${pension ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-transparent border-white/5 hover:border-white/10'}`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${pension ? 'bg-emerald-500' : 'bg-white/10'}`}>
                      {pension && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm text-gray-300">Pension (8% Deduction)</span>
                  </div>

                  <button
                    onClick={handleCalculate}
                    disabled={!grossInput}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all mt-2"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. Results View */}
          {view === 'results' && result && (
            <TaxResultCard result={result} onReset={handleReset} />
          )}

        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 z-20">
        <a 
          href="https://www.linkedin.com/in/edafeoghene-egona-7795871a5/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-5 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/5 hover:border-gold-400/30 transition-all"
        >
          <span className="text-xs text-gray-400 group-hover:text-gold-400 transition-colors">Built by Edafeoghene Egona</span>
        </a>
      </div>
    </div>
  );
}