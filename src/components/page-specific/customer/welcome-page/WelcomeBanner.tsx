import Image from "next/image";

interface IWelcomeBannerProps {
  name?: string;
  subtitle?: string;
}

export const WelcomeBanner = ({ name, subtitle }: IWelcomeBannerProps) => (
  <div className="relative overflow-hidden rounded-2xl flex items-center justify-between bg-linear-to-r from-primary-light-2 to-primary text-neutral-50 shadow-md">
    <div className="absolute right-0 top-0 h-full w-[35%]">
      <Image
        src="/auth-images/auth-2.webp"
        alt="Welcome banner"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-l from-black/25 to-transparent" />
    </div>

    <div className="relative z-10 px-6 py-8 sm:px-10 md:px-12 w-[65%]">
      <h3 className="text-2xl font-semibold mb-1">Hello, {name || "there"}</h3>
      <p className="text-sm sm:text-base text-neutral-50/90 max-w-md">{subtitle}</p>
    </div>
  </div>
);
