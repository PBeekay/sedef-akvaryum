import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = 'https://sedefakvaryum.com.tr/shrimp.png',
  type = 'website',
  schema
}) => {
  const location = useLocation();
  const url = `https://sedefakvaryum.com.tr${location.pathname}`;

  // Default values optimized for "akvaryum" search
  const defaultTitle = "Sedef Akvaryum | Eskişehir'in En İyi Akvaryum Mağazası - Balık, Karides ve Akvaryum Malzemeleri";
  const defaultDescription = "Eskişehir'de akvaryum mağazası arıyorsanız Sedef Akvaryum tam size göre! Süs balığı, akvaryum karidesi, akvaryum bitkileri, akvaryum yemi ve tüm akvaryum malzemeleri. Uzman akvaryum danışmanlığı ve hızlı teslimat.";
  const defaultKeywords = "akvaryum, akvaryum mağazası, akvaryum malzemeleri, süs balığı, akvaryum karidesi, eskişehir akvaryum";

  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    updateMetaTag('name', 'description', seoDescription);
    updateMetaTag('name', 'keywords', seoKeywords);
    updateMetaTag('property', 'og:title', seoTitle);
    updateMetaTag('property', 'og:description', seoDescription);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'twitter:title', seoTitle);
    updateMetaTag('property', 'twitter:description', seoDescription);
    updateMetaTag('property', 'twitter:image', image);
    updateMetaTag('property', 'twitter:card', 'summary_large_image');

    // Update canonical URL
    updateCanonicalUrl(url);

    // Update structured data if provided
    if (schema) {
      updateStructuredData(schema);
    }
  }, [seoTitle, seoDescription, seoKeywords, image, url, type, schema]);

  const updateMetaTag = (attribute: string, key: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    }
  };

  const updateCanonicalUrl = (canonicalUrl: string) => {
    let link = document.querySelector('link[rel="canonical"]');
    if (link) {
      link.setAttribute('href', canonicalUrl);
    } else {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      document.head.appendChild(link);
    }
  };

  const updateStructuredData = (schemaData: object) => {
    let script = document.querySelector('script[type="application/ld+json"][data-dynamic="true"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-dynamic', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);
  };

  return null; // This component doesn't render anything
};

export default SEO;

