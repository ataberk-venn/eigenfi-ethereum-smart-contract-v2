# EigenFiPool 

Lock ERC-20 token for a pre-defined amount of time

---

## Contract

A contract for locking balances of a designated ERC-20 token for a pre-defined amount of time.

1. **Deposit period:** Anyone can deposit the designated token, receiving an equivalent balance of non-transferrable lock claim token. Withdrawals are possible.
2. **Lock period:** No more deposits and withdrawals are possible.
3. **After the lock period:** Tokens can be withdrawn in redemption for lock claim tokens.

### Setup

#### Configuration

The contract is initialized with the following set of parameters:

- `_signer`: Address of the signer
- `tokenAddress`: Address of the token to lock
- `unlockTimePoolOfMarket`: Lock of pool market duration in seconds, period starts after the deployment
- `unlockTimePoolOfEmployments`: Lock of pool employments duration in seconds, period starts after the deposit deadline

---

## License

Created under the [MIT license](LICENSE).
