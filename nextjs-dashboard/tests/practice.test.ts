import { expect, it } from "vitest";
import { questions } from "../public/practice/questions.mjs";

const approvedStems = /^(paska|saatana|helvet|perkele)/i;

it.each(questions)("provides one keyed answer for $sentence", (question) => {
  expect(question.sentence.match(/________/g)).toHaveLength(1);
  expect(new Set(question.options).size).toBe(3);
  expect(question.options.filter((option) => option === question.answer)).toHaveLength(1);
});

it("uses forms from the four approved vocabulary families", () => {
  const vocabulary = questions.flatMap(({ options }) => options);
  expect(vocabulary.every((option) => approvedStems.test(option))).toBe(true);
  expect(new Set(vocabulary.map((option) => approvedStems.exec(option)?.[0].toLowerCase())).size).toBe(4);
});
