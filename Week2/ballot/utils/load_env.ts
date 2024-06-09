import * as dotenv from "dotenv";
dotenv.config();

import {
  mnemonicToAccount,
  privateKeyToAccount,
  PrivateKeyAccount,
  HDAccount,
} from "viem/accounts";

export function load_account_from_env(): PrivateKeyAccount | HDAccount {
  const mnemonic = process.env.MNEMONIC;
  const privateKey = process.env.PRIVATE_KEY;
  if (mnemonic) {
    return mnemonicToAccount(mnemonic, { accountIndex: 0 });
  } else if (privateKey) {
    return privateKeyToAccount(`0x${privateKey}`);
  } else {
    throw new Error(
      "Couldn't find either MNEMONIC or PRIVATE_KEY in your .env"
    );
  }
}

export type API = {
  apiKey: string | null;
  url: string;
};

export function load_api_sepolia(): API {
  const alchemy = process.env.ALCHEMY_API_KEY;
  const infura = process.env.INFURA_API_KEY;

  if (alchemy) {
    return {
      apiKey: alchemy,
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemy}`,
    };
  } else if (infura) {
    return {
      apiKey: infura,
      url: `https://sepolia.rpc.grove.city/v1/${infura}`,
    };
  }

  return {
    apiKey: null,
    url: "https://ethereum-sepolia-rpc.publicnode.com",
  };
}
