import { ReactNode } from "react";

export interface ISocialMediaLink {
  src: string;
  href: string;
  alt?: string;
}

export const socialMediaLinks: ISocialMediaLink[] = [
  {
    src: "/logos/social-media/fb.svg",
    href: "https://www.facebook.com/",
  },
  {
    src: "/logos/social-media/instagram.svg",
    href: "https://www.instagram.com/",
  },
  {
    src: "/logos/social-media/whatsapp.svg",
    href: "https://www.whatsapp.com/",
  },
  {
    src: "/logos/social-media/telegram.svg",
    href: "https://telegram.org/",
  },
  {
    src: "/logos/social-media/twitter.svg",
    href: "https://twitter.com/?lang=en",
  },
];

export interface INavOptionItem {
  text: string;
  href: string;
}

export interface INavOptionGroup {
  heading: string;
  options: INavOptionItem[];
}

export const navOptions: INavOptionGroup[] = [
  {
    heading: "Product Category",
    options: [
      { text: "Electronics", href: "/" },
      { text: "Fashion", href: "/" },
      { text: "Makeup", href: "/" },
      { text: "Watches", href: "/" },
      { text: "Food Items", href: "/" },
    ],
  },
  {
    heading: "Useful links",
    options: [
      { text: "Home", href: "/" },
      { text: "Order Returns", href: "/returns" },
      { text: "Products", href: "/products" },
      { text: "Contact us", href: "/contact" },
      { text: "FAQ", href: "/faq" },
    ],
  },
];

export interface IAddressItem {
  heading: string;
  description: ReactNode;
}

export interface IAddress {
  heading: string;
  addresses: IAddressItem[];
}

export const address: IAddress = {
  heading: "Contact Us",
  addresses: [
    {
      heading: "New York Office",
      description: (
        <>
          123 Fifth Avenue, Suite 500
          <br /> New York, NY 10010
          <br /> United States
        </>
      ),
    },
    {
      heading: "San Francisco Office",
      description: (
        <>
          456 Market Street, Floor 12
          <br /> San Francisco, CA 94111
          <br /> United States
        </>
      ),
    },
  ],
};
