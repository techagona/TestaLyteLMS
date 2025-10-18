import z from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archive"];

export const courseCategory = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be atlease 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be atleast 3 characters long" }),
  fileKey: z.string().min(1, { message: "File is required!" }),
  price: z.coerce
    .number()
    .int()
    .min(1, { message: "Price must be a positive number and atlease 1" }),
  duration: z.coerce
    .number()
    .int()
    .min(1, { message: "Duration must be atleast 1 hour long" })
    .max(500, { message: "Duration must be not exceed 500 hour long" }),
  level: z.enum(courseLevels, { message: "Level is required" }),
  category: z.enum(courseCategory, { message: "Category is required" }),
  smallDescription: z
    .string()
    .min(3, { message: "Small description must be atleast 3 characters long" })
    .max(200, {
      message: "Small description must not exceed 200 characters long",
    }),
  slug: z
    .string()
    .min(3, { message: "Slug must be atleast 3 characters long" }),
  status: z.enum(courseStatus, { message: "Status is required!" }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
