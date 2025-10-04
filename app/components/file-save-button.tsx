export default function FileSaveButton({ callFunc, children, data }) {
  return (
    <button onClick={() => callFunc(data)} className="border px-3 py-2">
      {children}
    </button>
  );
}
