import { isRouteErrorResponse, useRouteError } from "react-router";
import RotatePokeball from "./RotatePokeball";

export default function StatusScreen({
  type = "loading",
  message,
  status,
}: StatusScreenProps) {
  const error = useRouteError();

  let finalMessage = message;
  let finalStatus = status;

  if (type === "error") {
    let errMessage = "알 수 없는 오류가 발생했습니다.";
    let errStatus: number | null = null;

    if (isRouteErrorResponse(error)) {
      const errData = error.data as { message?: string } | undefined;
      errMessage = errData?.message ?? errMessage;
      errStatus = error.status;
    }

    finalMessage = finalMessage ?? errMessage;
    finalStatus = finalStatus ?? errStatus;
  }

  if (!finalMessage && type === "loading") {
    finalMessage = "포켓몬들을 불러 모으고 있습니다...";
  }

  return (
    <div className='flex items-center justify-center min-h-screen flex-col bg-linear-to-r from-(--bg-color-primary) to-(--bg-color-secondary)'>
      <RotatePokeball />
      <h1 className='text-3xl font-bold mt-8 text-center'>
        {type === "error"
          ? finalStatus
            ? `요청 에러! (${finalStatus})`
            : "예상치 못한 오류 발생!"
          : finalMessage}
      </h1>
      {type === "error" && <p className='text-center mt-2'>{finalMessage}</p>}
    </div>
  );
}
