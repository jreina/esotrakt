import { tokenize } from "./tokenize";
import { operators, operatorKeys } from "./tokens";



function parse(contents: string) {
  const tokens = tokenize(contents);
  const refs = tokens.filter(([op]) =>
    operators[operatorKeys.ref].includes(op)
  );
}
