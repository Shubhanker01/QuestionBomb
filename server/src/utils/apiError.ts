class apiError extends Error {
    constructor(
        statusCode:number,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message)
        this.message = message
        
    }
}