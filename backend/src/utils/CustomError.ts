export class CustomError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found') {
      super(message, 404);
    }
  }
  
  export class BadRequestError extends CustomError {
    constructor(message: string = 'Bad request') {
      super(message, 400);
    }
  }
  
  export class UnauthorizedError extends CustomError {
    constructor(message: string = 'Unauthorized') {
      super(message, 401);
    }
  }