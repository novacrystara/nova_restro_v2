"use client";

import Button, { type ButtonProps } from "@/components/ui/Button";
import { useDemoModal } from "./DemoModalProvider";

/** Any CTA that should open the Book-a-Demo dialog. */
export function DemoButton({
  children,
  ...rest
}: Omit<ButtonProps, "href" | "onClick"> & { children: React.ReactNode }) {
  const { openModal } = useDemoModal();
  return (
    <Button {...rest} onClick={openModal}>
      {children}
    </Button>
  );
}

export default DemoButton;
