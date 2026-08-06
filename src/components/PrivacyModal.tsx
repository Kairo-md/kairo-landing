import React from 'react';
import { X, ShieldCheck, Lock, HardDrive, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-300 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-emerald-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-900 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Kairo Privacy Policy</h3>
              <p className="text-xs text-emerald-200">100% Local-First & Zero Telemetry Guarantee</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm leading-relaxed">
          
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium text-xs">
            Summary: Kairo does NOT track your usage, sell data, or require an account. Everything you type stays strictly inside your computer's local drive.
          </div>

          {/* Point 1 */}
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-slate-100 rounded-lg shrink-0 text-slate-800">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Local-First Storage</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                All notes, images, and knowledge graph indexes are saved locally on your hardware. We do not operate remote database servers for note storage.
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-slate-100 rounded-lg shrink-0 text-slate-800">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Zero Analytics & Tracking</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Kairo contains no Google Analytics,Mixpanel, or telemetry scripts. The desktop application functions 100% offline without needing internet access.
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-slate-100 rounded-lg shrink-0 text-slate-800">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-1">Open Source & Auditable</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Our source code is open and transparent. Anyone can audit the application logic to verify data handling practices.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-dark text-white font-bold text-xs rounded-lg hover:bg-emerald-900 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
