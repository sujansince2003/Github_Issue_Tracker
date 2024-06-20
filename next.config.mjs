/** @type {import('next').NextConfig} */
const nextConfig = {
  //solving problem of request header refer policy "strict origin when cross origin
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "referrer-policy",
            value: "no-referrer",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
