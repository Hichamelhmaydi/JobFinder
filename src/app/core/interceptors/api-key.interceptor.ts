import {  HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../environments/environment.development";

export const ApiInterceptor : HttpInterceptorFn = (req,next)=>{
    if (!req.url.includes(environment.jobApi)) {
        return next(req);
    }
    const apiReq = req.clone({
        setParams:{
            api_key : environment.museApiKey
        }
    });
    return next(apiReq)
}