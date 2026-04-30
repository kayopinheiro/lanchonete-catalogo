"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import PhoneInput, { formatPhoneNumberIntl } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Button } from "@/components/ui/button";

export function WelcomeScreen() {
  const { hasOnboarded, isHydrated, name, phone, setUserData, setOnboarded } = useUserStore();
  const [localName, setLocalName] = useState(name || "");
  const [localPhone, setLocalPhone] = useState(phone || "");
  const [step, setStep] = useState<1 | 2>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering anything until Zustand has hydrated and the component is mounted on the client
  if (!isHydrated || !mounted) return null;

  // If already onboarded, don't show the screen
  if (hasOnboarded) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localName.trim() || !localPhone) return;
    setStep(2);
  };

  const handleConfirm = () => {
    setUserData(localName, localPhone);
    setOnboarded(true);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-4 duration-500">
        {step === 1 ? (
          <>
            <div className="flex flex-col items-center justify-center pb-2">
              <span className="text-5xl drop-shadow-sm mb-2">🍔</span>
              <span className="font-black text-xl tracking-widest text-primary uppercase">Lanchonete</span>
            </div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Bem-vindo(a)!</h1>
              <p className="text-muted-foreground">
                Para uma melhor experiência, como podemos te chamar?
              </p>
            </div>

            <form onSubmit={handleContinue} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Seu Nome
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-input bg-transparent text-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Ex: João Silva"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  WhatsApp
                </label>
                <PhoneInput
                  defaultCountry="BR"
                  placeholder="(11) 98888-0000"
                  value={localPhone || undefined}
                  onChange={(value) => setLocalPhone(value || "")}
                  limitMaxLength={true}
                  className="w-full h-12 px-4 rounded-xl border border-input bg-transparent text-sm outline-none focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all"
                />
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold" disabled={!localName.trim() || !localPhone}>
                Continuar
              </Button>
            </form>
          </>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-primary">Confirme seus dados</h2>
              <p className="text-muted-foreground">
                Tem certeza que seus dados estão corretos?
              </p>
            </div>

            <div className="bg-muted p-6 rounded-2xl space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="text-lg font-medium">{localName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
                <p className="text-lg font-medium">{localPhone ? formatPhoneNumberIntl(localPhone) : ""}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <Button onClick={handleConfirm} className="w-full h-12 rounded-xl text-base font-bold">
                Sim, continuar
              </Button>
              <Button variant="outline" onClick={() => setStep(1)} className="w-full h-12 rounded-xl text-base">
                Editar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
