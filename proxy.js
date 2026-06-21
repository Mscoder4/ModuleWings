import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req) {
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {pathname} = req.nextUrl;
    
    if(pathname.includes("/api") && !pathname.includes("/api/login")){
        let token = req.headers.get("Authorization");
        token = token?.split(" ")[1];
        if(token==undefined || token==null){
            token = req.cookies.get("token")?.value
        }
        if(!token){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }else if(pathname === '/api/login'){
        return NextResponse.next();
    }else{
        const token = req.cookies.get("token")?.value;
        if(pathname === '/login' && token){
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    
        if(pathname === '/login'){
            return NextResponse.next();
        }
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
}

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|assets).*)",
    ],
};