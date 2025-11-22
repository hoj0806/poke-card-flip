import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] mt-auto'>
      <h1 className='text-3xl font-bold mb-4 text-center'>
        페이지를 찾을 수 없습니다.
      </h1>
      <p className='mb-6 text-gray-600 text-center'>
        원하는 페이지가 존재하지 않거나 URL이 잘못되었습니다.
      </p>
      <Link
        to='/'
        className='bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-colors'
      >
        메인으로 돌아가기
      </Link>
    </div>
  );
}
