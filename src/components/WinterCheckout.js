import React, { useEffect, useState } from "react";

const WinterCheckout = ({
  onSuccess,
  onClose,
  projectId,
  showModal,
  walletAddress,
  email,
  mintQuantity,
  erc1155Video,
  title,
  brandImage,
  extraMintParams,
  priceFunctionParams,
  production,
  testnet,
}) => {
  const [projectUrl, setProjectUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowEvent = (e) => {
        const { data } = e;
        if (data === "closeWinterCheckoutModal") {
          onClose?.();
        } else if (data.name === "successfulWinterCheckout") {
          onClose?.();
          const {
            transactionhash,
            email,
            nftQuantity,
            amountUSD,
            nftTokenIds,
            nftUrls,
            openseaUrls,
          } = data;
          onSuccess?.(
            transactionhash,
            email,
            nftQuantity,
            amountUSD,
            nftTokenIds,
            nftUrls,
            openseaUrls
          );
        }
      };
      window.addEventListener("message", handleWindowEvent);
      return () => window.removeEventListener("message", handleWindowEvent);
    }
  }, [onClose, onSuccess]);

  useEffect(() => {
    let queryString = "projectId=" + projectId;
    if (walletAddress != null) {
      queryString += "&walletAddress=" + walletAddress;
    }
    if (email != null) {
      queryString += "&email=" + email;
    }
    if (mintQuantity != null) {
      queryString += "&mintQuantity=" + mintQuantity;
    }
    if (erc1155Video != null) {
      queryString += "&erc1155Video=" + erc1155Video;
    }
    if (title != null) {
      queryString += "&title=" + title;
    }
    if (brandImage) {
      queryString += `&brandImage=${brandImage}`;
    }
    if (extraMintParams != null) {
      queryString += `&extraMintParams=${encodeURIComponent(
        JSON.stringify(extraMintParams)
      )}`;
    }
    if (priceFunctionParams != null) {
      queryString += `&priceFunctionParams=${encodeURIComponent(
        JSON.stringify(priceFunctionParams)
      )}`;
    }

    const url = production
      ? "https://checkout.usewinter.com/?" + queryString
      : testnet === "goerli"
      ? "https://goerli-sandbox-checkout.onrender.com/?" + queryString
      : "https://sandbox-winter-checkout.onrender.com/?" + queryString;
    setProjectUrl(url);
  }, [
    projectId,
    production,
    walletAddress,
    email,
    mintQuantity,
    extraMintParams,
    priceFunctionParams,
    title,
    erc1155Video,
    brandImage,
    title,
  ]);

  return showModal ? (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe id="winter-checkout" src="${projectUrl}" style="position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;" />`,
      }}
    />
  ) : (
    <></>
  );
};

export default WinterCheckout;
