import "../globals.css";
import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import Header from "@/components/Header";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full">
      <body className="min-h-screen bg-zinc-950 text-zinc-100">
        <NextIntlClientProvider messages={messages}>
          <div className="mx-auto max-w-6xl px-4">
            <Header />
            <main className="py-8">{children}</main>

            <footer className="border-t border-zinc-800 py-6 text-sm text-zinc-400">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="https://t.me/MindsetCashflowNetworkmarketing"
                  className="text-zinc-200 hover:text-orange-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  @MindsetCashflowNetworkmarketing
                </a>
                <span>Krypto ist risikoreich. Keine Anlageberatung.</span>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}