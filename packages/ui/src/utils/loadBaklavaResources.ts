const BAKLAVA_VERSION = "3.4.2";

export const loadBaklavaResources = () => {
  const loadScript = () => {
    if (!document.querySelector('script[src*="baklava.js"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = `https://cdn.jsdelivr.net/npm/@trendyol/baklava@${BAKLAVA_VERSION}/dist/baklava.js`;
      document.head.appendChild(script);
    }
  };

  const loadStyles = () => {
    if (!document.querySelector('link[href*="default.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `https://cdn.jsdelivr.net/npm/@trendyol/baklava@${BAKLAVA_VERSION}/dist/themes/default.css`;
      document.head.appendChild(link);
    }
  };

  loadScript();
  loadStyles();
};
