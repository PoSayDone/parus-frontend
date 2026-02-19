"use client"

import { useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

const COUNTER_ID = 106913480

// Выносим логику в отдельный под-компонент
function MetrikaTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ym) {
      (window as any).ym(COUNTER_ID, "hit", window.location.href)
    }
  }, [pathname, searchParams])

  return null
}

export default function YandexMetrika() {
  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${COUNTER_ID}, "init", {
               ssr: true,
               webvisor: true,
               clickmap: true,
               ecommerce: "dataLayer",
               accurateTrackBounce: true,
               trackLinks: true
          });
        `}
      </Script>
      
      {/* Оборачиваем слежку в Suspense, чтобы сборка не падала */}
      <Suspense fallback={null}>
        <MetrikaTracking />
      </Suspense>

      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${COUNTER_ID}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}