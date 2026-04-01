import React, { useState, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Send, Droplets } from "lucide-react";

import ProgressBar from "../components/form/ProgressBar";
import StepIssue from "../components/form/StepIssue";
import StepUrgency from "../components/form/StepUrgency";
import StepContact from "../components/form/StepContact";
import StepNotes from "../components/form/StepNotes";
import StepConfirmation from "../components/form/StepConfirmation";
import WaterBg from "../components/form/WaterBg";

const SLIDE_VARIANTS = {
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export default function LeadForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [leadId, setLeadId] = useState(null);
  const [formData, setFormData] = useState({
    issue: "",
    urgency: "",
    first_name: "",
    phone: "",
    notes: "",
  });
  const [contactErrors, setContactErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get("src") || urlParams.get("source") || "direct";

  const saveLead = async (data, stepNum, isComplete = false) => {
    setSaving(true);
    const payload = {
      ...data,
      source,
      last_step_completed: stepNum,
      status: isComplete ? "complete" : "partial",
    };

    if (leadId) {
      await base44.entities.Lead.update(leadId, payload);
    } else {
      const created = await base44.entities.Lead.create(payload);
      setLeadId(created.id);
    }
    setSaving(false);
  };

  const goNext = async () => {
    if (step === 3) {
      const errors = {};
      if (!formData.first_name.trim()) errors.first_name = "First name is required";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      if (Object.keys(errors).length > 0) {
        setContactErrors(errors);
        return;
      }
      setContactErrors({});
    }

    const nextStep = step + 1;
    const isComplete = nextStep === 5;
    await saveLead(formData, step, isComplete);
    setDirection(1);
    setStep(nextStep);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleIssueSelect = async (val) => {
    const updated = { ...formData, issue: val };
    setFormData(updated);
    await saveLead(updated, 1);
    setDirection(1);
    setStep(2);
  };

  const handleUrgencySelect = async (val) => {
    const updated = { ...formData, urgency: val };
    setFormData(updated);
    await saveLead(updated, 2);
    setDirection(1);
    setStep(3);
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const isConfirmation = step === 5;

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <WaterBg />

      {/* Header */}
      <header className="w-full px-5 pt-5 pb-3 flex items-center gap-2.5 max-w-lg mx-auto">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <Droplets className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground leading-none">AquaRestore</h1>
          <p className="text-[11px] text-muted-foreground">Water Damage & Restoration</p>
        </div>
      </header>

      {/* Progress */}
      {!isConfirmation && (
        <div className="px-5 py-3 max-w-lg mx-auto w-full">
          <ProgressBar currentStep={step} />
        </div>
      )}

      {/* Step Content */}
      <main className="flex-1 px-5 max-w-lg mx-auto w-full pb-32">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="pt-4"
          >
            {step === 1 && (
              <StepIssue value={formData.issue} onSelect={handleIssueSelect} />
            )}
            {step === 2 && (
              <StepUrgency value={formData.urgency} onSelect={handleUrgencySelect} />
            )}
            {step === 3 && (
              <StepContact
                firstName={formData.first_name}
                phone={formData.phone}
                onChange={handleContactChange}
                errors={contactErrors}
              />
            )}
            {step === 4 && (
              <StepNotes
                value={formData.notes}
                onChange={(val) => setFormData((p) => ({ ...p, notes: val }))}
              />
            )}
            {step === 5 && (
              <StepConfirmation firstName={formData.first_name} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (steps 3 & 4) */}
      {!isConfirmation && step >= 3 && (
        <div className="fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-lg border-t border-border px-5 py-4">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="rounded-xl h-13 px-5 border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              size="lg"
              onClick={goNext}
              disabled={saving}
              className="rounded-xl h-13 flex-1 text-base font-semibold"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : step === 4 ? (
                <>
                  Submit
                  <Send className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Back button for step 2 */}
      {step === 2 && (
        <div className="fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-lg border-t border-border px-5 py-4">
          <div className="max-w-lg mx-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="rounded-xl h-13 px-5 border-2"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}