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
import { useEditHomeLayoutMutation, useGetHomeLayoutQuery } from "@/redux/layout/layoutApi";
import toast from "react-hot-toast";

// Define schema for FAQs
const editHeroSchema = z.object({
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

const Faqs = () => {
  const [faqStates, setFaqStates] = useState<boolean[]>([]);
  const [editHomeLayout, { isLoading, isSuccess, error, data }] = useEditHomeLayoutMutation();
  const { data: fetchData, isLoading: isFetching, isSuccess: isFetched } = useGetHomeLayoutQuery("FAQS");

  // Initialize form with default values from API
  // console.log(fetchData.data)
  const form = useForm<z.infer<typeof editHeroSchema>>({
    resolver: zodResolver(editHeroSchema),
    defaultValues: {
      faqs: fetchData?.data?.faqs?.map((item: any) => ({
        question: item.question || "",
        answer: item.answer || "",
      })) || [{question:"",answer:""}],
    },
  });
       
  

  const { control, handleSubmit,reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });
  console.log(fields)  
   
  // Toggle FAQ item collapse state
  const toggleFaqCollapse = (index: number) => {
    setFaqStates((prevState) => {
      const newFaqStates = [...prevState];
      newFaqStates[index] = !newFaqStates[index];
      return newFaqStates;
    });
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof editHeroSchema>) => {
    try {
      await editHomeLayout({ faqs: values.faqs, type: "FAQS" });
    } catch (error) {
      console.error("Error editing FAQs:", error);
    }
  };

  // Display toast messages on form submission status changes
  useEffect(() => {
    if (fetchData && fetchData.data) {
      reset({
        faqs:
          fetchData.data.categories?.map((item: any) => ({
            title: item.title || "",
          })) || [{ title: "" }],
      });
      setFaqStates(new Array(fetchData.data.categories.length).fill(false)); // Initialize FAQ states
    }
  }, [fetchData, reset]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 min-h-[87vh] mt-14">
        <div className="space-y-4">
          <h2 className="py-2.5 text-center lg:font-bold lg:text-14">Frequently Asked Questions</h2>
          {fields.map((faq, index) => (
            <div key={faq.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h3>{`FAQ ${index + 1}`}</h3>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => toggleFaqCollapse(index)}
                >
                  {faqStates[index] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {faqStates[index] && (
                <div className="space-y-4 mt-2">
                  <FormField
                    control={control}
                    name={`faqs.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faq Question</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`faqs.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faq Answer</FormLabel>
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
            onClick={() => append({ question: "", answer: "" })}
          >
            Add FAQ
          </Button>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default Faqs;
