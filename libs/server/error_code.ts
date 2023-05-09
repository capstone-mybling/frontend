const enum ErrorCode {
    USER_NOT_FOUND = 1001,
    ADDRESS_IS_REQUIRED = 1002,
    ID_IS_REQUIRED = 1003,
    CANNOT_FOLLOW_YOURSELF,
    RELATIONSHIP_ALREADY_EXISTS,
    RELATIONSHIP_NOT_FOUND,
    ITEM_DOES_NOT_EXIST,
    CONTENT_DOES_NOT_EXIST,
    PERMISSION_DENIED,
    UNAUTHORIZED,
    FILE_IS_REQUIRED
}

export default ErrorCode;