import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PressKitClient from "@/components/PressKitClient";
import { getPressKit, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Material para imprensa e contratação da banda Disharmonical Tempest — bio, fotos, logos e contato.",
};

export default function PressKitPage() {
  const pressKit = getPressKit();
  const settings = getSettings();

  return (
    <>
      <Navbar />
      <PressKitClient pressKit={pressKit} settings={settings} />
    </>
  );
}
