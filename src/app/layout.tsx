import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nahin Sharif | Graphic Designer & Motion Artist Portfolio CMS",
  description: "Personal portfolio of Nahin Sharif - Graphic Designer, Motion Artist, and Video Editor crafting high-impact posters and visual identity systems.",
  keywords: ["Graphic Designer", "Poster Design", "Motion Graphics", "Video Editor", "Photoshop", "Illustrator", "Behance", "Nahin Sharif"],
  openGraph: {
    title: "Nahin Sharif | Graphic Designer & Motion Artist Portfolio",
    description: "High impact graphic design, poster art, motion graphics, and video editing portfolio.",
    type: "website",
    siteName: "Nahin Sharif Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahin Sharif | Graphic Designer & Motion Artist",
    description: "High impact graphic design, poster art, motion graphics, and video editing portfolio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: "Nahin Sharif" }],
  creator: "Nahin Sharif",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f0f10" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nahin Sharif",
              jobTitle: "Graphic Designer & Motion Artist",
              url: "https://nahin.design",
              description: "Graphic Designer, Motion Artist, and Video Editor crafting high-impact posters and visual identity systems.",
              sameAs: [
                "https://behance.net",
                "https://github.com",
                "https://linkedin.com",
                "https://instagram.com"
              ]
            })
          }}
        />
      </head>
      <body
        className="min-h-full bg-[#0f0f10] text-gray-100 flex flex-col"
        style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
