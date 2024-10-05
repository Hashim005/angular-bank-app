import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const logsAllHTTPRequestInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getAuthToken();
  // console.log('Auth Token:', authToken);

  const authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': authToken ? `Bearer ${authToken}` : '',


    })

  });
  // console.log('Request with Auth Token:', authReq);



  return next(authReq).pipe(
    catchError((error : HttpErrorResponse) => {
      if(error.status === 401){
        console.error('Token expired or invalid. Redirecting to login.');

        authService.logout();
        router.navigate(['/auth/login'])

      }
      return throwError(() => error)
    })
  )
};
