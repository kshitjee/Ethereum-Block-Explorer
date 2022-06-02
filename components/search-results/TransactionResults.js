// check if block, tx, smart contract etc, then render page accordingly
export default function TransactionResults(props) {
  console.log(props.transactionInfo);
  return (
    <table>
      <tbody>
        <tr>
          <td>Transaction Hash</td>
          <td>{props.transactionInfo.transaction.hash}</td>
        </tr>
        <tr>
          <td>From</td>
          <td>{props.transactionInfo.transaction.from}</td>
        </tr>
        <tr>
          <td>To</td>
          <td>{props.transactionInfo.transaction.to}</td>
        </tr>
      </tbody>
    </table>
  );
}
