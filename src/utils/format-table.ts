const moment = require("moment");

const prop = (key: string) => (obj: any): any => obj[key];
const max = (a: number, b: number) => (a > b ? a : b);
const len = (x: string) => x.length;
const asString = (x: any) => x.toString();

function padStart(input: string, num: number, char: string) {
  if (input.length >= num) return input;
  let output = input;
  for (let i = 0; i < num - input.length; i++) output = char + output;
  return output;
}

function padEnd(input: string, num: number, char: string) {
  if (input.length >= num) return input;
  let output = input;
  for (let i = 0; i < num - input.length; i++) output += char;
  return output;
}

function formatRow(
  columnLengths: { [key: string]: number },
  item: string,
  joinChar = " ",
  seperatorChar = "|"
) {
  return Object.entries(item.split("::"))
    .map(([key, value]) =>
      padStart(
        padEnd(asString(value), columnLengths[key], joinChar),
        columnLengths[key] + 1,
        joinChar
      )
    )
    .join(seperatorChar);
}

export default function formatTable(items: Array<string>) {
  const longest = items.reduce(
    (memo, val) =>
      memo > val.split("::").length ? memo : val.split("::").length,
    0
  );
  const columns = Array(longest)
    .fill(0)
    .map((_, i) => i);
  const columnLengths = columns.reduce<{ [key: string]: number }>(
    (memo, val) => {
      memo[val] =
        items
          .map(prop(val.toString()))
          .concat(val)
          .map(toString)
          .map(len)
          .reduce(max) + 1;
      return memo;
    },
    {}
  );

  const rows = items.map(item => formatRow(columnLengths, item));
  const separatorItem = columns.map(_ => '');

  const table = [
    formatRow(columnLengths, ['id', 'dt', 't', 'm'].join("::")),
    formatRow(columnLengths, separatorItem.join("::"), "-", "+"),
    ...rows
  ].join("\n");
  return table;
}
