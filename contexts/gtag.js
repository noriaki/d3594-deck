import { parse } from 'url';

export const gTagId = 'UA-97608334-2';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  const { pathname } = parse(url, true);
  window.gtag('config', gTagId, { page_path: pathname });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}) => window.gtag('event', action, {
  event_category: category,
  event_label: label,
  value,
});
