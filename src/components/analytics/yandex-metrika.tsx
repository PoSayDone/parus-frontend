"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"

export default function YandexMetrika() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const counterId = 106913480

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ym) {
      // Отправляем информацию о просмотре страницы при каждом переходе
      (window as any).ym(counterId, "hit", window.location.href)
    }
  }, [pathname, searchParams])

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(${counterId}, "init", {
               ssr: true,
               webvisor: true,
               clickmap: true,
               ecommerce: "dataLayer",
               accurateTrackBounce: true,
               trackLinks: true
          });
        `}
      </Script>
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  )
}