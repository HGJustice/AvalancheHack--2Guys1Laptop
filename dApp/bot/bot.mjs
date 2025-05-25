import { Bot, Keyboard } from "grammy";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.TELEGRAM_TOKEN);

const userWallets = new Map();
const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_FUJI2);
const airdropWallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const labels = [
  "Create AVAX wallet",
  "Get 0.2 AVAX Airdrop",
  "Display Address",
  "CCIP",
  "ChatBot",
];
const buttonRows = labels.map((label) => [Keyboard.text(label)]);
const keyboard = Keyboard.from(buttonRows);

bot.command("start", async (ctx) => {
  await ctx.reply("Hey please choose one of the following options: ", {
    reply_markup: keyboard,
  });
});

bot.hears("Create AVAX wallet", async (ctx) => {
  try {
    const userId = ctx.from.id;

    // Check if user already has a wallet
    if (userWallets.has(userId)) {
      const wallet = userWallets.get(userId);
      await ctx.reply(
        `✅ You already have a wallet!\n\n` +
          `Address: \`${wallet.address}\`\n\n` +
          `⚠️ Keep your private key safe:\n\`${wallet.privateKey}\``,
        { parse_mode: "Markdown" }
      );
      return;
    }

    // Generate new wallet
    const wallet = ethers.Wallet.createRandom();

    // Store wallet for user
    userWallets.set(userId, {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic?.phrase || null,
    });

    await ctx.reply(
      `🎉 AVAX wallet created successfully!\n\n` +
        `📍 Address: \`${wallet.address}\`\n\n` +
        `🔐 Private Key: \`${wallet.privateKey}\`\n\n` +
        `📝 Mnemonic: \`${wallet.mnemonic?.phrase}\`\n\n` +
        `⚠️ **IMPORTANT**: Save your private key and mnemonic phrase securely! ` +
        `Never share them with anyone. You'll need them to access your wallet.`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("Error creating wallet:", error);
    await ctx.reply("❌ Error creating wallet. Please try again.");
  }
});

bot.hears("Get 0.2 AVAX Airdrop", async (ctx) => {
  try {
    const userId = ctx.from.id;

    if (!userWallets.has(userId)) {
      await ctx.reply("❌ You need a wallet first!");
      return;
    }

    const wallet = userWallets.get(userId);

    await ctx.reply("⏳ Sending 0.2 AVAX...");

    // Send AVAX transaction
    const tx = await airdropWallet.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther("0.2"),
    });

    await tx.wait();

    await ctx.reply(`🎉 Sent 0.2 AVAX to your wallet!\nTx: \`${tx.hash}\``, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Error:", error);
    await ctx.reply("❌ Error sending AVAX.");
  }
});

bot.hears("Display Address", async (ctx) => {
  try {
    const userId = ctx.from.id;

    if (!userWallets.has(userId)) {
      await ctx.reply(
        "❌ You don't have a wallet yet!\n\n" +
          "Please create one first by clicking 'Create AVAX wallet'"
      );
      return;
    }

    const wallet = userWallets.get(userId);

    await ctx.reply(
      `💼 Your AVAX Wallet Address:\n\n` +
        `📍 \`${wallet.address}\`\n\n` +
        `🌐 Network: Avalanche C-Chain`,
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("Error displaying address:", error);
    await ctx.reply("❌ Error retrieving wallet address. Please try again.");
  }
});

bot.hears("CCIP", async (ctx) => {
  await ctx.reply("❌ Didn't have to wire up CCIP to frontend");
});

bot.hears("ChatBot", async (ctx) => {
  await ctx.reply(
    "❌ The telegram eliza plugin was bugging out so couldnt connect"
  );
});

bot.start();
