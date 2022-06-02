import { useRouter } from "next/router";
import BlockResults from "../../components/search-results/BlockResults";
import TransactionResults from "../../components/search-results/TransactionResults";
import PublicAddressResults from "../../components/search-results/PublicAddressResults";
import SmartContractResults from "../../components/search-results/SmartContractResults";
import { useState } from "react";
import { useEffect } from "react";

export default function searchResults() {
  const [fetchedInfo, setFetchedInfo] = useState([]);
  const { asPath } = useRouter();

  useEffect(() => {
    fetch("api/explorerData", {
      method: "POST",
      body: JSON.stringify({ userInput: asPath }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFetchedInfo(data);
      });
  }, []);

  //   console.log(fetchedInfo);

  if (typeof fetchedInfo.block != "undefined") {
    return <BlockResults blockInfo={fetchedInfo} />;
  } else if (typeof fetchedInfo.transaction != "undefined") {
    return <TransactionResults transactionInfo={fetchedInfo} />;
  } else if (typeof fetchedInfo.history != "undefined") {
    return <PublicAddressResults publicAddressInfo={fetchedInfo} />;
  } else if (typeof fetchedInfo.contractCode != "undefined") {
    return <SmartContractResults smartContractInfo={fetchedInfo} />;
  } else {
    return null;
  }
}
