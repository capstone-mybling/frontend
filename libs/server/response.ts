import {Base} from "postcss-selector-parser";
import {NextApiResponse} from "next";

interface BaseResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: any;
}

function baseResponse<T>(
    response: NextApiResponse,
    result: BaseResponse<T>
) {
    const { success, message, error, data } = result;
    if (!success) {
        return response.json({
            success,
            message,
            error,
        })
    }
    return response.json({
        success,
        message: "success",
        data,
    });
}

export default baseResponse;