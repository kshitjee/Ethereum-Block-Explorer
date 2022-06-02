// check if block, tx, smart contract etc, then render page accordingly
export default function PublicAddressResults(props) {
  console.log(props.publicAddressInfo);
  return (
    <table>
      <tbody>
        <tr>
          <td>Balance</td>
          <td>{props.publicAddressInfo.balance}</td>
        </tr>
      </tbody>
    </table>
  );
}
