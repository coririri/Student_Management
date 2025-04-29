const gradeTable = {
  0: "초1",
  1: "초2",
  2: "초3",
  3: "초4",
  4: "초5",
  5: "초6",
  6: "중1",
  7: "중2",
  8: "중3",
  9: "고1",
  10: "고2",
  11: "고3",
};

export const gradeTransform = (
  gradeNumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
) => {
  return gradeTable[gradeNumber];
};
