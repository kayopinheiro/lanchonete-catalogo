"use client";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export function CartSheet() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getTotalItems } = useCartStore();
  const { name, phone } = useUserStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mounted, setMounted] = useState(false);
  const [showOrderTypeDialog, setShowOrderTypeDialog] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const totalValue = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCheckout = (orderType: "Comer no local" | "Retirar") => {
    let text = `*🍔 NOVO PEDIDO*\n\n`;
    text += `*Cliente:* ${name}\n`;
    text += `*WhatsApp:* https://wa.me/${phone.replace(/\D/g, "")}\n`;
    text += `*Tipo de Pedido:* ${orderType}\n\n`;
    
    items.forEach((item) => {
      text += `• ${item.quantity}x ${item.product.name} - R$ ${(item.product.price * item.quantity).toFixed(2).replace(".", ",")}\n`;
    });
    
    text += `\n*Total: R$ ${totalValue.toFixed(2).replace(".", ",")}*\n`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5511985129005?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
    
    // Limpa o carrinho e fecha a gaveta
    useCartStore.getState().clearCart();
    setIsOpen(false);
    setShowOrderTypeDialog(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side={isDesktop ? "right" : "bottom"} className="flex flex-col h-[90vh] md:h-full p-0">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle>Seu Pedido ({getTotalItems()} itens)</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 w-full p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              Seu carrinho está vazio.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-muted shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 justify-between">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      <button 
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-sm text-primary">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                      <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="h-6 w-6 flex items-center justify-center rounded-full bg-background shadow-sm disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-6 border-t bg-background">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold">R$ {totalValue.toFixed(2).replace(".", ",")}</span>
            </div>
            <Button 
              onClick={() => setShowOrderTypeDialog(true)} 
              disabled={showOrderTypeDialog}
              className="w-full rounded-2xl h-12 text-base font-bold transition-opacity"
              style={{ opacity: showOrderTypeDialog ? 0.3 : 1 }}
            >
              Finalizar Pedido no WhatsApp
            </Button>
          </div>
        )}
      </SheetContent>

      <Dialog open={showOrderTypeDialog} onOpenChange={setShowOrderTypeDialog}>
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-2xl p-6 sm:p-8 z-[110] border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl">Como você prefere o seu pedido?</DialogTitle>
            <DialogDescription className="text-base mt-1">
              Escolha uma das opções abaixo para finalizar.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-6 mb-4">
            <Button 
              onClick={() => handleCheckout("Comer no local")}
              className="h-14 text-base rounded-2xl w-full"
              variant="default"
            >
              Comer no local
            </Button>
            <Button 
              onClick={() => handleCheckout("Retirar")}
              className="h-14 text-base rounded-2xl w-full"
              variant="outline"
            >
              Vou retirar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
}
