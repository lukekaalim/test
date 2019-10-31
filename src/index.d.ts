export declare type Assertion = {
  expectationDescription: string,
  matchedExpectation: boolean,
  childAssertions: Assertion[],
};

export declare function assert(expectationDescription: string, matchedExpectation: boolean | Assertion[]): Assertion
export declare var createAssertion: typeof assert;

export declare function colorReporter(assertion: Assertion): string;
export declare function booleanReporter(assertion: Assertion): boolean;
export declare function emojiReporter(assertion: Assertion): string;
export declare function unicodeReporter(assertion: Assertion): string;
export declare function exitCodeReporter(assertion: Assertion): number;
