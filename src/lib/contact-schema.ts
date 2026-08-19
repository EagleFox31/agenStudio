import { z } from 'zod';

export const ContactPayload = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'name_too_short')
    .max(120, 'name_too_long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('email_invalid')
    .max(200, 'email_too_long'),
  company: z.string().trim().max(200, 'company_too_long').optional().default(''),
  problem: z
    .string()
    .trim()
    .min(20, 'problem_too_short')
    .max(4000, 'problem_too_long'),
  timeline: z.string().trim().max(100).optional().default(''),
  lang: z.enum(['fr', 'en']).default('fr'),
  website: z.string().max(0, 'honeypot').optional().default(''),
  turnstileToken: z.string().min(10, 'turnstile_missing'),
});

export type ContactPayloadType = z.infer<typeof ContactPayload>;
