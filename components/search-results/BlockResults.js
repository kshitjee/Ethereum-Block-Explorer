// check if block, tx, smart contract etc, then render page accordingly
export default function BlockResults(props) {
  // console.log(props.blockInfo);
  return (
    <table>
      <tbody>
        <tr>
          <td>Block Height</td>
          <td>{props.blockInfo.block.number}</td>
        </tr>
        <tr>
          <td>Time Stamp</td>
          <td>{props.blockInfo.block.timestamp}</td>
        </tr>
        <tr>
          <td>Mined By</td>
          <td>{props.blockInfo.block.miner}</td>
        </tr>
      </tbody>
    </table>
  );
}
