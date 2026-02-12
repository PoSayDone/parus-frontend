"use client";

import type { ComponentType, ReactNode } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";

type Coordinates = [number, number];

type YMapLocation = {
  center: Coordinates;
  zoom: number;
};

type YMapProps = {
  className?: string;
  mode?: "vector" | "raster";
  location: YMapLocation;
  children?: ReactNode;
};

type YMapMarkerProps = {
  coordinates: Coordinates;
  children?: ReactNode;
};

export type ReactifiedYMaps3Modules = {
  YMap: ComponentType<YMapProps>;
  YMapDefaultFeaturesLayer: ComponentType;
  YMapDefaultSchemeLayer: ComponentType;
  YMapMarker: ComponentType<YMapMarkerProps>;
};

type YMaps3ReactModule = {
  reactify: {
    bindTo: (
      react: typeof React,
      reactDom: typeof ReactDOM,
    ) => {
      module: <T>(source: unknown) => T;
    };
  };
};

type YMaps3Global = {
  ready: Promise<void>;
  import: (moduleName: string) => Promise<unknown>;
};

declare global {
  interface Window {
    ymaps3?: YMaps3Global;
  }
}

const YMAPS3_SCRIPT_ID = "ymaps3-api-script";

let ymaps3Promise: Promise<YMaps3Global> | null = null;
let reactifiedModulesPromise: Promise<ReactifiedYMaps3Modules> | null = null;

const asComponent = <T>(value: unknown): T => {
  if (!value || (typeof value !== "object" && typeof value !== "function")) {
    throw new Error("Unexpected Yandex Maps API response");
  }

  return value as T;
};

const loadYMaps3Script = (
  apiKey: string,
  lang: string,
): Promise<YMaps3Global> =>
  new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Yandex Maps is available only in browser"));
      return;
    }

    if (window.ymaps3) {
      resolve(window.ymaps3);
      return;
    }

    const existing = document.getElementById(
      YMAPS3_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const finish = () => {
      if (!window.ymaps3) {
        reject(new Error("Failed to initialize Yandex Maps v3"));
        return;
      }
      resolve(window.ymaps3);
    };

    if (existing) {
      existing.addEventListener("load", finish, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Yandex Maps script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.id = YMAPS3_SCRIPT_ID;
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=${lang}`;
    script.async = true;
    script.onload = finish;
    script.onerror = () =>
      reject(new Error("Failed to load Yandex Maps script"));

    document.head.appendChild(script);
  });

const getYMaps3 = async (
  apiKey: string,
  lang: string,
): Promise<YMaps3Global> => {
  if (ymaps3Promise) {
    return ymaps3Promise;
  }

  ymaps3Promise = (async () => {
    const ymaps3 = await loadYMaps3Script(apiKey, lang);
    await ymaps3.ready;
    return ymaps3;
  })();

  return ymaps3Promise;
};

export const getReactifiedYMaps3Modules = async (
  apiKey: string,
  lang = "ru_RU",
): Promise<ReactifiedYMaps3Modules> => {
  if (!apiKey) {
    throw new Error("Missing NEXT_PUBLIC_YMAPS3_API_KEY");
  }

  if (reactifiedModulesPromise) {
    return reactifiedModulesPromise;
  }

  reactifiedModulesPromise = (async () => {
    const ymaps3 = await getYMaps3(apiKey, lang);
    const reactModule = (await ymaps3.import(
      "@yandex/ymaps3-reactify",
    )) as YMaps3ReactModule;
    const reactify = reactModule.reactify.bindTo(React, ReactDOM);
    const baseModule = reactify.module<Record<string, unknown>>(ymaps3);

    return {
      YMap: asComponent<ReactifiedYMaps3Modules["YMap"]>(baseModule.YMap),
      YMapDefaultFeaturesLayer: asComponent<
        ReactifiedYMaps3Modules["YMapDefaultFeaturesLayer"]
      >(baseModule.YMapDefaultFeaturesLayer),
      YMapDefaultSchemeLayer: asComponent<
        ReactifiedYMaps3Modules["YMapDefaultSchemeLayer"]
      >(baseModule.YMapDefaultSchemeLayer),
      YMapMarker: asComponent<ReactifiedYMaps3Modules["YMapMarker"]>(
        baseModule.YMapMarker,
      ),
    };
  })();

  return reactifiedModulesPromise;
};
