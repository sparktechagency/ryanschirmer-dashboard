"use client";
import {
  useGetAllBannerQuery,
  useUpdateBannerMutation,
} from "@/redux/api/bannerApi";
import { Plus, Edit } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import AddBanner from "./AddBanner";
import { errorToast, successToast } from "@/utils/customToast";
import { toast } from "sonner";

const bannerOptions = [
  { value: "sign_in_left", label: "Sign In Left" },
  { value: "sign_in_right", label: "Sign In Right" },
  { value: "sign_up_left_top", label: "Sign Up Left Top" },
  { value: "sign_up_left_bottom", label: "Sign Up Left Bottom" },
  { value: "sign_up_right_top", label: "Sign Up Right Top" },
  { value: "sign_up_right_bottom", label: "Sign Up Right Bottom" },
];

function getLabelByValue(value) {
  const match = bannerOptions.find((option) => option.value === value);
  return match ? match.label : value;
}

export default function BannerContainer() {
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState(null);
  const fileInputRef = useRef(null);

  const { data: bannerData, isLoading, refetch } = useGetAllBannerQuery();
  const banners = bannerData?.data?.data || [];

  const [updateFn, { isLoading: updateLoading }] = useUpdateBannerMutation();

  const handleImageChange = (event) => {
    toast.loading("Banner updating...", {
      id: "update",
    });
    const file = event.target.files?.[0];
    if (file && bannerId) {
      const formData = new FormData();
      formData.append("image", file);

      // Replace with actual update API if needed
      updateFn({ id: bannerId, data: formData })
        .unwrap()
        .then(() => {
          successToast("Banner updated successfully!", "update");
          refetch();
        })
        .catch((error) => {
          errorToast(`Upload failed: ${error}`, "update");
          console.error("Upload failed:", error);
        });
    }
  };

  const handleEditClick = (id) => {
    setBannerId(id);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-10">
      <div className="min-h-screen w-full rounded-2xl bg-primary-white px-5 py-10 shadow-2xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {banners.map((banner) => (
            <div key={banner?._id} className="card w-[300px]">
              <div className="group relative h-[400px] w-[280px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={banner?.image || "https://via.placeholder.com/280x400"}
                  alt={banner?.category || "Banner"}
                  width={280}
                  height={400}
                  className="h-full w-full rounded-lg object-cover brightness-75 transition duration-300 group-hover:brightness-50"
                />
                <button
                  type="button"
                  className="absolute left-1/2 top-4 hidden -translate-x-1/2 transform items-center rounded-full bg-primary px-4 py-2 text-white opacity-0 transition-opacity duration-300 group-hover:flex group-hover:opacity-100"
                  onClick={() => handleEditClick(banner._id)}
                >
                  <Edit size={20} className="mr-2" /> Edit
                </button>
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <p className="rounded bg-black/50 py-2 text-lg font-semibold text-white">
                    {getLabelByValue(banner?.category) || "No Category"}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {bannerOptions?.lenght !== banners?.length && (
            <div className="card w-[300px]" onClick={() => setOpen(true)}>
              <div className="relative h-[400px] w-[280px] rounded-md border-2 border-dashed border-primary">
                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg transition">
                  <Plus size={40} className="text-primary" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <AddBanner open={open} setOpen={setOpen} banners={banners} />
    </div>
  );
}
