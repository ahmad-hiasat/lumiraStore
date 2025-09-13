import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import ReduxProvider from '@/providers/ReduxProvider';
import Navbar from "@/shard/Navbar/Navbar";
import Footer from "@/shard/Footer/Footer";
const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "الترا ERP - حلول محاسبية",
  description: "نقدم لك حلول محاسبية مبتكرة عبر الترا لحلول الأعمال.",
  icons:{
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${notoKufiArabic.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>

        <NextIntlClientProvider locale={locale}>
            <Navbar/>
            {children}
            <Footer/>
        </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
