import { isRouteErrorResponse, useRouteError } from "react-router";
import { motion } from "framer-motion";

export default function Error() {
  const error = useRouteError();

  let message = "알 수 없는 오류가 발생했습니다.";
  let status: number | null = null;

  if (isRouteErrorResponse(error)) {
    const errData = error.data as { message?: string } | undefined;
    message = errData?.message ?? message;
    status = error.status;
  }

  return (
    <div className='flex items-center justify-center min-h-screen flex-col'>
      <motion.div
        className='relative w-64 h-64 rounded-full border-8 border-black overflow-hidden'
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        {/* 포켓볼 디자인 */}
        <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500' />
        <div className='absolute bottom-0 left-0 w-full h-1/2 bg-white' />
        <div className='absolute top-1/2 left-0 w-full h-3 bg-black -translate-y-1/2' />
        <div className='absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full border-4 border-black -translate-x-1/2 -translate-y-1/2' />
      </motion.div>

      <h1 className='text-3xl font-bold mt-8 text-center'>
        {status ? `요청 에러! (${status})` : "예상치 못한 오류 발생!"}
      </h1>
      <p className='text-center mt-2'>{message}</p>
    </div>
  );
}
