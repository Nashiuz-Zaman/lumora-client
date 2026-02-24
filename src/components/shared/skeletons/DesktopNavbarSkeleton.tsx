import { InnerContainer } from "@/components/shared";

export const DesktopNavbarSkeleton = () => {
  return (
    <nav className="hidden xl:block w-full bg-white border-b border-neutral-100">
      <InnerContainer>
        {/* Mirroring the flex-center layout of your real nav */}
        <div className="flex items-center justify-center gap-6 py-3 2xl:py-4 animate-pulse">
          {/* We generate 7-8 placeholders to fill the desktop width */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-neutral-100 rounded-md"
              style={{
                // Randomizing width slightly makes it look more natural (like real words)
                width: `${Math.floor(Math.random() * (100 - 60 + 1) + 60)}px`,
              }}
            />
          ))}
        </div>
      </InnerContainer>
    </nav>
  );
};
