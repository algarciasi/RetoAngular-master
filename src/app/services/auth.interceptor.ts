import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  if (email && password) {
    const authHeader = 'Basic ' + btoa(`${email}:${password}`);
    const cloned = req.clone({
      setHeaders: {
        Authorization: authHeader
      },
      withCredentials: true
    });
    console.log('[INTERCEPTOR] Enviando request con Authorization:', authHeader);

    return next(cloned);
  }
  console.warn('[INTERCEPTOR] No se encontraron credenciales en localStorage.');

  return next(req);
};
