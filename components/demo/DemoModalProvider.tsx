"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import DemoModal from "./DemoModal";

interface DemoModalContextValue {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside <DemoModalProvider>");
  return ctx;
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openModal, closeModal }),
    [open, openModal, closeModal],
  );

  return (
    <DemoModalContext.Provider value={value}>
      {children}
      <DemoModal open={open} onClose={closeModal} />
    </DemoModalContext.Provider>
  );
}

export default DemoModalProvider;
