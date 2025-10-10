import ReactGA from 'react-ga4';

// Event tracking helper functions

/**
 * Track custom events
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Track product view
 */
export const trackProductView = (productId: string, productName: string, price: number) => {
  ReactGA.event('view_item', {
    currency: 'TRY',
    value: price,
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
      },
    ],
  });
};

/**
 * Track category view
 */
export const trackCategoryView = (categoryId: string, categoryName: string) => {
  ReactGA.event('view_item_list', {
    item_list_id: categoryId,
    item_list_name: categoryName,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  ReactGA.event('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track WhatsApp click
 */
export const trackWhatsAppClick = (source: string) => {
  ReactGA.event('contact', {
    method: 'whatsapp',
    source: source,
  });
};

/**
 * Track phone click
 */
export const trackPhoneClick = () => {
  ReactGA.event('contact', {
    method: 'phone',
  });
};

/**
 * Track add to cart (for future use)
 */
export const trackAddToCart = (productId: string, productName: string, price: number) => {
  ReactGA.event('add_to_cart', {
    currency: 'TRY',
    value: price,
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
      },
    ],
  });
};

/**
 * Track outbound link clicks
 */
export const trackOutboundLink = (url: string, label?: string) => {
  ReactGA.event('click', {
    event_category: 'outbound',
    event_label: label || url,
    transport_type: 'beacon',
  });
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (percentage: number) => {
  ReactGA.event('scroll', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
};

/**
 * Track time on page
 */
export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  ReactGA.event('timing_complete', {
    name: 'time_on_page',
    value: seconds * 1000, // milliseconds
    event_category: 'engagement',
    event_label: pagePath,
  });
};

/**
 * Track exceptions/errors
 */
export const trackException = (description: string, fatal: boolean = false) => {
  ReactGA.event('exception', {
    description,
    fatal,
  });
};

/**
 * Set user properties
 */
export const setUserProperty = (property: string, value: string) => {
  ReactGA.gtag('set', 'user_properties', {
    [property]: value,
  });
};
