import { BoxProps as Props } from '...';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
};

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
  
const getPriority = (blockchain: string) => {
  switch (blockchain) {
    case 'Osmosis': return 100;
    case 'Ethereum': return 50;
    case 'Arbitrum': return 30;
    case 'Zilliqa': return 20;
    case 'Neo': return 20;
    default: return -99;
  }
}

const getBalancesByPriority = (balances: WalletBalance[]) => {
  const filteredBalances = balances.filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount <= 0);
  return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) return -1;
    else if (leftPriority < rightPriority) return 1;
    return 0;
  });
};

const WalletRows = memo(({ formattedBalances } : { formattedBalances: FormattedWalletBalance[] }) => {
  const prices = usePrices();
  return <>
    {formattedBalances.map((balance: FormattedWalletBalance, index: number) => (
      <WalletRow
        key={index}
        className={classes.row}
        amount={balance.amount}
        usdValue={prices[balance.currency] * balance.amount}
        formattedAmount={balance.formatted}
      />
    ))}
  </>;
})

const WalletPage = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const sortedBalances = useMemo(() => getBalancesByPriority(balances), [balances]);
  const formattedBalances = useMemo(() => sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    };
  }));

  return (
    <div {...rest}>
      <WalletRows formattedBalances={formattedBalances} />
    </div>
  )
};