import {  HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

export const ApiInterceptor : HttpInterceptorFn = (req,next)=>{
    const apiReq = req.clone({
        setParams:{
            api_key : environment.museApiKey
        }
    });
    return next(apiReq)
}