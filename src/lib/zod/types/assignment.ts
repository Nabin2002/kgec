import { assignmentSchema } from "../schemas";
import { z } from "zod";

export type assignmentType = z.infer<typeof assignmentSchema>;