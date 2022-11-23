import React, { useEffect, useState } from "react";
import turnOffCookieBlocking from "../images/turnOffCookies.png";

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
  language,
  appearance,
  gentkId,
  assetId,
  contractAddress,
  tokenId,
  fillSource,
  orderSource,
}) => {
  if (window.localStorage.length > 0) {
    const [projectUrl, setProjectUrl] = useState("");

    useEffect(() => {
      if (typeof window !== "undefined") {
        const handleWindowEvent = (e) => {
          const { data } = e;
          if (data === "closeWinterCheckoutModal") {
            onClose?.();
          } else if (data.name === "successfulWinterCheckout") {
            const {
              transactionHash,
              email,
              nftQuantity,
              amountUSD,
              nftTokenIds,
              nftUrls,
              openseaUrls,
            } = data;
            onSuccess?.(
              transactionHash,
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
      let queryString = "";
      if (projectId) {
        queryString += "projectId=" + projectId;
      } else if (contractAddress && tokenId) {
        queryString +=
          "contractAddress=" + contractAddress + "&tokenId=" + tokenId;
      }
      if (walletAddress) {
        queryString += "&walletAddress=" + walletAddress;
      }
      if (email) {
        queryString += "&email=" + email;
      }
      if (mintQuantity) {
        queryString += "&mintQuantity=" + mintQuantity;
      }
      if (fillSource) {
        queryString += `&fillSource=` + fillSource;
      }
      if (orderSource) {
        queryString += `&orderSource=` + orderSource;
      }
      if (erc1155Video) {
        queryString += "&erc1155Video=" + erc1155Video;
      }
      if (title) {
        queryString += "&title=" + title;
      }
      if (language) {
        queryString += "&language=" + language;
      }
      if (brandImage) {
        queryString += `&brandImage=${brandImage}`;
      }
      if (gentkId) {
        queryString += `&gentkId=${gentkId}`;
      }
      if (assetId) {
        queryString += `&assetID=${assetId}`;
      }
      if (extraMintParams) {
        queryString += `&extraMintParams=${encodeURIComponent(
          JSON.stringify(extraMintParams)
        )}`;
      }
      if (priceFunctionParams) {
        queryString += `&priceFunctionParams=${encodeURIComponent(
          JSON.stringify(priceFunctionParams)
        )}`;
      }
      if (appearance) {
        queryString += `&appearance=${encodeURIComponent(
          JSON.stringify(appearance)
        )}`;
      }

      const url = production
        ? "https://checkout.usewinter.com/?" + queryString
        : "https://sandbox-winter-checkout.onrender.com/?" + queryString;
      setProjectUrl(url);
    }, [
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
      language,
      appearance,
      gentkId,
      assetId,
    ]);

    return showModal ? (
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe id="winter-checkout" src="${projectUrl}" style="color-scheme: light; position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;" />`,
        }}
      />
    ) : (
      <></>
    );
  } else {
    // PROVIDE FEEDBACK TO THE USER
    console.log("Winter Checkout requires local storage");
    return showModal ? (
      <div
        style={{
          colorScheme: "light",
          position: "fixed",
          top: "0px",
          bottom: "0px",
          right: "0px",
          width: "100%",
          border: "none",
          margin: "0px",
          padding: "0px",
          overflow: "hidden",
          zIndex: 999999,
          height: "100%",
          backgroundColor: "#f2f2f2",
        }}
      >
        <h1>
          Hi! It looks like you are on Incognito or have third party cookies
          disabled. Please enable it for the credit card checkout to work!
        </h1>
        <img
          src={turnOffCookieBlocking}
          alt="Turn off third-party cookie blocks"
          style={{
            width: "50%",
            height: "50%",
            objectFit: "contain",
          }}
        />
      </div>
    ) : (
      <></>
    );
  }
};

export default WinterCheckout;
