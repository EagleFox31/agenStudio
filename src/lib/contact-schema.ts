import { z } from 'zod';

export const TIMELINE_IDS = ['asap', '1_3m', '3_6m', 'tbd'] as const;
export type TimelineId = (typeof TIMELINE_IDS)[number];

export const ContactPayload = z
  .object({
    name: z.string().trim().min(2, 'name_too_short').max(120, 'name_too_long'),
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
    timeline: z.enum(TIMELINE_IDS).optional().default('tbd'),
    lang: z.enum(['fr', 'en']).default('fr'),
    hp_confirm: z.string().max(200).optional().default(''),
    turnstileToken: z.string().max(4096).optional().default(''),
  })
  .strict();

export type ContactPayloadType = z.infer<typeof ContactPayload>;

export type ContactFieldError = {
  pointer: string;
  code: string;
};

export function contactFieldErrors(error: z.ZodError): ContactFieldError[] {
  return error.issues.map((issue) => ({
    pointer: `/${issue.path.join('/')}`,
    code: issue.message,
  }));
}

export const CONTACT_FIELD_IDS = ['name', 'email', 'company', 'problem'] as const;
export type ContactFieldId = (typeof CONTACT_FIELD_IDS)[number];

export function fieldIdFromPointer(pointer: string): ContactFieldId | null {
  const id = pointer.replace(/^\//, '').split('/')[0];
  return (CONTACT_FIELD_IDS as readonly string[]).includes(id)
    ? (id as ContactFieldId)
    : null;
}
