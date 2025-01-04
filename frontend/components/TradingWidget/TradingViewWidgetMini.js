import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidgetMini() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
            "symbol": "TRADENATION:SOLANA",
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "dateRange": "12M",
            "colorTheme": "dark",
            "isTransparent": false,
            "autosize": true,
            "largeChartUrl": ""
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" style={{maxHeight:"300px"}} ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidgetMini);