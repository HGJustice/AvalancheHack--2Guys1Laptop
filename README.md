# Snow

**Nigel, your Web3 DeFi AI Companion on Telegram**

Snow is a Telegram-based AI agent built to onboard DeFi newbies and help them make **smart and safe investments** in the Web3 world. Nigel—the personality behind Snow—runs on ElizaOS and leverages real-time market sentiment data from **Chainlink** to guide users through the AVAX C-Chain (starting with Fuji testnet).

---

## Features

- **Conversational AI**: Nigel uses ElizaOS to assist users in a friendly and approachable way, directly via Telegram.
- **DeFi Coach**: Nigel suggests optimal liquidity pools based on market conditions, APY, and risk.
- **Market-Aware**: Integrates with **Chainlink's Fear and Greed Index** to assess sentiment and adjust strategies accordingly.
- **Smart Contracts**: Custom LP contracts on Fuji testnet simulate real DeFi investment environments.
- **Autonomous Strategy**: Nigel calculates the best pool and reallocates funds when market conditions change.
- **Cross-Chain Ready**: Architecture designed to scale to other chains using Chainlink CCIP and ICM.

---

## How it Works

![1000005713](https://github.com/user-attachments/assets/1854005e-149c-476f-8404-1c7ca1f21aac)

Nigel connects various decentralized components to provide intelligent, real-time investment advice:

1. **Fetch Market Sentiment**:
   - A Chainlink oracle fetches the **Fear and Greed Index** from off-chain data.
   - The index value is stored on-chain in a dedicated smart contract.

2. **Analyze Pools**:
   - Nigel considers a list of LP pools with:
     - **APY** (Annual Percentage Yield)
     - **Risk Rating** (1 for stable-stable, <1 for stable-alt)
   - Nigel dynamically adjusts preferences:
     - **Greed (High Index)**: Boost preference for **stable-stable** pools.
     - **Fear (Low Index)**: Boost preference for **altcoin** exposure.
     - **Rising Index**: Increase allocation to **alts** (FOMO behavior).
     - **Falling Index**: Shift toward **stables** (capital preservation).

3. **Decision Making**:
   - Nigel computes a **weighted score** per pool:
     ```
     Score = APY * Risk Ratio * Sentiment Adjustment
     ```
   - Funds are allocated to the pool with the highest score.
   - If market sentiment shifts, Nigel triggers **rebalancing**.

---

## Chainlink Integration: Fear and Greed Index

A central feature of Snow is its use of the **Fear and Greed Index**, provided via Chainlink's decentralized oracle network:

- Nigel reads the current sentiment from an on-chain **FearAndGreed contract**, which gets updated via Chainlink feeds.
- The contract stores:
  - The latest index value (0–100)
  - A timestamp
  - Historical trend (to track rising/falling sentiment)

This sentiment directly influences investment logic:

- **Low index** (fear): Favor riskier assets with potential upside.
- **High index** (greed): Prefer safer, stable options.
- **Trending Up**: Nigel assumes FOMO and tilts toward alts.
- **Trending Down**: Nigel hedges in stables to preserve capital.

---

## MVP Scope (Hackathon Deliverable)

In the 2-day hackathon, we focused on building a working MVP with:

- Telegram bot with ElizaOS integration (Olaf).
- On-chain Chainlink-powered Fear and Greed index (on Fuji).
- Two fake LP contracts with dummy APY and types (stable/stable vs stable/alt).
- Nigel’s decision-making logic that:
  - Reads the current index.
  - Calculates adjusted scores for each LP.
  - Invests in the best pool.
  - Rebalances when the index changes.

---

## Future Plans

- **Full Cross-Chain Deployment**: Expand from Fuji to Ethereum Sepolia via Chainlink CCIP and other Avax L1 like Dexalot with ICM.
- **Real LP Integration**: Pull live APYs and risks from DeFi protocols.
- **On-Chain Governance**: Let users vote on Nigel’s behavior models.
- **Portfolio Tracking**: Telegram-based dashboard for holdings and performance.
- **Auto-Staking**: Let Nigel auto-stake/reinvest yields.

---

## Tech Stack

- **AI**: ElizaOS
- **Blockchain**: Avalanche Fuji, Chainlink Oracles, Custom Solidity Contracts
- **Telegram Bot**: Node.js (Typescript)
- **Chainlink CCIP & ICM**: For cross-chain interactions (coming soon)

---

## Team

Built with love and caffeine by 2Guys1Laptop at Avalanche Hackaton London 2025.
