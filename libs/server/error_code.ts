const enum ErrorCode {
    USER_NOT_FOUND = 1001,
    ADDRESS_IS_REQUIRED = 1002,
    ID_IS_REQUIRED = 1003,
    CANNOT_FOLLOW_YOURSELF,
    RELATIONSHIP_ALREADY_EXISTS,
    RELATIONSHIP_NOT_FOUND,

}

export default ErrorCode;