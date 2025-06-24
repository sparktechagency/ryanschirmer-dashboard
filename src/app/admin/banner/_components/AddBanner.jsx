import FormWrapper from "@/components/Form/FormWrapper";
import UUpload from "@/components/Form/UUpload";
import { useCreateBannerMutation } from "@/redux/api/bannerApi";
import { Button, Modal, Select, message } from "antd";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { errorToast, successToast } from "@/utils/customToast";
import { toast } from "sonner";
import USelect from "@/components/Form/USelect";

const id = "112233";
const bannerOptions = [
  { value: "sign_in_left", label: "Sign In Left" },
  { value: "sign_in_right", label: "Sign In Right" },
  { value: "sign_up_left_top", label: "Sign Up Left Top" },
  { value: "sign_up_left_bottom", label: "Sign Up Left Bottom" },
  { value: "sign_up_right_top", label: "Sign Up Right Top" },
  { value: "sign_up_right_bottom", label: "Sign Up Right Bottom" },
];

const AddBanner = ({ open, setOpen, banners = [] }) => {
  const [createFn, { isLoading }] = useCreateBannerMutation();
  const [category, setCagegory] = useState(null);
  const form = useForm();

  // Get list of used categories from existing banners
  const usedCategories = banners.map((b) => b?.category);

  // Create options with disabled states
  const disabledOptions = bannerOptions.map((option) => ({
    ...option,
    disabled: usedCategories.includes(option.value),
  }));

  const handleSubmit = async (data) => { 
    toast.loading("Banner updating...", { id });

    const fileObj = data?.image[0]?.originFileObj;
    const category = data?.category;

    if (!fileObj) {
      errorToast("Please select a banner image", id);
      return;
    }
    if (!category) {
      errorToast("Please select a banner image", id);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", fileObj);
      formData.append("data", JSON.stringify({ category }));

      const res = await createFn(formData).unwrap();

      if (res?.success) {
        successToast(res.message || "Banner created successfully", id);
        form.reset();
        setOpen(false);
      } else {
        errorToast(res?.message || "Something went wrong", id);
      }
    } catch (error) {
      console.error(error);
      errorToast(error?.data?.message || "Banner creation failed", id);
    }
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      title="Add New Banner"
    >
      <FormWrapper onSubmit={handleSubmit} {...form}>
        <div className="space-y-4">
          <UUpload
            uploadTitle="Upload banner image"
            listType="picture"
            name="image"
            max={1}
          />
          <USelect
            name="category"
            options={disabledOptions} 
            label={"Select Category"}
            placeholder={"Select Category"}
          />
          {/* 
          <Controller
            name="category"
            control={form.control}
            rules={{ required: "Banner type is required" }}
            render={({ field }) => (
              <Select
                className="w-full"
                placeholder="Select banner type"
                options={disabledOptions}
                value={field.value}
                onChange={(value) => field.onChange(value)}
              />
            )}
          /> */}

          {isLoading ? (
            <Button disabled className="mt-6 !h-10 w-full !font-semibold">
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Creating...
            </Button>
          ) : (
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="w-full mt-6"
            >
              Submit
            </Button>
          )}
        </div>
      </FormWrapper>
    </Modal>
  );
};

export default AddBanner;
