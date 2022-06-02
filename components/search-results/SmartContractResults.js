// check if block, tx, smart contract etc, then render page accordingly
export default function SmartContractResults(props) {
  console.log(props.smartContractInfo);
  return (
    <table>
      <tbody>
        <tr>
          <td>Smart Contract Code</td>
          <td>{props.smartContractInfo.contractCode}</td>
        </tr>
        <tr>
          <td>Contract Balance</td>
          <td>{props.smartContractInfo.contractBalance.hex}</td>
        </tr>
      </tbody>
    </table>
  );
}
