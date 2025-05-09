// we use HttpInterceptorFn to allow us to intercept requests and responses (define HTTP interceptor as a function rather than a class)
// (e.g., adding headers, logging, error handling)
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // create a new HttpRequest object >> clone it and add authorization header
  const clonedReq = token
    ? //   Method: req.clone():
      //   This method creates a new instance of the HttpRequest object, leaving the original req intact.
      req.clone({
        // The setHeaders option allows you to add or update HTTP headers
        setHeaders: { Authorization: `${token}` },
      })
    : req;
  // inspect or modify the req object and then pass it to next() >> next interceptor or final HTTP handler
  return next(clonedReq);
};
