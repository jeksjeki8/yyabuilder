import { expect } from "chai";
import { splitAndMark, TaggedStringPart } from "./GenericTextTransformer_funcs";

const splitByCplRegex = /(CODE\d{8})/g;

const exampleString = `alksndmjasdfn CODE00000000 111 lksndlne CODE11111111 2222 slmsdlkmsdlkm MXCD666666 3333 FD55555XC 444`;
const expectedR = [
    { s: `alksndmjasdfn ` },
    { s: `CODE00000000`, t: "cpl", captures: ["00000000"] },
    { s: ` 111 lksndlne ` },
    { s: `CODE11111111`, t: "cpl", captures: ["11111111"] },
    { s: ` 2222 slmsdlkmsdlkm ` },
    { s: `MXCD666666`, t: "mxcd", captures: ["666666"] },
    { s: ` 3333 ` },
    { s: `FD55555XC`, t: "fdxc", captures: ["55555"] },
    { s: ` 444` },
];

describe("GenericTextTransformer_funcs.test.ts", () => {
    it("splitAndMarkFunction", () => {
        const splitAndMarkDict = {
            cpl: /CODE(\d{8})/g,
            mxcd: /MXCD(\d{6})/g,
            fdxc: /FD(\d{5})XC/g,
        };
        const r: TaggedStringPart[] = splitAndMark(exampleString, splitAndMarkDict);

        // Checking BR1, BR2,  BR3
        expect(r).to.deep.equal(expectedR);

        const regeneratedString = r.map((part) => part.s).join("");

        // Checking BR4
        expect(regeneratedString).to.deep.equal(exampleString);
    });
});