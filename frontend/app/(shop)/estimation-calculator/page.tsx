"use client";

import { useState } from "react";
import { Calculator, FileDown, Send, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function EstimationCalculatorPage() {
  // Form State
  const [projectType, setProjectType] = useState("");
  const [otherProject, setOtherProject] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [otherBuilding, setOtherBuilding] = useState("");
  const [plan, setPlan] = useState<"Basic" | "Standard" | "Premium">("Standard");
  
  const [room, setRoom] = useState({ length: "", width: "", height: "", unit: "m" });
  const [doorsWindows, setDoorsWindows] = useState({ doorArea: "", windowArea: "" });

  // Estimate State
  const [estimate, setEstimate] = useState<null | {
    netArea: number;
    liters: number;
    cost: number;
  }>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room.length || !room.width || !room.height) {
      toast.error("Please fill in all room dimensions.");
      return;
    }
    if (!projectType || !buildingType) {
      toast.error("Please select project and building types.");
      return;
    }

    const l = parseFloat(room.length);
    const w = parseFloat(room.width);
    const h = parseFloat(room.height);
    const door = parseFloat(doorsWindows.doorArea) || 0;
    
    // FIX: Renamed 'window' to 'winArea' to avoid shadowing the global window object
    const winArea = parseFloat(doorsWindows.windowArea) || 0;

    const totalWallArea = 2 * (l + w) * h;
    const netArea = Math.max(0, totalWallArea - door - winArea);
    const liters = Math.ceil(netArea / 10);

    const prices = { Basic: 5000, Standard: 7500, Premium: 10000 };
    const cost = liters * prices[plan];

    setEstimate({ netArea, liters, cost });
    
    // Now 'window' correctly refers to the global browser window
    if (window.innerWidth < 1024) {
      document.getElementById("summary-card")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRequestQuote = async () => {
    if (!estimate) return;
    setIsSubmitting(true);
    try {
      await api("quotes/submit", {
        method: "POST",
        body: {
          project_type: projectType === "others" ? otherProject : projectType,
          building_type: buildingType === "others" ? otherBuilding : buildingType,
          plan: plan,
          room_area: estimate.netArea,
          liters: estimate.liters,
          estimated_cost: estimate.cost,
        }
      });
      toast.success("Quote requested! We'll be in touch shortly.");
    } catch (err: any) {
      toast.error(err.message || "Failed to request quote. Please log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-8 md:py-16 print:bg-white print:py-0">
      <div className="container-shop max-w-6xl print:max-w-none print:p-0">
        
        <div className="mb-8 md:mb-12 text-center md:text-left print:hidden">
          <h1 className="font-nexa text-2xl md:text-4xl font-black text-black mb-2">Paint Estimation Calculator</h1>
          <p className="font-nexa text-xs md:text-base text-gray-600">Save time and money using our paint calculator to determine how much paint you require before you start.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-10 items-start">
          
          {/* Left Column - Form (Hidden on Print) */}
          <form onSubmit={handleCalculate} className="w-full lg:w-[65%] bg-white rounded-xl md:rounded-2xl p-5 md:p-10 shadow-sm border border-gray-100 space-y-8 print:hidden">
            
            {/* Project Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-800 mb-1.5">Select Project Type *</label>
                <select 
                  required 
                  value={projectType} 
                  onChange={(e) => setProjectType(e.target.value)} 
                  className="w-full rounded-lg border border-gray-300 p-2.5 md:p-3 text-xs md:text-sm bg-gray-50 focus:border-brand outline-none transition"
                >
                  <option value="" disabled>Select Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="hospital">Hospital</option>
                  <option value="recreational">Recreational</option>
                  <option value="institutional">Institutional</option>
                  <option value="others">Others</option>
                </select>
                {projectType === "others" && (
                  <input type="text" placeholder="Please specify..." value={otherProject} onChange={(e) => setOtherProject(e.target.value)} className="w-full mt-2 rounded-lg border border-gray-300 p-2.5 text-xs outline-none" />
                )}
                <p className="text-[10px] text-gray-400 mt-1.5">The type of space you are painting.</p>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-800 mb-1.5">Choose Building Type *</label>
                <select 
                  required 
                  value={buildingType} 
                  onChange={(e) => setBuildingType(e.target.value)} 
                  className="w-full rounded-lg border border-gray-300 p-2.5 md:p-3 text-xs md:text-sm bg-gray-50 focus:border-brand outline-none transition"
                >
                  <option value="" disabled>Select Building Type</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="duplex">Duplex</option>
                  <option value="skyscraper">Skyscraper</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="others">Others</option>
                </select>
                {buildingType === "others" && (
                  <input type="text" placeholder="Please specify..." value={otherBuilding} onChange={(e) => setOtherBuilding(e.target.value)} className="w-full mt-2 rounded-lg border border-gray-300 p-2.5 text-xs outline-none" />
                )}
                <p className="text-[10px] text-gray-400 mt-1.5">The structural type of the building.</p>
              </div>
            </div>

            {/* Painting Plan */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-800 mb-3">Painting Plan *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(["Basic", "Standard", "Premium"] as const).map((p) => (
                  <div 
                    key={p}
                    onClick={() => setPlan(p)}
                    className={`cursor-pointer rounded-xl border p-3 md:p-4 transition-all ${
                      plan === p 
                        ? "border-brand bg-brand/5 shadow-sm" 
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-bold text-xs md:text-sm ${plan === p ? "text-brand" : "text-gray-800"}`}>{p} Plan</h3>
                      <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${plan === p ? "border-brand" : "border-gray-300"}`}>
                        {plan === p && <div className="h-2 w-2 rounded-full bg-brand"></div>}
                      </div>
                    </div>
                    <ul className="text-[10px] text-gray-500 space-y-0.5">
                      <li>• Pioneering Sustainability</li>
                      <li>• Accountability</li>
                      <li>• Integrity</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Dimensions */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-800 mb-1.5">Enter your Room Dimension *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <input type="number" placeholder="Length" required value={room.length} onChange={(e) => setRoom({...room, length: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm outline-none focus:border-brand" />
                <input type="number" placeholder="Width" required value={room.width} onChange={(e) => setRoom({...room, width: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm outline-none focus:border-brand" />
                <input type="number" placeholder="Height" required value={room.height} onChange={(e) => setRoom({...room, height: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm outline-none focus:border-brand" />
                <select value={room.unit} onChange={(e) => setRoom({...room, unit: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm bg-white outline-none focus:border-brand">
                  <option value="m">Meters (m)</option>
                  <option value="ft">Feet (ft)</option>
                </select>
              </div>
            </div>

            {/* Doors & Windows */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-800 mb-1.5">Enter your Door & Window Dimension</label>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Total Door Area (m²)" value={doorsWindows.doorArea} onChange={(e) => setDoorsWindows({...doorsWindows, doorArea: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm outline-none focus:border-brand" />
                <input type="number" placeholder="Total Window Area (m²)" value={doorsWindows.windowArea} onChange={(e) => setDoorsWindows({...doorsWindows, windowArea: e.target.value})} className="w-full rounded-lg border border-gray-300 p-2.5 text-xs md:text-sm outline-none focus:border-brand" />
              </div>
            </div>

            <div className="lg:hidden w-full pt-4">
              <button type="submit" className="w-full rounded-lg bg-brand-cta py-3.5 font-nexa font-bold text-black shadow-sm transition hover:bg-brand-cta-hover flex items-center justify-center gap-2">
                <Calculator size={18} /> Calculate Estimate
              </button>
            </div>
          </form>

          {/* Right Column - Summary */}
          <div id="summary-card" className="w-full lg:w-[35%] sticky top-24 print:top-0 print:w-full print:static">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
              
              <div className="hidden print:block mb-8 border-b pb-4">
                <h1 className="text-2xl font-black text-brand">Qualitas Eco Paint</h1>
                <p className="text-gray-500 text-sm">Paint Estimate Document</p>
              </div>

              <h2 className="font-nexa text-lg md:text-xl font-bold text-black mb-6 border-b border-gray-100 pb-4 print:border-none print:mb-4">Summary</h2>
              
              {estimate ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Selected Plan</span>
                    <span className="font-bold text-black">{plan}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Project Type</span>
                    <span className="font-bold text-black capitalize">{projectType === 'others' ? otherProject : projectType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Net Wall Area</span>
                    <span className="font-bold text-black">{estimate.netArea.toFixed(1)} m²</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Estimated Paint</span>
                    <span className="font-bold text-black">{estimate.liters} Liters</span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800">Total Estimate</span>
                      <span className="font-nexa font-black text-xl md:text-2xl text-brand">
                        ₦{estimate.cost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3 print:hidden">
                    <button 
                      onClick={handleDownloadPDF} 
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand py-3 font-nexa text-sm font-bold text-white transition hover:bg-brand-dark"
                    >
                      <FileDown size={16} /> Download PDF
                    </button>
                    <button 
                      onClick={handleRequestQuote} 
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border-2 border-brand py-2.5 font-nexa text-sm font-bold text-brand transition hover:bg-brand/5 disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      {isSubmitting ? "Submitting..." : "Request Quote"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 print:hidden">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                    <Calculator size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-bold text-gray-800 mb-1">Ready to calculate</p>
                  <p className="text-xs text-gray-500">Fill out the form and click calculate to see your estimate here.</p>
                </div>
              )}
            </div>

            <div className="hidden lg:block mt-4 print:hidden">
              <button onClick={handleCalculate} className="w-full rounded-lg bg-brand-cta py-4 font-nexa font-bold text-black shadow-sm transition hover:bg-brand-cta-hover flex items-center justify-center gap-2">
                <Calculator size={18} /> Calculate Estimate
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}