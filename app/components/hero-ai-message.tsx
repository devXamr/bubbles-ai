export default function HeroAIMessage({ message }: { message: string }) {
  return (
    <div className="mr-auto w-fit bg-[#2A2A2A] px-4 py-3 text-gray-200  rounded-md mx-2 text-sm">
      {message}
    </div>
  );
}
