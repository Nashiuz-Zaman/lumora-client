interface IErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage = ({ message, className = "" }: IErrorMessageProps) => {
  return <p className={`py-2 text-red-600 text-sm ${className}`}>{message}</p>;
};

export default ErrorMessage;
