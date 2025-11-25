export default function AbilityBadge({ ability }: { ability: string }) {
  return (
    <>
      <span className='bg-yellow-500/30 px-2 py-1 rounded-md text-xs md:text-sm text-white'>
        {ability}
      </span>
    </>
  );
}
