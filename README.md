# checkout-package
:rocket::rocket:  React package to integrate Winter checkout :rocket::rocket:

Installation
```
npm i @usewinter/checkout

OR 

yarn add @usewinter/checkout
```

Usage in your react app
```
import { WinterCheckout } from '@usewinter/checkout';


<WinterCheckout projectId={YOUR_PROJECT_ID} production={false} showModal={showWinter} />
```

### Params:

#### YOUR PROJECT ID
Get this from the Winter team :) 

#### PRODUCTION
false if you're testing in sandbox, true when you go live! 

#### showModal
this toggles true / false based on the state of your "Pay with Card" button
