# Problem 2 - Explanation

### Issue 1 - Line 11: Props Interface

The declaration of the interface `Props` is redudant. There are two cases in this situation:
- If `BoxProps` is already declared earlier, it should be renamed to `Props`.
- If `BoxProps` is imported, it can be shorted to `Props` by using the `as` keyword.
`import { BoxProps as Props } from '...'`

**Refactored version: Line 1**

---

### Issue 2 - Line 14: `React.FC<Props>`

The functional component `WalletPage` can be declared without `React.FC<>`, and `BoxProps` can be replaced with `Props` as stated above.

**Refactored version: Line 50**

---

### Issue 3 - Functions inside `WalletPage`

Whenever `WalletPage` re-renders, functions inside it are redefined though it's unnecessary. Therefore, I moved all of them outside, above the component.

---

### Issue 4 - Line 36: `sortedBalances`

By itself, this variable contains several issues.
- Generally, its content should be split into smaller blocks of code for easier understanding. I fixed this issue in the **Refactored version** by seperating `.filter` and `.sort`.
- The code inside `balances.filter` can be shortened like in **Refactored version: Line 25**.
- For `useMemo`, `prices` as a dependency should be removed as it serves no purpose and may badly affect the performance by re-calculating `sortedBalances`when changed.
- `.blockchain` is undefined, leading to the next issue.

---

### Issue 5 - `WalletBalance`

This interface should additionally declare `blockchain` so that the balances' priorities can be calculated with `getPriority`.

**Refactored version: Line 3**

---

### Issue 6 - `WalletRow`

There are a few problems relating to `WalletRow`
- `rows` are calculated using `sortedBalances` instead of `formatedBalances`, rendering the latter useless.
- Whenever `WalletPage` re-renders, the `rows` variable is re-calculated, lowering performance.

Both can be solved by using `useMemo` and `memo` in conjunction.
- `formattedBalances` can be refactored with `useMemo` to be re-calculated only when `sortedBalances` changes. **Refactored version: Line 54**
- A new functional component `WalletRows`, containing instances of `WalletRow` and the relocated `usePrices` hook, should be defined with `memo` so that its re-rendering is always skipped unless the given props `formattedBalances` changes. **Refactored version: Line 35**

---

### Issue 7 - `FormattedWalletBalance`

As this interface shares some properties with `WalletBalance`, it should extends the interface and declare the additional `formatted` property.

**Refactored version: Line 9**
