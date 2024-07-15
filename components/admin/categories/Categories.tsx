import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { ChevronDown, ChevronUp } from "lucide-react";

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
import {
  useEditHomeLayoutMutation,
  useGetHomeLayoutQuery,
} from "@/redux/layout/layoutApi";
import toast from "react-hot-toast";

// Define schema for FAQs
const categoriesSchema = z.object({
  categories: z.array(
    z.object({
      title: z.string(),
    })
  ),
});

const Categories = () => {
  const [categoryState, setCategoryState] = useState<boolean[]>([]);
  const [editHomeLayout, { isLoading, isSuccess, error, data }] =
    useEditHomeLayoutMutation();
  const {
    data: fetchData,
    isLoading: isFetching,
    isSuccess: isFetched,
  } = useGetHomeLayoutQuery("Categories");

  const form = useForm<z.infer<typeof categoriesSchema>>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      categories: [{ title: "" }],
    },
  });

  const { control, handleSubmit, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  // Update form default values when fetchData is available
  useEffect(() => {
    if (fetchData && fetchData.data) {
      reset({
        categories:
          fetchData.data.categories?.map((item: any) => ({
            title: item.title || "",
          })) || [{ title: "" }],
      });
      setCategoryState(new Array(fetchData.data.categories.length).fill(false)); // Initialize FAQ states
    }
  }, [fetchData, reset]);

  // Toggle FAQ item collapse state
  const toggleFaqCollapse = (index: number) => {
    setCategoryState((prevState) => {
      const newFaqStates = [...prevState];
      newFaqStates[index] = !newFaqStates[index];
      return newFaqStates;
    });
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof categoriesSchema>) => {
    try {
      await editHomeLayout({
        categories: values.categories,
        type: "Categories",
      });
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  // Display toast messages on form submission status changes
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "FAQs successfully edited";
      toast.success(message);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [isSuccess, data, error]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 min-h-[87vh] mt-14"
      >
        <div className="space-y-4">
          <h2 className="py-2.5 text-center lg:font-bold lg:text-14">
            Add More Categories
          </h2>
          {fields.map((faq, index) => (
            <div key={faq.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3>{`Category ${index + 1}`}</h3>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => toggleFaqCollapse(index)}
                >
                  {categoryState[index] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {categoryState[index] && (
                <div className="space-y-4 mt-2">
                  <FormField
                    control={control}
                    name={`categories.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ title: "" })}
          >
            Add +
          </Button>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default Categories;
