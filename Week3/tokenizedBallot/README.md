# Run scripts

For hardhat scripts:
(remove --network argument for local, or put localhost instead of sepolia if you want to test it in local)

```bash
npx hardhat run ./scripts/<Script.ts> --network sepolia
```

For viem scripts:

```bash
npx ts-node --files ./scripts/<Script.ts> args1 args2...
```
