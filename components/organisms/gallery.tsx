"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-provider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Gallery as GalleryType } from "@/types";

// const images = [
//   {
//     id: 1,
//     src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
//     alt: "Gallery image 1",
//     caption: "Navathon 2023",
//   },
//   {
//     id: 2,
//     src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwinner.3701a4b6.jpg&w=3840&q=75",
//     alt: "Gallery image 1",
//     caption: "CADT Cup Season 2",
//   },
//   {
//     id: 3,
//     src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FtechoImg.cbf91959.jpg&w=3840&q=75",
//     alt: "Gallery image 1",
//     caption: "Techo Scholarship Award",
//   },
//   {
//     id: 4,
//     src: "https://kimlongchann.dev/og-image.png",
//     alt: "Gallery image 1",
//     caption: "Nothing, it's just me!",
//   },
// ];
export default function Gallery({ galleries }: { galleries: GalleryType[] }) {
  const { t } = useLanguage();

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("gallery.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.map((x) => (
          <Dialog key={x.id}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={x.image || "/placeholder.svg"}
                      alt={x.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <p className="p-3 text-white text-sm">{x.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={x.image || "/placeholder.svg"}
                  alt={x.title}
                  className="w-full h-auto"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                  <p className="text-white">{x.title}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
