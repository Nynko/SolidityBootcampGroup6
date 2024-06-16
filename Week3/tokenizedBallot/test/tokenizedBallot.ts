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
  const tokenContract = await viem.deployContract("MyToken");
  const tokenizedBallotContract = await viem.deployContract("TokenizedBallot", [
    PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    tokenContract.address,
    0,
  ]);
  return {
    publicClient,
    deployer,
    otherAccount,
    otherSecondAccount,
    thirdAccount,
    forthAccount,
    fifthAccount,
    tokenizedBallotContract,
  };
}

describe("TokenizedBallot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const { tokenizedBallotContract } = await loadFixture(deployContract);
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = (await tokenizedBallotContract.read.proposals([
          BigInt(index),
        ])) as `0x${string}`[];
        expect(hexToString(proposal[0], { size: 32 })).to.eq(PROPOSALS[index]);
      }
    });
  });
});
