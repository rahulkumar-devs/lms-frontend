"use client";

import React, { FC, useState } from "react";
import { courseInfoSchema, CourseInfoData } from "./courseDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

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
import Image from "next/image";

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
  const [draggingThumbnail, setDraggingThumbnail] = useState<boolean>(false);
  const [displayThumbnail, setDisplayThumbnail] = useState<string | null>(null);
  const [draggingDemoVideo, setDraggingDemoVideo] = useState<boolean>(false);
  const [demoVideo, setDemoVideo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      estimatedPrice: "",
      tags: "",
      level: "",
      demoVideo: null,
      thumbnail: null,
    },
  });

  function onSubmit(values: z.infer<typeof courseInfoSchema>) {
    console.log(values);
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
          if (type === "thumbnail") {
            setDisplayThumbnail(reader.result as string);
          } else {
            setDemoVideo(reader.result as string);
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
    };
     if(type === "demoVideo") {
      setDraggingDemoVideo(false);
    }

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (reader.readyState === 2) {
          if (type === "thumbnail") {
            setDisplayThumbnail(reader.result as string);
          }
          if(type === "demoVideo"){
            setDemoVideo(reader.result as string);
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
                    placeholder="mern lms platform with next 13..."
                    {...field}
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
                  <Textarea placeholder="Type your message here." {...field} />
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
                    <Input placeholder="Enter the price" {...field} />
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
                    <Input placeholder=" &#x20b9; estimatedPrice" {...field} />
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
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex  w-full  flex-col justify-between">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <FormControl>
                    <Input placeholder="Course level" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demoVideo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    onDragOver={(e) => handleDragOver(e, "demoVideo")}
                    onDragLeave={(e) => handleDragLeave(e, "demoVideo")}
                    onDrop={(event) => handleDrop(event, field, "demoVideo")}
                    className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 mt-3 border flex items-center justify-center ${
                      draggingDemoVideo ? "bg-blue-500" : "bg-transparent"
                    }`}
                  >
                    {demoVideo ? (
                      <video controls className=" w-full">
                        <source src={demoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <span>
                        Drag and drop your thumbnail here or click to browse
                      </span>
                    )}
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(event) => handleFileChange(field, event, "demoVideo")}
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    onChange={(event) => handleFileChange(field, event,"thumbnail")}
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
