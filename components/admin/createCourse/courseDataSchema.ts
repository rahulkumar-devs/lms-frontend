import { z } from "zod";


export const courseInfoSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.any(),
  estimatedPrice: z.any(),
  tags: z.string(),
  level: z.string(),
  demoVideo: z.any(),
  thumbnail: z.any(),
});





export type CourseInfoData = z.infer<typeof courseInfoSchema>;




export interface courseContentSchema {
  videoUrl: string,
  title: string;
  description: string;
  links: { title: string, url: string }[];
  videoSection: string;
  suggestion?: string;

}



