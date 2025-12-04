export default function CardFront({ name, image }: CardFrontProps) {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <img src={image} alt={name} className='object-contain' />
        <p className='text-center'>{name}</p>
      </div>
    </>
  );
}
