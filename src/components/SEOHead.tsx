import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Aadarsh Thakur | Full-Stack Developer",
  description = "Aadarsh Thakur is a Full Stack Developer specializing in React, Node.js, and Cloud Architectures. Exploring the intersection of Scalable Web Apps and AI/ML.",
  keywords = "Aadarsh Thakur, Portfolio, Full Stack Developer, React, TypeScript, Node.js, Firebase, Supabase, software engineer",
  image = "/assets/projects/portfolio.png",
  url = "https://aadarsh-portfolio-49ac6.web.app",
  type = "website"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        "name": "Aadarsh Thakur",
        "jobTitle": "Full Stack Developer",
        "description": description,
        "url": url,
        "image": {
          "@type": "ImageObject",
          "url": `${url}/assets/projects/portfolio.png`,
          "width": "1200",
          "height": "630"
        },
        "sameAs": [
          "https://github.com/Aadarsh2021",
          "https://www.linkedin.com/in/aadarsh-thakur-1bbb29230/"
        ],
        "knowsAbout": [
          "Web Development", "React", "TypeScript", "Node.js", "Firebase", "Supabase", "Cloud Architecture"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        "url": url,
        "name": "Aadarsh Thakur Portfolio",
        "publisher": { "@id": `${url}/#person` },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        "url": url,
        "name": title,
        "isPartOf": { "@id": `${url}/#website` },
        "about": { "@id": `${url}/#person` },
        "description": description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": url }
          ]
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Aadarsh Thakur" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="EN" />
      <meta name="theme-color" content="#6366f1" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="AT Portfolio" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Aadarsh Thakur Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@aadarsh_dev" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="aadarsh-thakur-1bbb29230" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.emailjs.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.emailjs.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6366f1" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Security Headers */}
      <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
    </Helmet>
  );
};

export default SEOHead; 