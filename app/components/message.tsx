import { v4 as uuidv4 } from "uuid";

type messageProps = {
  eachMessage: string;
};
export default function Message({ eachMessage }: messageProps) {
  return (
    <div
      key={uuidv4()}
      className="border w-fit ml-auto py-4 px-6 my-2 rounded-md border-gray-200 bg-green-100 transition-colors duration-100 hover:bg-green-200 text-gray-800 text-sm max-w-[80%]"
    >
      <div>{eachMessage}</div>
    </div>
  );
}
