import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req) {
    const token = req.cookies.get("token")?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {pathname} = req.nextUrl;
    
    if(pathname === '/login' && token){
        console.log("faah")
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

export const config = {
    matcher: [
        "/((?!_next|favicon.ico|assets|api).*)",
    ],
};