"use client";
import { Button, Select } from "antd";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function BannerContainer() {
  const items = [
    {
      value: "1",
      label: "Sign In Page Banner",
    },
    {
      value: "2",
      label: "Sign Up Page Banner",
    },
  ];
  return (
    <div className="space-y-10">
      <div className="h-screen w-full rounded-2xl bg-primary-white px-5 py-10 shadow-2xl">
        <div className="flex items-center justify-end">
          <Select
            showSearch
            className="w-96 p-10"
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={items}
          />
        </div>
        <div className="mt-5 flex items-center justify-start gap-10 px-10">
          <div className="card w-[300px]">
            <h2 className="text-lg font-bold">Left side Banner</h2>
            <p className="text-md my-3">
              The left-side banner on the Sign In page is designed with a width
              of 424px and a height of 775px.
            </p>
            <div className="relative">
              <Image
                src="https://www.creativehatti.com/wp-content/uploads/edd/2022/03/Banner-template-of-personal-loan-with-easy-payment-13-large.jpg"
                alt=""
                className="h-[400px] w-[280px] rounded-lg brightness-50 transition-all duration-300 hover:cursor-pointer group-hover:filter"
              />
              <div className="absolute left-0 top-0 flex h-[400px] w-[280px] cursor-pointer items-center justify-center rounded-lg">
                <Camera size={80} className="!text-white" />
              </div>
            </div>
          </div>
          <div className="card w-[300px]">
            <h2 className="text-lg font-bold">Left side Banner</h2>
            <p className="text-md my-3">
              The left-side banner on the Sign In page is designed with a width
              of 424px and a height of 775px.
            </p>
            <div className="relative">
              <Image
                src="https://www.creativehatti.com/wp-content/uploads/edd/2022/03/Banner-template-of-personal-loan-with-easy-payment-13-large.jpg"
                alt=""
                className="h-[400px] w-[280px] rounded-lg brightness-50 transition-all duration-300 hover:cursor-pointer group-hover:filter"
              />
              <div className="absolute left-0 top-0 flex h-[400px] w-[280px] cursor-pointer items-center justify-center rounded-lg">
                <Camera size={80} className="!text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 px-10">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="!h-10 w-1/2 !font-semibold"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}
