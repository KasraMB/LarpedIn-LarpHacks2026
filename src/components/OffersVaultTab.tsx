import React, { useState } from 'react';
import { 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Send,
  Zap,
  Award,
  PartyPopper
} from 'lucide-react';
import { OfferPackage } from '../types';

interface OffersVaultTabProps {
  offers: OfferPackage[];
  onAcceptOffer: (offerId: string) => void;
  onCounterOffer: (offerId: string, counterAmount: number, customPerk: string) => void;
  onOpenMessageWithRecruiter: (recruiterName: string) => void;
}

export const OffersVaultTab: React.FC<OffersVaultTabProps> = ({
  offers,
  onAcceptOffer,
  onCounterOffer,
  onOpenMessageWithRecruiter
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(offers[0]?.id || '');
  const [counterBase, setCounterBase] = useState<number>(100000);
  const [customPerkDemand, setCustomPerkDemand] = useState('');
  const [counterSubmitted, setCounterSubmitted] = useState(false);
  const [acceptedOfferId, setAcceptedOfferId] = useState<string | null>(null);

  const selectedOffer = offers.find((o) => o.id === selectedOfferId) || offers[0];

  const handleCounterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOffer) return;
    onCounterOffer(selectedOffer.id, counterBase, customPerkDemand);
    setCounterSubmitted(true);
    setTimeout(() => {
      setCounterSubmitted(false);
      setCustomPerkDemand('');
    }, 4000);
  };

  const handleAccept = (offerId: string) => {
    setAcceptedOfferId(offerId);
    onAcceptOffer(offerId);
  };

  const totalCalculatedComp = (offer: OfferPackage) => {
    return offer.baseSalary + offer.equityAnnual + offer.signOnBonus;
  };

  return (
    <div className="max-w-[1120px] mx-auto flex flex-col gap-6">
      {/* Hero Banner: The Bidding War Stash */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Silicon Valley & Wall St Bidding War Vault</span>
            </span>
            <span className="text-slate-400 text-xs">All packages 100% pre-authorized</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Current Highest Offer:{' '}
            <span className="text-emerald-400 font-mono">
              ${Math.max(...offers.map((o) => totalCalculatedComp(o))).toLocaleString()} / yr
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Citadel, Jane Street, NVIDIA, Google DeepMind, OpenAI, Anthropic, Microsoft, Meta, and AMD are actively engaging in uncoordinated price escalations to secure your signature. Counter any term sheet below to test their budget limits.
          </p>
        </div>

        <div className="absolute -right-6 -bottom-8 opacity-10 text-white pointer-events-none">
          <DollarSign className="w-64 h-64" />
        </div>
      </div>

      {/* Main Grid: Offers List & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Offers Overview Cards */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          <h3 className="font-bold text-xs uppercase text-slate-500 tracking-wider px-1">
            Active Term Sheets ({offers.length})
          </h3>

          {offers.map((offer) => {
            const isSelected = offer.id === selectedOffer?.id;
            const isAccepted = acceptedOfferId === offer.id;

            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOfferId(offer.id)}
                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0a66c2] ring-2 ring-[#0a66c2]/20 shadow-sm'
                    : 'border-[#e0dfdc] hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1.5 rounded-lg bg-slate-50 border border-slate-200">
                      {offer.companyLogo}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{offer.company}</h4>
                      <p className="text-[11px] text-slate-500">{offer.roleTitle}</p>
                    </div>
                  </div>
                  {isAccepted && (
                    <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-full">
                      ACCEPTED
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      Total 1st Year Comp
                    </span>
                    <span className="text-base font-extrabold text-slate-900 font-mono">
                      ${totalCalculatedComp(offer).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#0a66c2] hover:underline">
                    Inspect ➔
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: In-Depth Breakdown & Counter-Offer Terminal */}
        {selectedOffer && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#e0dfdc] shadow-sm p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 border border-slate-200">
                  {selectedOffer.companyLogo}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{selectedOffer.company}</h2>
                    <ShieldCheck className="w-4 h-4 text-[#0a66c2]" />
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Binding Offer
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Role: <strong className="text-slate-800">{selectedOffer.roleTitle}</strong> · Recruiter: {selectedOffer.recruiterName}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block">Total 1st Year Value</span>
                <span className="text-xl font-black text-emerald-600 font-mono">
                  ${totalCalculatedComp(selectedOffer).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Compensation Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Annual Base Salary</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  ${selectedOffer.baseSalary.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Paid bi-weekly in cash</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Annual Stock Grant</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  ${selectedOffer.equityAnnual.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">Accelerated vesting</span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Sign-on Bonus</span>
                <span className="text-lg font-bold text-amber-700 font-mono">
                  ${selectedOffer.signOnBonus.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Wired day of signing</span>
              </div>
            </div>

            {/* Recruiter Notes */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-slate-700 leading-relaxed">
              <strong className="text-[#0a66c2] block mb-1">Confidential Recruiter Note:</strong>
              "{selectedOffer.recruiterNotes}"
            </div>

            {/* Executive Perks List */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">Contract Stipulations:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedOffer.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-slate-700">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Counter-Offer Tool */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-bold text-slate-900">
                    Aggressive Counter-Offer Generator
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500">Recruiter will fold immediately</span>
              </div>

              <form onSubmit={handleCounterSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Increase Base Salary by:
                    </label>
                    <select
                      value={counterBase}
                      onChange={(e) => setCounterBase(Number(e.target.value))}
                      className="w-full bg-white text-xs text-slate-800 border border-slate-300 rounded-md p-2 focus:ring-1 focus:ring-[#0a66c2]"
                    >
                      <option value={50000}>+$50,000 / yr ("Gentle nudge")</option>
                      <option value={100000}>+$100,000 / yr ("Industry standard counter")</option>
                      <option value={200000}>+$200,000 / yr ("Power move")</option>
                      <option value={350000}>+$350,000 / yr ("Unapologetic 10x talent tax")</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Custom Demands / Perks:
                    </label>
                    <input
                      type="text"
                      value={customPerkDemand}
                      onChange={(e) => setCustomPerkDemand(e.target.value)}
                      placeholder="e.g. Private chef stipend, 3-day work week, 20k GPUs"
                      className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 border border-slate-300 rounded-md p-2 focus:ring-1 focus:ring-[#0a66c2]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-500">
                    New proposed comp: <strong className="text-emerald-700 font-mono">${(totalCalculatedComp(selectedOffer) + counterBase).toLocaleString()}</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Counter-Offer</span>
                  </button>
                </div>
              </form>

              {counterSubmitted && (
                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 animate-in fade-in">
                  🎉 <strong>COUNTER-OFFER APPROVED!</strong> {selectedOffer.recruiterName} responded within 4 seconds: <em>"We talked to the compensation committee and C-Suite. They didn't even hesitate. New contract updated in your vault!"</em>
                </div>
              )}
            </div>

            {/* Bottom Actions: Accept or Chat */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                onClick={() => onOpenMessageWithRecruiter(selectedOffer.recruiterName)}
                className="text-xs font-bold text-[#0a66c2] hover:underline cursor-pointer"
              >
                Chat directly with {selectedOffer.recruiterName} ➔
              </button>

              <button
                onClick={() => handleAccept(selectedOffer.id)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-full shadow-sm transition-all hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <PartyPopper className="w-4 h-4" />
                <span>Sign & Accept Offer (${totalCalculatedComp(selectedOffer).toLocaleString()})</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
