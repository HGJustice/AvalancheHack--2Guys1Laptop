import type {
    ActionExample,
    IAgentRuntime,
    Memory,
    Action,
    HandlerCallback,
} from "@elizaos/core-plugin-v1";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { avalancheFuji } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import Contract1ABI from "../ABI/contract1.json";
import Contract2ABI from "../ABI/contract2.json";

let listContracts = [process.env.CONTRACT1, process.env.CONTRACT2];

let ContractABIMap = new Map([
    [process.env.CONTRACT1, Contract1ABI],
    [process.env.CONTRACT2, Contract2ABI],
]);

function getMultiplier(index, lpType): number {
    if (lpType == "stable") {
        if (index > 50) {
            return 1;
        }
        return 3;
    }
    if (index > 50) {
        return 2;
    }
    return 0.8;
}

async function analyseAndProcess() {
    const account = privateKeyToAccount(
        process.env.PRIVATE_KEY as `0x${string}`,
    );
    const publicClient = createPublicClient({
        chain: avalancheFuji,
        transport: http(process.env.PROVIDER),
    });
    const client = createWalletClient({
        account,
        chain: avalancheFuji,
        transport: http(process.env.PROVIDER),
    });
    let indexConsumerContract = process.env.CONTRACT1;
    const updateIndex = await client.writeContract({
        address: indexConsumerContract as `0x${string}`,
        abi: ContractABIMap.get(indexConsumerContract),
        functionName: "sendRequest",
        args: [],
    } as any);
    const currentIndex = await publicClient.readContract({
        address: indexConsumerContract as `0x${string}`,
        abi: ContractABIMap.get(indexConsumerContract),
        functionName: "index",
    } as any);
    //compare find highest
    let bestContract = listContracts[0];
    let bestRate = 0;
    for (var contract of listContracts) {
        console.log(contract);
        console.log(ContractABIMap.get(contract));
        const interestRate = await publicClient.readContract({
            address: contract as `0x${string}`,
            abi: ContractABIMap.get(contract),
            functionName: "interestRate",
        } as any);
        const lpType = await publicClient.readContract({
            address: contract as `0x${string}`,
            abi: ContractABIMap.get(contract),
            functionName: "lpType",
        } as any);
        console.log(interestRate);

        let interestRateNb =
            Number(interestRate) * getMultiplier(Number(currentIndex), lpType);
        if (interestRateNb > bestRate) {
            bestRate = interestRateNb;
            bestContract = contract;
        }
    }

    // send x tokens to the highest contract
    const hash = await client.sendTransaction({
        to: bestContract as `0x${string}`,
        value: parseEther("0.02"), // Convert string like "0.1" to wei
    } as any);
    return { hash };
}

export const investInterestAction: Action = {
    name: "INVEST_INTEREST",
    similes: [
        "INVEST",
        "INTEREST_RATE",
        "LOOK_FOR",
        "BEST_RATE",
        "COMPARE_INTEREST",
    ],
    description:
        "Will analyse both smart contracts and send tokens to the contract with highest interest",

    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        return true;
    },

    handler: async (
        _runtime: IAgentRuntime,
        message: Memory,
        _state?: any,
        _options?: any,
        callback?: HandlerCallback,
    ): Promise<boolean> => {
        let hash = await analyseAndProcess();
        console.log({ hash });
        return true;
    },

    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you find the best interest rate and invest my tokens?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "I'll analyze both contracts to find the highest interest rate and invest your tokens there. Let me check the rates...",
                    action: "INVEST_INTEREST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Compare interest rates and invest in the better one",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Comparing interest rates between the two contracts. I'll send your tokens to whichever offers the best return...",
                    action: "INVEST_INTEREST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Look for the highest interest rate and invest there",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Analyzing contracts for the highest interest rate. Once I find the best option, I'll invest your tokens automatically.",
                    action: "INVEST_INTEREST",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Which contract has better returns? Invest my money there",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Checking both contracts for the best returns. I'll compare interest rates and invest in the contract with higher yield.",
                    action: "INVEST_INTEREST",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
