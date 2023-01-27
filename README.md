# @usewinter/checkout

:rocket::rocket: React package to integrate Winter checkout :rocket::rocket:

Installation

```
npm i @usewinter/checkout

OR

yarn add @usewinter/checkout
```

Usage in your react app

```
import { WinterCheckout } from '@usewinter/checkout';

<WinterCheckout
    projectId={YOUR_PROJECT_ID}
    production={false}
    showModal={showWinter}
    // testnet need when production is false
    testnet={'goerli' or 'rinkeby'}
    // pass in a function to be called when a successful purchase happens
    onSuccess={() => setParty(true)}
    // pass in a function to be called when the modal is closed
    onClose={() => setShowWinter(false)}
    // Extra mint params are params besides 'address, amount, proof'
    // The key needs to exactly match the name of the param provided to Winter
    // The value will be passed in as the param
    extraMintParams={{tier: 'diamond', type: 'super-rare'}}
    // Price function params
    // The key needs to exactly match the name of the param provided to Winter
    // The value will be passed in as the param
    priceFunctionParams={{tier: 'gold', type: 'rare'}}
    // If you want to customize the css of the checkout widget
    appearance={
        leftBackgroundColor: "#131317",
	      rightBackgroundColor: "#22222d",
	      buttonTextColor: "black",
	      buttonColor: "#f59e0c",
	      primaryTextColor: "white",
	      secondaryTextColor: "#85868a",
	      fontFamily: "Montserrat,sans-serif",
	      buttonAndInputBoxShadow: "0 3px 6px 1px rgba(217, 119, 6, 0.2)",
	      buttonAndInputFocusBoxShadow: "0 3px 6px 1px rgba(217, 119, 6, 0.8)",
        quantityButtonPlusMinusSvgFilter: "invert(100%) sepia(100%) saturate(1%) hue-rotate(135deg) brightness(105%) contrast(101%)",
        inputBackgroundColor: "#131317",
        mintingClipLoaderColor: "white",
        borderColor: "rgba(245,158,11)"
    }
/>
```

### Params:

#### YOUR PROJECT ID

Get this from the Winter team :)

#### PRODUCTION

false if you're testing in sandbox, true when you go live!

#### showModal

this toggles true / false based on the state of your "Pay with Card" button

How to deploy
```
npm run build
npm version patch 
npm publish 
```