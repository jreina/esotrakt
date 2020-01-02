import { Token } from "./models/Token";

export function tokenize(contents: string): Array<Token> {
    return contents.split('\n')
        .map(x => x.split('::'))
        .map(([op, m1, m2]) => [op, m1, m2] as Token);
}