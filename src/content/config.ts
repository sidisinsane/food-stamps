import * as iso3166 from "@lunaticmuch/iso-3166";
import { defineCollection, z } from "astro:content";

const countryCodes = iso3166
  .country()
  .map((obj: { alpha2: string }) => obj.alpha2);

type RegionCodeType = "APAC" | "EMEA" | "NA" | "LATAM";
const regionCodes: RegionCodeType[] = ["APAC", "EMEA", "NA", "LATAM"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recipeCuisineCodes: any = [...countryCodes, ...regionCodes];

const food = defineCollection({
  schema: z.object({
    title: z.string(),
    name: z.string(),
    // "en-CA" (Canadian English) formats to YYYY-MM-DD
    datePublished: z.string().transform((str) =>
      new Intl.DateTimeFormat("en-CA", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }).format(new Date(str)),
    ),
    // zod enum iso 2 codes
    recipeCuisine: z.enum(recipeCuisineCodes).optional(),
    recipeCategory: z.string().optional(),
    url: z.string().url().optional(),
    tool: z.array(
      z.object({
        name: z.string(),
        requiredQuantity: z.number(),
      }),
    ),
    supply: z
      .array(
        z.object({
          name: z.string(),
          requiredQuantity: z.object({
            value: z.number(),
            unitCode: z.string().optional(),
          }),
        }),
      )
      .optional(),
  }),
});

export const collections = { food };
