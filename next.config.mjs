/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
            
        ];
    },
    allowedDevOrigins: ['192.168.1.42'],

};

export default nextConfig;
