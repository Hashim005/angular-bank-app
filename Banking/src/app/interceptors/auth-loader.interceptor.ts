import { Injectable } from '@angular/core';
import { LoaderService } from './../service/loader.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';


@Injectable()
export class authLoaderInterceptor implements HttpInterceptor{
  subscribe(arg0: () => void) {
    throw new Error('Method not implemented.');
  }
  constructor(private loaderService:LoaderService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("api started");
    this.loaderService.show();

    return next.handle(req).pipe(
      finalize(() => {
        // console.log("end api call");


        this.loaderService.hide()

      })

    )

  }

}
