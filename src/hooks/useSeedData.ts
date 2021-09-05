import React from "react";
import range from "lodash/range";
import faker from "faker";
import { MemoStatus } from "../models/MemoStatus";
import { addHours } from "date-fns";
import { MemosContext } from "../contexts/MemosContext";

export const useSeedData = (numOfItems: number = 20) => {
  const { addOne, deleteAll } = React.useContext(MemosContext);

  const seedData = React.useCallback(() => {
    deleteAll();
    range(numOfItems).forEach(() => {
      const status = faker.datatype.boolean()
        ? MemoStatus.Active
        : MemoStatus.Complete;
      const tags = range(faker.datatype.number(5)).map(() =>
        faker.hacker.noun()
      );
      const hasDate = faker.datatype.boolean();
      const startAt = hasDate ? faker.date.soon(2, new Date()) : null;
      const endAt = startAt ? addHours(startAt, 1) : null;

      addOne({
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(5),
        description: faker.lorem.paragraphs(2),
        status,
        tags,
        startAt,
        endAt,
      });
    });
  }, [addOne, deleteAll, numOfItems]);

  return { seedData };
};
