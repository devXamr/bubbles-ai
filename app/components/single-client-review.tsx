export default function SingleClientReview({
  review,
  name,
}: {
  review: string;
  name: string;
}) {
  return (
    <div className="col-span-1 row-span-1 py-3 border border-green-700">
      <div className="border-b border-dashed border-green-700 px-3 pb-4">
        {review}
      </div>
      <div className="ml-auto w-fit px-3 mt-4 text-sm text-right">
        {name}
        <div className="text-gray-300 text-xs">Software Developer</div>
      </div>
    </div>
  );
}
