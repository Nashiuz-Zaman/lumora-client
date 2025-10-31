interface IAnalyticsHeadingProps {
  text?: string;
}

export const AnalyticsHeading = ({ text = "" }: IAnalyticsHeadingProps) => {
  return <h3 className="text-xl font-semibold mb-4">{text}</h3>;
};
