import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {
  // hier kannst du später weitere Next-Settings ergänzen
};

export default withNextIntl(nextConfig);