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
  onClose?: () => void;
  onSuccess?: (txId: string, email: string) => void;
  policyId?: string; // Used for jpg primary mints
  recaptcha?: string; // Used for jpg primary mints
}>;
export default WinterCheckout;
