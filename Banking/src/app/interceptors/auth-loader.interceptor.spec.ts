import { TestBed } from '@angular/core/testing';
import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { authLoaderInterceptor } from './auth-loader.interceptor';
import { of } from 'rxjs';

describe('authLoaderInterceptor', () => {
  let req: HttpRequest<any>;
  let next: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    req = new HttpRequest('GET', '/test-url');
    next = {
      handle: jasmine.createSpy('handle').and.returnValue(of({} as HttpEvent<any>)) // Mocking handle method
    };
  });

  it('should be created', () => {
    expect(authLoaderInterceptor).toBeTruthy();
  });

});
