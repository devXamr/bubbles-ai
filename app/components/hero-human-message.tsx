type HumanMessageProps = {
  message: string;
};

export default function HeroHumanMessage({ message }: HumanMessageProps) {
  return (
    <div className="ml-auto w-fit bg-green-100 px-4 py-3 rounded-lg rounded-br-none text-gray-900 mx-2 text-lg">
      {message}
    </div>
  );
}
