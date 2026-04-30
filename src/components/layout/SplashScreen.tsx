"use client";

import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Verifica se já viu o splash na sessão atual
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    // Intervalo para a barra de progresso ir de 0 a 100% em 7 segundos (7000ms / 100 = 70ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 70);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 500); // Duração do fade out
    }, 7000); // Exibe por 7 segundos

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary text-primary-foreground transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-bounce mb-12">
        <UtensilsCrossed className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold tracking-tighter">Lanchonete</h1>
      </div>
      
      <div className="absolute bottom-20 w-64 flex flex-col items-center gap-3">
        <div className="h-2 w-full bg-primary-foreground/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-foreground transition-all duration-75 ease-linear rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-bold tracking-widest">{progress}%</span>
      </div>
    </div>
  );
}
