type HumanMessageProps = {
  message: string;
};

export default function HeroHumanMessage({ message }: HumanMessageProps) {
  return (
    <div className="ml-auto w-fit bg-green-950 text-gray-200 px-4 py-3 rounded-lg rounded-br-none  mx-2 text-sm">
      {message}
    </div>
  );
}
