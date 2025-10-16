import { MessageType } from "../chat/page";

type FileSaveButtonProps = {
  callFunc: (data: MessageType[]) => void;
  children: string;
  data: MessageType[];
};

export default function FileSaveButton({
  callFunc,
  children,
  data,
}: FileSaveButtonProps) {
  return (
    <button onClick={() => callFunc(data)} className="border px-3 py-2">
      {children}
    </button>
  );
}
