import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-winter-checkout",
  template: `
    <button
      (click)="toggleModal()"
      style="color: red; z-index: 99999; background-color: red; position: absolute;"
      id="winter-button"
    >
      Toggle Modal
    </button>
    <div *ngIf="showModal">
      <iframe
        id="winter-checkout"
        [src]="projectUrl | safe"
        style="color-scheme: light; position: fixed; top: 0px; bottom: 0px; right: 0px; width: 100%; border: none; margin: 0px; padding: 0px; overflow: hidden; z-index: 999999; height: 100%;"
      ></iframe>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class WinterCheckoutComponent implements OnInit {
  @Input() showModal: boolean;
  @Input() walletAddress: string;
  @Input() production: boolean;
  @Input() dev: boolean;
  @Input() language: string;
  @Input() appearance: any;
  @Input() paymentMethod: string;
  @Input() tokenId: string;
  @Input() fillSource: string;
  @Input() orderSource: string;
  @Input() fa2Address: string;

  projectUrl: string;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onClose() {
    this.showModal = false;
  }

  onSuccess(
    transactionHash,
    email,
    nftQuantity,
    amountUSD,
    nftTokenIds,
    nftUrls,
    openseaUrls
  ) {
    this.showModal = false;
    // Add in any extra
  }

  ngOnInit() {
    let queryString = "";
    if (this.walletAddress) {
      queryString += "&walletAddress=" + this.walletAddress;
    }
    if (this.fillSource) {
      queryString += `&fillSource=` + this.fillSource;
    }
    if (this.orderSource) {
      queryString += `&orderSource=` + this.orderSource;
    }
    if (this.language) {
      queryString += "&language=" + this.language;
    }
    if (this.paymentMethod) {
      queryString += `&paymentMethod=${this.paymentMethod}`;
    }
    if (this.fa2Address && this.tokenId) {
      queryString += `&fa2Address=${this.fa2Address}&tokenId=${this.tokenId}`;
    }

    if (this.appearance) {
      queryString += `&appearance=${encodeURIComponent(this.appearance)}`;
    }

    let url;
    if (this.production) {
      url = "https://checkout.usewinter.com/?" + queryString;
    } else {
      if (this.dev) {
        url = "https://dev-checkout.onrender.com/?" + queryString;
      } else {
        url = "https://sandbox-winter-checkout.onrender.com/?" + queryString;
      }
    }

    this.projectUrl = url;
    this.handleWindowEvent();
  }

  handleWindowEvent() {
    if (typeof window !== "undefined") {
      window.addEventListener("message", (e) => {
        const { data } = e;
        if (data === "closeWinterCheckoutModal") {
          this.onClose?.();
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
          this.onSuccess?.(
            transactionHash,
            email,
            nftQuantity,
            amountUSD,
            nftTokenIds,
            nftUrls,
            openseaUrls
          );
        }
      });
    }
  }
}
