// types.d.ts
import {
  answerSchema,
  questionSchema,
  subjectSchema,
  testResultSchema,
  testSchema,
  testTypeSchema,
  yearSchema,
} from "@/schemas/cbt";
import { z } from "zod";

declare global {
  type Year = z.infer<typeof yearSchema>;

  type Years = Year[];

  type Testtype = z.infer<typeof testTypeSchema>;

  type Testtypes = Testtype[];

  type Answer = z.infer<typeof answerSchema>;

  type Answers = Answer[];

  type Question = z.infer<typeof questionSchema>;

  type Questions = Question[];

  type Subject = z.infer<typeof subjectSchema>;

  type Subjects = Subject[];

  type Test = z.infer<typeof testSchema>;

  type Tests = Test[];

  type Testresult = z.infer<typeof testResultSchema>;

  type Testresulls = Testresult[];
}

export {};
