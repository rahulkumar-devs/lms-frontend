import { IconType } from "react-icons/lib";
import { z } from "zod";

// Define the Zod schemas
const linkSchema = z.object({
  title: z.string().nonempty("Link title is required"),
  url: z.string().url("Invalid URL"),
});

export const courseInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  estimatedPrice: z.string(),
  tags: z.string(),
  level: z.string(),
  demoUrl: z.string(),
  thumbnail:z.any(),
});

const courseContentSchema = z.object({
  videoUrl: z.string().url("Invalid video URL"),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  links: z.array(linkSchema),
  suggestion: z.string().optional(),
});

const benefitsSchema = z.array(
  z.object({
    title: z.string().nonempty("Benefit title is required"),
  })
);

const prerequisitesSchema = z.array(
  z.object({
    title: z.string().nonempty("Prerequisite title is required"),
  })
);

export const courseDataSchema = z.object({
  active: z.number(),
  benefits: benefitsSchema,
  prerequisites: prerequisitesSchema,
  courseContentData: z.array(courseContentSchema),
});

// Define TypeScript types based on Zod schemas
export type Link = z.infer<typeof linkSchema>;
export type CourseContent = z.infer<typeof courseContentSchema>;
export type CourseInfoData = z.infer<typeof courseInfoSchema>;
export type Benefits = z.infer<typeof benefitsSchema>;
export type Prerequisites = z.infer<typeof prerequisitesSchema>;
export type ZodCourseData = z.infer<typeof courseDataSchema>;



