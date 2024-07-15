import React, { FC, useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { courseInfoSchema, CourseInfoData } from "./courseDataSchema";
import { useGetHomeLayoutQuery } from "@/redux/layout/layoutApi";

type Props = {
  courseInfo: CourseInfoData;
  setCourseInfo: (courseInfo: CourseInfoData) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInfo: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [displayThumbnail, setDisplayThumbnail] = useState<string | null>(
    courseInfo.thumbnail || null
  );
  const [demoVideo, setDemoVideo] = useState<string | null>(
    courseInfo.demoVideo || null
  );
  const [draggingThumbnail, setDraggingThumbnail] = useState<boolean>(false);
  const [draggingDemoVideo, setDraggingDemoVideo] = useState<boolean>(false);
  const [categoriesItem, setCategoriesItems] = useState([]);
  const {
    data: categoriesData,
    isLoading: isFetching,
    isSuccess: isFetched,
  } = useGetHomeLayoutQuery("Categories");

  useEffect(() => {
    if (categoriesData?.data?.categories) {
      setCategoriesItems(categoriesData?.data?.categories);
    }
  }, [categoriesData, setCategoriesItems]);
  console.log(categoriesData);
  console.log("courseInfo==>1234",courseInfo)

  const form = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
    defaultValues: {
      name: courseInfo?.name || "",
      description: courseInfo?.description || "",
  categories: courseInfo?.categories || "", 
      price: courseInfo?.price || "",
      estimatedPrice: courseInfo?.estimatedPrice || "",
      tags: courseInfo?.tags || "",
      level: courseInfo?.level || "",
      demoVideo: courseInfo?.demoVideo || null,
      thumbnail: courseInfo?.thumbnail || null,
    },
  });

  useEffect(() => {
    form.reset({
      name: courseInfo?.name || "",
      description: courseInfo?.description || "",
  categories: courseInfo?.categories || "", 
      price: courseInfo?.price || "",
      estimatedPrice: courseInfo?.estimatedPrice || "",
      tags: courseInfo?.tags || "",
      level: courseInfo?.level || "",
      demoVideo: courseInfo?.demoVideo || null,
      thumbnail: courseInfo?.thumbnail || null,
    });
    setDisplayThumbnail(courseInfo.thumbnail || null);
    setDemoVideo(courseInfo.demoVideo || null);
  }, [courseInfo, form]);

  function onSubmit(values: z.infer<typeof courseInfoSchema>) {
    setCourseInfo(values);
    setActive(active + 1);
  }

  const handleFileChange = (
    field: any,
    event: React.ChangeEvent<HTMLInputElement>,
    type: "thumbnail" | "demoVideo"
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          const result = reader.result as string;
          if (type === "thumbnail") {
            setDisplayThumbnail(result);
          } else {
            setDemoVideo(result);
          }
        }
      };
      reader.readAsDataURL(file);
    }

    field.onChange(file);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLLabelElement>,
    type: "thumbnail" | "demoVideo"
  ) => {
    e.preventDefault();
    if (type === "thumbnail") {
      setDraggingThumbnail(true);
    } else {
      setDraggingDemoVideo(true);
    }
  };

  const handleDragLeave = (
    e: React.DragEvent<HTMLLabelElement>,
    type: "thumbnail" | "demoVideo"
  ) => {
    e.preventDefault();
    if (type === "thumbnail") {
      setDraggingThumbnail(false);
    } else {
      setDraggingDemoVideo(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLabelElement>,
    field: any,
    type: "thumbnail" | "demoVideo"
  ) => {
    e.preventDefault();
    if (type === "thumbnail") {
      setDraggingThumbnail(false);
    } else {
      setDraggingDemoVideo(false);
    }

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          const result = reader.result as string;
          if (type === "thumbnail") {
            setDisplayThumbnail(result);
          } else {
            setDemoVideo(result);
          }
        }
      };
      reader.readAsDataURL(file);
    }

    field.onChange(file);
  };

  return (
    <div className="w-[80%] m-auto mt-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter description"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter price"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter estimated price"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter tags"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter level"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="flex items-center  px-3 py-2 text-base text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="" className="text-gray-500">
                        Select Category
                      </option>
                      {categoriesItem &&
                        categoriesItem.length > 0 &&
                        categoriesItem.map((category: any, index: number) => {
                          return (
                            <option
                              value={category.title}
                              key={`categoriesItem-${index}`}
                              className="text-gray-700"
                            >
                              {(category.title as string).toLocaleUpperCase()}
                            </option>
                          );
                        })}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="demoVideo"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  onDragOver={(e) => handleDragOver(e, "demoVideo")}
                  onDragLeave={(e) => handleDragLeave(e, "demoVideo")}
                  onDrop={(event) => handleDrop(event, field, "demoVideo")}
                  className={`w-full  dark:border-white border-[#00000026] p-3 mt-3 border flex items-center justify-center ${
                    draggingDemoVideo ? "bg-blue-500" : "bg-transparent"
                  }`}
                >
                  {demoVideo ? (
                    <video controls className="w-full">
                      <source src={demoVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <span>
                      Drag and drop your video here or click to browse
                    </span>
                  )}
                </FormLabel>

                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(event) =>
                      handleFileChange(field, event, "demoVideo")
                    }
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  onDragOver={(e) => handleDragOver(e, "thumbnail")}
                  onDragLeave={(e) => handleDragLeave(e, "thumbnail")}
                  onDrop={(event) => handleDrop(event, field, "thumbnail")}
                  className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                    draggingThumbnail ? "bg-blue-500" : "bg-transparent"
                  }`}
                >
                  {displayThumbnail ? (
                    <Image
                      src={displayThumbnail}
                      alt="Thumbnail"
                      className="max-h-full max-w-full"
                      objectFit="cover"
                      sizes="(max-width: 100%) 100vw, (max-width: 100%) "
                      priority
                      width={100}
                      height={100}
                    />
                  ) : (
                    <span>
                      Drag and drop your thumbnail here or click to browse
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(event) =>
                      handleFileChange(field, event, "thumbnail")
                    }
                    className="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseInfo;
