import type { Plugin } from "@elizaos/core-plugin-v1";

import { noneAction } from "./actions/none.ts";

import { factEvaluator } from "./evaluators/fact.ts";
import { storeNumberAction } from "./actions/set.ts";
import { investInterestAction } from "./actions/interestRate.ts";
import { factsProvider } from "./providers/facts.ts";

export * as actions from "./actions";
export * as evaluators from "./evaluators";
export * as providers from "./providers";

export const web3Plugin: Plugin = {
    name: "web3",
    description:
        "Agent actions of interacting with smart contracts on avalanche fuji",
    actions: [storeNumberAction, investInterestAction],
};
export default web3Plugin;
