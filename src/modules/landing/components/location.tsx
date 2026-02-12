"use client";

import Section from "@/components/ui/section";
import LocationMap from "./location-map";

export type OurLocationProps = {
  title?: string;
  subtitle?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
};

const DEFAULT_LOCATION = {
  title: "Где нас найти?",
  subtitle: "г. Пермь, Советской армии 52, этаж 128, офис 812",
  lat: 55.751574,
  lng: 37.573856,
  zoom: 16,
};

export default function OurLocation({
  title = DEFAULT_LOCATION.title,
  subtitle = DEFAULT_LOCATION.subtitle,
  lat = DEFAULT_LOCATION.lat,
  lng = DEFAULT_LOCATION.lng,
  zoom = DEFAULT_LOCATION.zoom,
}: OurLocationProps) {
  return (
    <Section
      id={"our-location"}
      className="container mx-auto"
      title={title}
      subtitle={subtitle}
    >
      <LocationMap lat={lat} lng={lng} zoom={zoom} />
    </Section>
  );
}
