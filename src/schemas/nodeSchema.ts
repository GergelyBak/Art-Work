import { z } from 'zod';

export const NoteSchema = z
  .string()
  .max(200, 'Note cannot exceed 200 characters')
  .optional();
