import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem, run as hardhatRun } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

before(async function () {
  await hardhatRun("compile");
});

const PROPOSALS = ["Chocolate Mint", "Matheus", "Encode Club Sandwich"];

async function deployContract() {
  const publicClient = await viem.getPublicClient();
  const [
    deployer,
    otherAccount,
    otherSecondAccount,
    thirdAccount,
    forthAccount,
    fifthAccount,
  ] = await viem.getWalletClients();
  const ballotContract = await viem.deployContract("tokenizedBallot", [
    PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    deployer.account.address,
    1,
  ]);
  return {
    publicClient,
    deployer,
    otherAccount,
    otherSecondAccount,
    thirdAccount,
    forthAccount,
    fifthAccount,
    ballotContract,
  };
}

describe("TokenizedBallot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = (await ballotContract.read.proposals([
          BigInt(index),
        ])) as `0x${string}`[];
        expect(hexToString(proposal[0], { size: 32 })).to.eq(PROPOSALS[index]);
      }
    });
  });
});
