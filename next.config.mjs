/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    /*
      AVIF first, WebP behind it. AVIF runs 30–50% smaller than WebP at the
      same perceived quality, and any browser that can't decode it is served
      the WebP instead — the <picture> negotiation is automatic.
    */
    formats: ["image/avif", "image/webp"],

    /*
      The widths the optimizer is allowed to build. These are matched against
      the `sizes` on each <Image>, so a 390px phone gets a ~420px file rather
      than the 1800px original. Trimmed to the widths this layout actually
      asks for — every extra entry is another variant to build on first hit.
    */
    deviceSizes: [420, 640, 828, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [64, 128, 256, 384],

    /*
      The optimizer re-encodes everything at 75 unless the quality is both
      asked for on the <Image> and allow-listed here. 90 exists for the dark
      photographs — at 75 their shadow gradients turn to mush.
    */
    qualities: [75, 90],

    /*
      How long a built variant is kept in Next's own transform cache, so the
      same size is never re-encoded twice.

      Note this does NOT set the browser cache for images that live in
      /public: Next serves those through the optimizer with a fixed
      `max-age=31536000`, whatever this value is (verified — setting it to 60
      changes nothing in the response header). Replacing artwork therefore
      means giving the file a NEW NAME; a `?v=2` on the src is rejected by the
      optimizer's url validation. New visitors always see new artwork either
      way — the stale copy only exists in the browser of someone who already
      loaded that exact filename.
    */
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        // the fonts Next self-hosts and the static chunks are already
        // immutable; this covers anything served straight out of /public
        source: "/:path*",
        headers: [{ key: "X-Content-Type-Options", value: "nosniff" }],
      },
    ];
  },
};

export default nextConfig;
