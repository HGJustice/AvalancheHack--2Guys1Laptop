import type {
    ActionExample,
    IAgentRuntime,
    Memory,
    Action,
    HandlerCallback,
} from "@elizaos/core-plugin-v1";

import { createWalletClient, http } from "viem";
import { avalancheFuji } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import StorageABI from "../ABI/storage.json";

async function updateContract(_num: number) {
    const account = privateKeyToAccount(
        process.env.PRIVATE_KEY as `0x${string}`
    );

    const client = createWalletClient({
        account,
        chain: avalancheFuji,
        transport: http(process.env.PROVIDER),
    });

    const hash = await client.writeContract({
        address: process.env.CONTRACT_ADDRESS as `0x${string}`,
        abi: StorageABI,
        functionName: "store",
        args: [BigInt(_num)],
    } as any);

    return { hash };
}

export const storeNumberAction: Action = {
    name: "STORE_NUMBER",
    similes: ["STORE_VALUE", "SET_VALUE", "SAVE_NUMBER", "PUT_NUMBER"],
    description:
        "Stores a number in the Storage smart contract when user requests it",

    validate: async (_runtime: IAgentRuntime, message: Memory) => {
        return true;
    },

    handler: async (
        _runtime: IAgentRuntime,
        message: Memory,
        _state?: any,
        _options?: any,
        callback?: HandlerCallback
    ): Promise<boolean> => {
        let hash = await updateContract(42);
        console.log({ hash });
        return true;
    },

    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Can you store the number 42 in the contract?",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Storing the number 42 in the smart contract. Please wait while I process the transaction...",
                    action: "STORE_NUMBER",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Set the storage value to 100" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Storing the number 100 in the smart contract. Please wait while I process the transaction...",
                    action: "STORE_NUMBER",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: { text: "Save 777 to the blockchain" },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "Storing the number 777 in the smart contract. Please wait while I process the transaction...",
                    action: "STORE_NUMBER",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
