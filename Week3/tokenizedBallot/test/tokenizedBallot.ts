import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem, run as hardhatRun } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import { GetContractReturnType } from "@nomicfoundation/hardhat-viem/types";
import { ArtifactsMap } from "hardhat/types/artifacts";

type TokenizedBallot = GetContractReturnType<
  ArtifactsMap["TokenizedBallot"]["abi"]
>;

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
  return {
    publicClient,
    tokenContract,
    deployer,
    otherAccount,
    otherSecondAccount,
    thirdAccount,
    forthAccount,
    fifthAccount,
  };
}

async function deployBallotContract(
  blockNumber: number,
  tokenContractAddress: `0x${string}`
) {
  const tokenizedBallotContract = (await viem.deployContract(
    "TokenizedBallot",
    [
      PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
      tokenContractAddress,
      blockNumber,
    ]
  )) as any as TokenizedBallot;

  return tokenizedBallotContract;
}

describe("TokenizedBallot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
      const { tokenContract } = await loadFixture(deployContract);
      const tokenizedBallotContract = await deployBallotContract(
        0,
        tokenContract.address
      );
      for (let index = 0; index < PROPOSALS.length; index++) {
        const proposal = await tokenizedBallotContract.read.proposals([
          BigInt(index),
        ]);
        expect(hexToString(proposal[0], { size: 32 })).to.eq(PROPOSALS[index]);
      }
    });
  });
});
