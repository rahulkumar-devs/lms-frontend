"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoCloudUploadSharp } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditHomeLayoutMutation, useGetHomeLayoutQuery } from "@/redux/layout/layoutApi";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const editHeroSchema = z.object({
  banner: z.any(),
  title: z.string(),
  subtitle: z.string(),
});

const EditHero: React.FC<Props> = ({ id }) => {
  const { data: fetchData, isLoading, isSuccess } = useGetHomeLayoutQuery("Banner");
  const [editHomeLayout,{isLoading:isSubmitting,}] = useEditHomeLayoutMutation()

  const form = useForm<z.infer<typeof editHeroSchema>>({
    resolver: zodResolver(editHeroSchema),
    defaultValues: {
      banner: null,
      title: "",
      subtitle: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && fetchData?.data?.banner) {
      reset({
        banner: fetchData.data.banner.image.url || null,
        title: fetchData.data.banner.title || "",
        subtitle: fetchData.data.banner.subtitle || "",
      });
      setSelectedImage(fetchData.data.banner.image);
    }
  }, [isSuccess, fetchData, reset]);

  const handleReflectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const result = reader.result as string;
          setSelectedImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof editHeroSchema>) => {
    console.log(values);
    const formData = new FormData();
    formData.append("image", values.banner[0] || values.banner); // Assuming `values.banner` is a FileList
    formData.append("type", "Banner");
    formData.append("title", values.title);
    formData.append("subTitle", values.subtitle);

    try {
      await editHomeLayout(formData).unwrap();
      toast.success("Layout updated successfully!");
    } catch (error) {
      toast.error("Failed to update layout.");
    }
  };

  return (
    <div className="px-5 mt-14">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Hero Image */}
          <FormField
            control={form.control}
            name="banner"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="banner"
                  className="flex flex-col items-center justify-center w-full min-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected Image"
                        className="w-full h-auto mb-4 rounded-lg"
                        onLoad={()=>{
                          
                        }}
                      />
                    ) : (
                      <>
                        <IoCloudUploadSharp className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                </FormLabel>
                <Input
                  type="file"
                  id="banner"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    handleReflectImage(e);
                  }}
                  accept=".svg, .png, .jpg, .gif"
                  className="hidden"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title */}
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subtitle */}
          <FormField
            control={control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditHero;
