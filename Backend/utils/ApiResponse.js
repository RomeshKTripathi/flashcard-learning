class ApiResponse {
    constructor(success = true, data = {}, message = "ok", error_code) {
        this.success = success;
        this.message = message;
        this.data = data;
        if (error_code) this.error_code = error_code;
    }
}
export { ApiResponse };
