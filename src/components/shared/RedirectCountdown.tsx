"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IRedirectCountdownProps {
  href: string;
  text?: string;
  after: number; // milliseconds
  modifyClasses?: string;
}

export const RedirectCountdown = ({
  href,
  text = "Redirecting in",
  after,
  modifyClasses = "",
}: IRedirectCountdownProps) => {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(after / 1000));

  // Countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Redirect after the given time
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(href);
    }, after);

    return () => clearTimeout(timeout);
  }, [after, router, href]);

  return (
    <p className={`text-xl ${modifyClasses}`}>
      {text}{" "}
      {secondsLeft > 0
        ? `in ${secondsLeft} second${secondsLeft !== 1 ? "s" : ""}...`
        : ""}
    </p>
  );
};
