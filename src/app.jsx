import React, { useState, useCallback } from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Percent, Calendar, Trash2, PlusCircle, TrendingUp, Shield, BarChart2, SlidersHorizontal } from 'lucide-react';

// Historical data from 1928-2024
const historicalData = [
  { year: 1928, sp500: 0.4381, bond: 0.0084, tbill: 0.0308, inflation: -0.0116 }, { year: 1929, sp500: -0.083, bond: 0.042, tbill: 0.0316, inflation: 0.0058 }, { year: 1930, sp500: -0.2512, bond: 0.0454, tbill: 0.0455, inflation: -0.064 }, { year: 1931, sp500: -0.4384, bond: -0.0256, tbill: 0.0231, inflation: -0.0932 }, { year: 1932, sp500: -0.0864, bond: 0.0879, tbill: 0.0107, inflation: -0.1027 }, { year: 1933, sp500: 0.4998, bond: 0.0186, tbill: 0.0096, inflation: 0.0076 }, { year: 1934, sp500: -0.0119, bond: 0.0796, tbill: 0.0072, inflation: 0.0152 }, { year: 1935, sp500: 0.4674, bond: 0.0447, tbill: 0.003, inflation: 0.0299 }, { year: 1936, sp500: 0.3194, bond: 0.0502, tbill: 0.0022, inflation: 0.0145 }, { year: 1937, sp500: -0.3534, bond: 0.0138, tbill: 0.0045, inflation: 0.0286 }, { year: 1938, sp500: 0.2928, bond: 0.0421, tbill: 0.0004, inflation: -0.0278 }, { year: 1939, sp500: -0.011, bond: 0.0441, tbill: 0.0002, inflation: 0 }, { year: 1940, sp500: -0.1067, bond: 0.054, tbill: 0.0001, inflation: 0.0071 }, { year: 1941, sp500: -0.1277, bond: -0.0202, tbill: 0.0003, inflation: 0.0993 }, { year: 1942, sp500: 0.1917, bond: 0.0229, tbill: 0.0033, inflation: 0.0903 }, { year: 1943, sp500: 0.2506, bond: 0.0249, tbill: 0.0037, inflation: 0.0296 }, { year: 1944, sp500: 0.1903, bond: 0.0258, tbill: 0.0038, inflation: 0.023 }, { year: 1945, sp500: 0.3582, bond: 0.038, tbill: 0.0038, inflation: 0.0225 }, { year: 1946, sp500: -0.0843, bond: 0.0313, tbill: 0.0038, inflation: 0.1813 }, { year: 1947, sp500: 0.052, bond: 0.0092, tbill: 0.0059, inflation: 0.0884 }, { year: 1948, sp500: 0.057, bond: 0.0195, tbill: 0.0104, inflation: 0.0299 }, { year: 1949, sp500: 0.183, bond: 0.0466, tbill: 0.0111, inflation: -0.0207 }, { year: 1950, sp500: 0.3081, bond: 0.0043, tbill: 0.0121, inflation: 0.0593 }, { year: 1951, sp500: 0.2368, bond: -0.003, tbill: 0.0155, inflation: 0.06 }, { year: 1952, sp500: 0.1815, bond: 0.0227, tbill: 0.0176, inflation: 0.0075 }, { year: 1953, sp500: -0.0121, bond: 0.0414, tbill: 0.0192, inflation: 0.0075 }, { year: 1954, sp500: 0.5256, bond: 0.0329, tbill: 0.0097, inflation: -0.0074 }, { year: 1955, sp500: 0.326, bond: -0.0134, tbill: 0.0174, inflation: 0.0037 }, { year: 1956, sp500: 0.0744, bond: -0.0226, tbill: 0.0262, inflation: 0.0299 }, { year: 1957, sp500: -0.1046, bond: 0.068, tbill: 0.0322, inflation: 0.029 }, { year: 1958, sp500: 0.4372, bond: -0.021, tbill: 0.0178, inflation: 0.0176 }, { year: 1959, sp500: 0.1206, bond: -0.0265, tbill: 0.0294, inflation: 0.0173 }, { year: 1960, sp500: 0.0034, bond: 0.1164, tbill: 0.0293, inflation: 0.0136 }, { year: 1961, sp500: 0.2664, bond: 0.0206, tbill: 0.0235, inflation: 0.0067 }, { year: 1962, sp500: -0.0881, bond: 0.0569, tbill: 0.0278, inflation: 0.0133 }, { year: 1963, sp500: 0.2261, bond: 0.0168, tbill: 0.0316, inflation: 0.0164 }, { year: 1964, sp500: 0.1642, bond: 0.0373, tbill: 0.0355, inflation: 0.0097 }, { year: 1965, sp500: 0.124, bond: 0.0072, tbill: 0.0395, inflation: 0.0192 }, { year: 1966, sp500: -0.0997, bond: 0.0291, tbill: 0.0488, inflation: 0.0346 }, { year: 1967, sp500: 0.238, bond: -0.0158, tbill: 0.0432, inflation: 0.0304 }, { year: 1968, sp500: 0.1081, bond: 0.0327, tbill: 0.0534, inflation: 0.0472 }, { year: 1969, sp500: -0.0824, bond: -0.0501, tbill: 0.0668, inflation: 0.062 }, { year: 1970, sp500: 0.0356, bond: 0.1675, tbill: 0.0646, inflation: 0.0557 }, { year: 1971, sp500: 0.1422, bond: 0.0979, tbill: 0.0433, inflation: 0.0327 }, { year: 1972, sp500: 0.1876, bond: 0.0282, tbill: 0.0407, inflation: 0.0341 }, { year: 1973, sp500: -0.1431, bond: 0.0366, tbill: 0.0703, inflation: 0.0871 }, { year: 1974, sp500: -0.259, bond: 0.0199, tbill: 0.0784, inflation: 0.1234 }, { year: 1975, sp500: 0.37, bond: 0.0361, tbill: 0.058, inflation: 0.0694 }, { year: 1976, sp500: 0.2383, bond: 0.1598, tbill: 0.0499, inflation: 0.0486 }, { year: 1977, sp500: -0.0698, bond: 0.0129, tbill: 0.0527, inflation: 0.067 }, { year: 1978, sp500: 0.0651, bond: -0.0078, tbill: 0.0722, inflation: 0.0902 }, { year: 1979, sp500: 0.1852, bond: 0.0067, tbill: 0.1004, inflation: 0.1329 }, { year: 1980, sp500: 0.3174, bond: -0.0299, tbill: 0.1151, inflation: 0.1252 }, { year: 1981, sp500: -0.047, bond: 0.082, tbill: 0.1403, inflation: 0.0892 }, { year: 1982, sp500: 0.2042, bond: 0.3281, tbill: 0.1069, inflation: 0.0383 }, { year: 1983, sp500: 0.2234, bond: 0.032, tbill: 0.0861, inflation: 0.0379 }, { year: 1984, sp500: 0.0615, bond: 0.1373, tbill: 0.0958, inflation: 0.0395 }, { year: 1985, sp500: 0.3124, bond: 0.2571, tbill: 0.0748, inflation: 0.038 }, { year: 1986, sp500: 0.1849, bond: 0.2428, tbill: 0.06, inflation: 0.011 }, { year: 1987, sp500: 0.0581, bond: -0.0496, tbill: 0.0582, inflation: 0.0443 }, { year: 1988, sp500: 0.1654, bond: 0.0822, tbill: 0.0668, inflation: 0.0442 }, { year: 1989, sp500: 0.3148, bond: 0.1769, tbill: 0.0811, inflation: 0.0465 }, { year: 1990, sp500: -0.0306, bond: 0.0624, tbill: 0.075, inflation: 0.0611 }, { year: 1991, sp500: 0.3023, bond: 0.15, tbill: 0.0541, inflation: 0.0306 }, { year: 1992, sp500: 0.0749, bond: 0.0936, tbill: 0.0344, inflation: 0.029 }, { year: 1993, sp500: 0.0997, bond: 0.1421, tbill: 0.0301, inflation: 0.0275 }, { year: 1994, sp500: 0.0133, bond: -0.0804, tbill: 0.0425, inflation: 0.0267 }, { year: 1995, sp500: 0.372, bond: 0.2348, tbill: 0.0551, inflation: 0.0254 }, { year: 1996, sp500: 0.2268, bond: 0.0143, tbill: 0.0501, inflation: 0.0332 }, { year: 1997, sp500: 0.331, bond: 0.0994, tbill: 0.0506, inflation: 0.017 }, { year: 1998, sp500: 0.2834, bond: 0.1492, tbill: 0.0478, inflation: 0.0161 }, { year: 1999, sp500: 0.2089, bond: -0.0825, tbill: 0.0466, inflation: 0.0268 }, { year: 2000, sp500: -0.0903, bond: 0.1666, tbill: 0.0582, inflation: 0.0339 }, { year: 2001, sp500: -0.1185, bond: 0.0557, tbill: 0.034, inflation: 0.0155 }, { year: 2002, sp500: -0.2197, bond: 0.1512, tbill: 0.0161, inflation: 0.0238 }, { year: 2003, sp500: 0.2836, bond: 0.0038, tbill: 0.0101, inflation: 0.0188 }, { year: 2004, sp500: 0.1074, bond: 0.0449, tbill: 0.0137, inflation: 0.0326 }, { year: 2005, sp500: 0.0483, bond: 0.0287, tbill: 0.0315, inflation: 0.0342 }, { year: 2006, sp500: 0.1561, bond: 0.0196, tbill: 0.0473, inflation: 0.0254 }, { year: 2007, sp500: 0.0548, bond: 0.1021, tbill: 0.0436, inflation: 0.0408 }, { year: 2008, sp500: -0.3655, bond: 0.201, tbill: 0.0137, inflation: 0.0009 }, { year: 2009, sp500: 0.2594, bond: -0.1112, tbill: 0.0016, inflation: 0.0272 }, { year: 2010, sp500: 0.1482, bond: 0.0846, tbill: 0.0014, inflation: 0.015 }, { year: 2011, sp500: 0.021, bond: 0.1604, tbill: 0.0005, inflation: 0.0296 }, { year: 2012, sp500: 0.1589, bond: 0.0297, tbill: 0.0009, inflation: 0.0174 }, { year: 2013, sp500: 0.3215, bond: -0.091, tbill: 0.0006, inflation: 0.015 }, { year: 2014, sp500: 0.1352, bond: 0.1075, tbill: 0.0003, inflation: 0.0076 }, { year: 2015, sp500: 0.0138, bond: 0.0128, tbill: 0.0005, inflation: 0.0073 }, { year: 2016, sp500: 0.1177, bond: 0.0069, tbill: 0.0032, inflation: 0.0207 }, { year: 2017, sp500: 0.2161, bond: 0.028, tbill: 0.0089, inflation: 0.0211 }, { year: 2018, sp500: -0.0423, bond: -0.0002, tbill: 0.0194, inflation: 0.0191 }, { year: 2019, sp500: 0.3121, bond: 0.0964, tbill: 0.0206, inflation: 0.0229 }, { year: 2020, sp500: 0.1802, bond: 0.1133, tbill: 0.0036, inflation: 0.0136 }, { year: 2021, sp500: 0.2847, bond: -0.0442, tbill: 0.0006, inflation: 0.0704 }, { year: 2022, sp500: -0.1804, bond: -0.1783, tbill: 0.0259, inflation: 0.0645 }, { year: 2023, sp500: 0.2606, bond: 0.0388, tbill: 0.0517, inflation: 0.0335 }, { year: 2024, sp500: 0.2488, bond: -0.0164, tbill: 0.0515, inflation: 0.0275 },
];

// Main App Component
const App = () => {
    // State variables
    const [initialBalance, setInitialBalance] = useState(1000000);
    const [socialSecurityIncome, setSocialSecurityIncome] = useState(50000);
    const [investmentOption, setInvestmentOption] = useState('tbill');
    const [customReturnRate, setCustomReturnRate] = useState(5.0);
    const [costs, setCosts] = useState([{ name: 'Living Expenses', value: 20000 }, { name: 'Nursing Home', value: 50000 }]);
    const [simulationYears, setSimulationYears] = useState(40);
    const [chartData, setChartData] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationRan, setSimulationRan] = useState(false);
    const [summary, setSummary] = useState({ median: 0, p5: 0, p95: 0 });

    const numSimulations = 1000;

    // Handlers for cost inputs
    const addCost = () => setCosts([...costs, { name: '', value: 0 }]);
    const removeCost = (index) => setCosts(costs.filter((_, i) => i !== index));
    const updateCost = (index, field, value) => {
        const newCosts = [...costs];
        newCosts[index][field] = field === 'value' ? parseFloat(value) || 0 : value;
        setCosts(newCosts);
    };

    // Core simulation logic
    const runSimulation = useCallback(() => {
        setIsSimulating(true);
        setSimulationRan(true);

        const totalInitialAnnualCost = costs.reduce((acc, cost) => acc + cost.value, 0);
        const allSimulationPaths = [];
        const maxStartIdx = historicalData.length - simulationYears;

        for (let i = 0; i < numSimulations; i++) {
            const startIdx = Math.floor(Math.random() * maxStartIdx);
            const historicalWindow = historicalData.slice(startIdx, startIdx + simulationYears);
            
            let currentBalance = initialBalance;
            const simulationPath = [{ year: 0, balance: currentBalance }];

            for (let year = 1; year <= simulationYears; year++) {
                const historyYear = historicalWindow[year - 1] || historicalData[historicalData.length -1];
                
                let annualReturn;
                switch (investmentOption) {
                    case 'tbill':
                        annualReturn = historyYear.tbill;
                        break;
                    case 'balanced':
                        annualReturn = 0.5 * historyYear.sp500 + 0.5 * historyYear.bond;
                        break;
                    case 'custom':
                        annualReturn = customReturnRate / 100;
                        break;
                    default:
                        annualReturn = 0;
                }
                const currentInflation = historyYear.inflation;
                
                const gains = currentBalance * annualReturn;
                const inflatedCost = totalInitialAnnualCost * Math.pow(1 + currentInflation, year);
                const inflatedIncome = socialSecurityIncome * Math.pow(1 + currentInflation, year);
                
                currentBalance += gains + inflatedIncome - inflatedCost;
                simulationPath.push({ year, balance: currentBalance });
            }
            allSimulationPaths.push(simulationPath);
        }

        // Process results for chart
        const processedChartData = [];
        for (let year = 0; year <= simulationYears; year++) {
            const balancesForYear = allSimulationPaths.map(path => path[year].balance).sort((a,b) => a-b);
            
            const median = balancesForYear[Math.floor(numSimulations * 0.5)];
            const p2_5 = balancesForYear[Math.floor(numSimulations * 0.025)];
            const p97_5 = balancesForYear[Math.floor(numSimulations * 0.975)];

            processedChartData.push({
                year,
                median: median > 0 ? median : 0,
                confidenceRange: [p2_5 > 0 ? p2_5 : 0, p97_5 > 0 ? p97_5 : 0]
            });
            
            if (year === simulationYears) {
                setSummary({ 
                    median: isFinite(median) ? median : 0, 
                    p5: isFinite(p2_5) ? p2_5 : 0, 
                    p95: isFinite(p97_5) ? p97_5 : 0 
                });
            }
        }

        setChartData(processedChartData);
        setIsSimulating(false);
    }, [initialBalance, socialSecurityIncome, investmentOption, costs, simulationYears, customReturnRate]);

    const currencyFormatter = (value) => {
        if (value < 1000) return `$${value.toFixed(0)}`;
        return `$${(value / 1000).toFixed(0)}k`;
    }
    const fullCurrencyFormatter = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    // Custom Tooltip Formatter
    const tooltipFormatter = (value, name) => {
      if (Array.isArray(value)) {
        return `${fullCurrencyFormatter(value[0])} - ${fullCurrencyFormatter(value[1])}`;
      }
      return fullCurrencyFormatter(value);
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-800">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Retirement Savings Planner</h1>
                    <p className="text-lg text-slate-600 mt-2">Model your financial future using historical market data.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* --- Input Controls --- */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Plan Setup</h2>

                        <div className="mb-4">
                            <label className="flex items-center text-lg font-medium text-slate-700 mb-2">
                                <DollarSign className="w-5 h-5 mr-2 text-green-500" /> Initial Savings
                            </label>
                            <input type="number" value={initialBalance} onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)} className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:ring focus:ring-indigo-200 transition" />
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center text-lg font-medium text-slate-700 mb-2">
                                <DollarSign className="w-5 h-5 mr-2 text-blue-500" /> Annual Social Security
                            </label>
                            <input type="number" value={socialSecurityIncome} onChange={(e) => setSocialSecurityIncome(parseFloat(e.target.value) || 0)} className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:bg-white focus:ring focus:ring-indigo-200 transition" />
                        </div>
                        
                        <div className="mb-4">
                            <label className="flex items-center text-lg font-medium text-slate-700 mb-3">
                                <TrendingUp className="w-5 h-5 mr-2 text-indigo-500" /> Investment Strategy
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => setInvestmentOption('tbill')} className={`p-2 rounded-lg text-center text-sm font-semibold transition-all duration-200 ${investmentOption === 'tbill' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200'}`}><Shield className="w-4 h-4 mx-auto mb-1" /> T-Bills</button>
                                <button onClick={() => setInvestmentOption('balanced')} className={`p-2 rounded-lg text-center text-sm font-semibold transition-all duration-200 ${investmentOption === 'balanced' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200'}`}><BarChart2 className="w-4 h-4 mx-auto mb-1" /> 50/50</button>
                                <button onClick={() => setInvestmentOption('custom')} className={`p-2 rounded-lg text-center text-sm font-semibold transition-all duration-200 ${investmentOption === 'custom' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200'}`}><SlidersHorizontal className="w-4 h-4 mx-auto mb-1" /> Custom</button>
                            </div>
                        </div>

                        {investmentOption === 'custom' && (
                             <div className="mb-4">
                                <label className="flex items-center text-lg font-medium text-slate-700 mb-2">
                                    <Percent className="w-5 h-5 mr-2 text-orange-500" /> Custom Annual Return (%)
                                </label>
                                <input type="number" step="0.1" value={customReturnRate} onChange={(e) => setCustomReturnRate(parseFloat(e.target.value) || 0)} className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500 focus:bg-white" />
                            </div>
                        )}

                        <div className="mb-4">
                             <label className="flex items-center text-lg font-medium text-slate-700 mb-2">
                                <Percent className="w-5 h-5 mr-2 text-red-500" /> Annual Costs
                            </label>
                            {costs.map((cost, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2">
                                    <input type="text" placeholder="Cost Name" value={cost.name} onChange={(e) => updateCost(index, 'name', e.target.value)} className="w-1/2 p-2 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500" />
                                    <input type="number" placeholder="Amount" value={cost.value} onChange={(e) => updateCost(index, 'value', e.target.value)} className="w-1/2 p-2 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500" />
                                    <button onClick={() => removeCost(index)} className="text-slate-400 hover:text-red-500 transition"><Trash2 className="w-5 h-5"/></button>
                                </div>
                            ))}
                            <button onClick={addCost} className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium mt-2 transition"><PlusCircle className="w-5 h-5 mr-1" /> Add Cost</button>
                        </div>
                        
                        <div className="mb-6">
                            <label className="flex items-center text-lg font-medium text-slate-700 mb-2">
                                <Calendar className="w-5 h-5 mr-2 text-sky-500" /> Years to Simulate
                            </label>
                            <input type="number" value={simulationYears} onChange={(e) => setSimulationYears(parseInt(e.target.value, 10) || 1)} className="w-full p-3 bg-slate-100 rounded-lg border-2 border-transparent focus:border-indigo-500" />
                        </div>
                         
                        <p className="text-sm text-slate-500 mb-4">Simulations will run {numSimulations} times using random historical periods to model uncertainty.</p>

                        <button onClick={runSimulation} disabled={isSimulating} className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 ease-in-out disabled:bg-slate-400 flex items-center justify-center text-lg">
                            {isSimulating ? 'Simulating...' : 'Run Simulation'}
                        </button>
                    </div>

                    {/* --- Results and Chart --- */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                        <h2 className="text-2xl font-bold mb-6 text-slate-800">Projected Savings Over Time</h2>
                        {simulationRan ? (
                            <>
                                <div className="h-96 w-full mb-6">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -15 }} />
                                            <YAxis 
                                                domain={[1, 'auto']} 
                                                tickFormatter={currencyFormatter} 
                                                label={{ value: 'Account Balance', angle: -90, position: 'insideLeft', offset: -10 }} 
                                                allowDataOverflow={true}
                                            />
                                            <Tooltip formatter={tooltipFormatter} />
                                            <Legend verticalAlign="top" height={36} />
                                            <Area type="monotone" dataKey="confidenceRange" name="95% Confidence Range" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} strokeOpacity={0.6} />
                                            <Line type="monotone" dataKey="median" name="Median (50th Percentile)" stroke="#4338ca" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="text-center p-4 bg-slate-100 rounded-lg">
                                  <h3 className="text-lg font-semibold text-slate-700">Summary After {simulationYears} Years</h3>
                                  <p className="text-slate-600 mt-2">The results show a range of possible outcomes based on {numSimulations} simulations.</p>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                      <div>
                                          <p className="text-sm font-medium text-slate-500">POOR OUTCOME (2.5%)</p>
                                          <p className="text-xl font-bold text-red-500">{fullCurrencyFormatter(summary.p5)}</p>
                                      </div>
                                       <div>
                                          <p className="text-sm font-medium text-slate-500">MEDIAN OUTCOME (50%)</p>
                                          <p className="text-2xl font-bold text-indigo-600">{fullCurrencyFormatter(summary.median)}</p>
                                      </div>
                                       <div>
                                          <p className="text-sm font-medium text-slate-500">GOOD OUTCOME (97.5%)</p>
                                          <p className="text-xl font-bold text-green-500">{fullCurrencyFormatter(summary.p95)}</p>
                                      </div>
                                  </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-96 w-full bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                                <p className="text-slate-500 text-lg text-center">
                                    Set up your plan and click "Run Simulation" to see a range of potential outcomes.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;

