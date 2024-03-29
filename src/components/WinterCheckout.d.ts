import React = require("react");
declare const WinterCheckout: React.FC<{
  projectId?: Record<string, string | number | undefined>;
  showModal?: boolean;
  contractAddress?: string;
  tokenId?: string;
  walletAddress?: string;
  email?: string;
  title?: string;
  brandImage?: string;
  mintQuantity?: number;
  extraMintParams?: object;
  priceFunctionParams?: object;
  production?: boolean;
  dev?: boolean;
  fillSource?: string;
  orderSource?: string;
  language?: string;
  gentkId?: string;
  assetId?: string;
  paymentMethod?: string;
  appearance?: Record<string, string | number | undefined>;
  giftingAvailable?: boolean;
  giftingNFT?: boolean;
  fa2Address?: string;
  onClose?: () => void;
  onSuccess?: (txId: string, email: string) => void;
  policyId?: string; // Used for jpg primary mints
  recaptcha?: string; // Used for jpg primary mints
  listingId?: string; // Used for fxhash secondary
  contractVersion?: string; // Used for fxhash secondary
  fair?: boolean; // Used for Fair's custom checkout
  additionalPurchaseParams?: object; // Used for fxhash's new contract
}>;
export default WinterCheckout;
