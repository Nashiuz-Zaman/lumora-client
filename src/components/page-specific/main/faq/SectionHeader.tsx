interface ISectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ title, subtitle }: ISectionHeaderProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-neutral-600 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
};
