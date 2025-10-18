export default function HeroAIMessage({ message }: { message: string }) {
  return (
    <div className="mr-auto w-fit bg-gray-100 px-4 py-3 rounded-md mx-2 text-lg">
      {message}
    </div>
  );
}
