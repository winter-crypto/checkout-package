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
  dev,
  language,
  appearance,
  gentkId,
  assetId,
  paymentMethod,
  contractAddress,
  tokenId,
  fillSource,
  orderSource,
  giftingAvailable,
  giftingNFT,
  fa2Address,
  policyId,
  recaptcha,
  listingId,
  contractVersion,
  fair,
  additionalPurchaseParams,
}) => {
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
    } else if (assetId) {
      queryString += "assetID=" + assetId;
    } else if (policyId) {
      // Used for jpg primary mints
      queryString += "policyId=" + policyId;
    }
    if (listingId && contractVersion) {
      queryString += `listingId=${listingId}&contractVersion=${contractVersion}`;
    }

    if (recaptcha) {
      // Used for jpg primary mints
      queryString += "&recaptcha=" + recaptcha;
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
    if (paymentMethod) {
      queryString += `&paymentMethod=${paymentMethod}`;
    }
    if (giftingAvailable) {
      queryString += `&giftingAvailable=${giftingAvailable}`;
    }
    if (giftingNFT) {
      queryString += `&giftingNFT=${giftingNFT}`;
    }
    if (fa2Address && tokenId) {
      queryString += `&fa2Address=${fa2Address}&tokenId=${tokenId}`;
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
    if (additionalPurchaseParams) {
      queryString += `&additionalPurchaseParams=${encodeURIComponent(
        JSON.stringify(additionalPurchaseParams)
      )}`;
    }

    var url;
    if (production) {
      if (fair) {
        url = "https://fair-checkout.onrender.com/?" + queryString;
      } else {
        url = "https://checkout.usewinter.com/?" + queryString;
      }
    } else {
      if (dev) {
        url = "https://dev-checkout.onrender.com/?" + queryString;
      } else {
        if (fair) {
          url = "https://fair-checkout-testnet.onrender.com/?" + queryString;
        } else {
          url = "https://sandbox-winter-checkout.onrender.com/?" + queryString;
        }
      }
    }

    setProjectUrl(url);

    // Open checkout in new window if payment method is SOL
    if (paymentMethod === "SOL" && showModal) {
      window.open(
        url,
        "checkout",
        "height=" + window.innerHeight + ",width=800"
      );
    }
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
    giftingAvailable,
    giftingNFT,
    fa2Address,
    listingId,
    contractVersion,
    fair,
  ]);

  return showModal && paymentMethod !== "SOL" ? (
    <div
      dangerouslySetInnerHTML={{
        __html: `<iframe id="winter-checkout" src="${projectUrl}" style="color-scheme: light; position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;" />`,
      }}
    />
  ) : (
    <></>
  );
};

export default WinterCheckout;
