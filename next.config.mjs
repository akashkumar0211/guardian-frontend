
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    env:{
        "hostport":process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
        "AUTH_GOOGLE_ID":process.env.AUTH_GOOGLE_ID,
        "AUTH_GOOGLE_SECRET":process.env.AUTH_GOOGLE_SECRET,
        "AUTH_SECRET":process.env.AUTH_SECRET,
        "NEXTAUTH_URL":process.env.NEXTAUTH_URL,
        "NEXT_PUBLIC_HOSTPORT":process.env.NEXT_PUBLIC_HOSTPORT,
        "NEXT_PUBLIC_AUTH_URL":process.env.NEXT_PUBLIC_AUTH_URL,
    },
    output: "standalone",
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'authjs.dev',
                port: '',
                pathname: '/img/providers/google.svg',
            },
        ]
        },
    webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
            use: ['@svgr/webpack'],
        },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
},
};

export default nextConfig;
