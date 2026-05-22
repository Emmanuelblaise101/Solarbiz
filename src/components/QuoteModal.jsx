import React, { useState, useEffect } from 'react';
import { useQuote } from '../context/QuoteContext';

export const QuoteModal = () => {
  const { isOpen, closeQuote, quoteSubject } = useQuote();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto close after showing success
      setTimeout(() => {
        closeQuote();
        setIsSuccess(false); // Reset for next time
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={closeQuote}
      ></div>

      {/* Modal Surface */}
      <div className="relative bg-surface-container-high border border-outline-variant/30 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        
        {/* Header */}
        <div className="bg-surface-container-highest px-8 py-6 border-b border-outline-variant/20 flex justify-between items-center">
          <div>
             <h2 className="font-headline text-2xl font-bold tracking-tight">Request a Quote</h2>
             <p className="font-label text-sm text-primary mt-1">{quoteSubject}</p>
          </div>
          <button 
            onClick={closeQuote}
            className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-white/5"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                 <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
              </div>
              <h3 className="font-headline text-3xl font-bold mb-4">Request Received</h3>
              <p className="text-on-surface-variant">Our engineering team will contact you shortly regarding the {quoteSubject}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-neutral-400">Full Name</label>
                  <input required type="text" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-neutral-400">Phone or Email</label>
                  <input required type="text" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Contact details" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-neutral-400">Project Type</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="cursor-pointer">
                    <input type="radio" name="project_type" className="peer sr-only" defaultChecked />
                    <div className="text-center py-3 rounded-md border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-sm font-bold">Residential</div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="project_type" className="peer sr-only" />
                    <div className="text-center py-3 rounded-md border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-sm font-bold">Commercial</div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" name="project_type" className="peer sr-only" />
                    <div className="text-center py-3 rounded-md border border-outline-variant/20 peer-checked:border-primary peer-checked:bg-primary/10 transition-all text-sm font-bold">Industrial</div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-neutral-400">Specific Requirements</label>
                <textarea rows="4" className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-md px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell us about your energy needs..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary-container text-on-primary-container font-headline font-bold uppercase tracking-wider py-4 rounded-md hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                   <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                   <>Submit Request <span className="material-symbols-outlined">send</span></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
