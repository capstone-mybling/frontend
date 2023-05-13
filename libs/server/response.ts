import {NextApiResponse} from "next";
import ErrorCode from "@libs/server/error_code";

interface ErrorResponse {
    message?: string;
    errorMessage: string;
    errorCode: ErrorCode;
}

interface BaseResponse<T> {
    statusCode?: number;
    success: boolean;
    data?: T;
    error?: ErrorResponse;
}

function baseResponse<T>(
    response: NextApiResponse,
    result: BaseResponse<T>
) {
    const {success, statusCode = 200, error, data} = result;
    if (!success) {
        return response.status(statusCode!).json({
            success,
            error,
        })
    }
    return response.status(statusCode).json({
        success,
        data,
    });
}

export default baseResponse;