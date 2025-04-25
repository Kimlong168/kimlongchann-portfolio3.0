"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    id: 1,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 1",
    caption: "Beautiful sunset at the beach",
  },
  {
    id: 2,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 2",
    caption: "Mountain hiking adventure",
  },
  {
    id: 3,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 3",
    caption: "City skyline at night",
  },
  {
    id: 4,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 4",
    caption: "Forest exploration",
  },
  {
    id: 5,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 5",
    caption: "Coding session at the cafe",
  },
  {
    id: 6,
    src: "https://kimlongchann.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdiverse1.050c59c1.jpg&w=3840&q=75",
    alt: "Gallery image 6",
    caption: "Tech conference presentation",
  },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
    null
  );

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold">{t("gallery.title")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Dialog key={image.id}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3]">
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <p className="p-3 text-white text-sm">{image.caption}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0 overflow-hidden">
              <div className="relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-auto"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                  <p className="text-white">{image.caption}</p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
