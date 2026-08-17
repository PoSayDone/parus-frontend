import AboutUs from "@/modules/landing/components/about-us";
import WhatShouldIDo from "@/modules/landing/components/actions";
import Hero from "@/modules/landing/components/hero";
import Interaction from "@/modules/landing/components/interaction";
import Memorials from "@/modules/landing/components/memorials";
import QnA from "@/modules/landing/components/q-n-a";
import WhyUs from "@/modules/landing/components/why-us";
import type { Config } from "@puckeditor/core";
import { getService } from "@/lib/data/services";
import {
  LandingAddressesEditor,
  PostsEditor,
  PricingEditor,
  RitualProductsEditor,
  ServicesEditor,
  TextBlockEditor,
  WhereToFindUsEditor,
} from "./editor-components";
import { landingComponentFields } from "./fields";
import type { LandingComponents } from "./types";

export const landingEditorConfig = {
  components: {
    Hero: {
      label: "Герой",
      ...landingComponentFields.Hero,
      render: ({
        title,
        subtitle,
        ctaLabel,
        ctaHref,
        actionCardText,
        actionCardHref,
      }) => (
        <Hero
          title={title}
          subtitle={subtitle}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          actionCardText={actionCardText}
          actionCardHref={actionCardHref}
        />
      ),
    },
    Services: {
      label: "Услуги (список)",
      ...landingComponentFields.Services,
      render: ({ title, subtitle }) => (
        <ServicesEditor title={title} subtitle={subtitle} />
      ),
    },
    WhyUs: {
      label: "Почему мы",
      ...landingComponentFields.WhyUs,
      render: ({
        title,
        item1Title,
        item1Description,
        item2Title,
        item2Description,
        item3Title,
        item3Description,
      }) => (
        <WhyUs
          title={title}
          item1Title={item1Title}
          item1Description={item1Description}
          item2Title={item2Title}
          item2Description={item2Description}
          item3Title={item3Title}
          item3Description={item3Description}
        />
      ),
    },
    Pricing: {
      label: "Цены (список)",
      ...landingComponentFields.Pricing,
      render: ({ title, subtitle, buttonLabel, buttonHref }) => (
        <PricingEditor
          title={title}
          subtitle={subtitle}
          buttonLabel={buttonLabel}
          buttonHref={buttonHref}
        />
      ),
    },
    AboutUs: {
      label: "О нас",
      ...landingComponentFields.AboutUs,
      render: ({
        title,
        paragraph1,
        paragraph2,
        cards,
        buttonLabel,
        buttonDisabled,
      }) => (
        <AboutUs
          title={title}
          paragraph1={paragraph1}
          paragraph2={paragraph2}
          cards={cards}
          buttonLabel={buttonLabel}
          buttonDisabled={buttonDisabled}
        />
      ),
    },
    Actions: {
      label: "Что делать",
      ...landingComponentFields.Actions,
      render: ({
        title,
        subtitle,
        step1Title,
        step1Description,
        step2Title,
        step2Description,
        step3Title,
        step3Description,
        step4Title,
        step4Description,
        ctaLabel,
        ctaNote,
      }) => (
        <WhatShouldIDo
          title={title}
          subtitle={subtitle}
          step1Title={step1Title}
          step1Description={step1Description}
          step2Title={step2Title}
          step2Description={step2Description}
          step3Title={step3Title}
          step3Description={step3Description}
          step4Title={step4Title}
          step4Description={step4Description}
          ctaLabel={ctaLabel}
          ctaNote={ctaNote}
        />
      ),
    },
    RitualProducts: {
      label: "Ритуальные товары",
      ...landingComponentFields.RitualProducts,
      render: ({ title, subtitle }) => (
        <RitualProductsEditor title={title} subtitle={subtitle} />
      ),
    },
    Memorials: {
      label: "Памятники",
      ...landingComponentFields.Memorials,
      resolveData: async ({ props }) => {
        const service = await getService("izgotovlenie-pamyatnikov").catch(() => null);
        const allGalleryImages = service?.images?.filter((img) => img !== service.thumbnail) || [];
        const galleryImages = allGalleryImages.slice(0, 4);
        return { props: { ...props, galleryImages } };
      },
      render: ({
        title,
        subtitle,
        illustrations,
        features,
        paragraph,
        ctaLabel,
        detailsButtonLabel,
        detailsButtonHref,
        detailsButtonDisabled,
        galleryImages,
      }) => (
        <Memorials
          title={title}
          subtitle={subtitle}
          illustrations={illustrations}
          features={features}
          paragraph={paragraph}
          ctaLabel={ctaLabel}
          detailsButtonLabel={detailsButtonLabel}
          detailsButtonHref={detailsButtonHref}
          detailsButtonDisabled={detailsButtonDisabled}
          galleryImages={galleryImages}
        />
      ),
    },
    QnA: {
      label: "Вопрос-ответ",
      ...landingComponentFields.QnA,
      render: ({ title, subtitle, questions }) => (
        <QnA title={title} subtitle={subtitle} questions={questions} />
      ),
    },
    Interaction: {
      label: "Связаться",
      ...landingComponentFields.Interaction,
      render: ({ title, highlight, description, ctaLabel, ctaHref }) => (
        <Interaction
          title={title}
          highlight={highlight}
          description={description}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      ),
    },
    Posts: {
      label: "Статьи (список)",
      ...landingComponentFields.Posts,
      render: ({ title, subtitle, buttonLabel, buttonHref }) => (
        <PostsEditor
          title={title}
          subtitle={subtitle}
          buttonLabel={buttonLabel}
          buttonHref={buttonHref}
        />
      ),
    },
    Cemetries: {
      label: "Адреса",
      ...landingComponentFields.Cemetries,
      render: ({ title, subtitle }) => (
        <LandingAddressesEditor title={title} subtitle={subtitle} />
      ),
    },
    WhereToFindUs: {
      label: "Карта и контакты",
      ...landingComponentFields.WhereToFindUs,
      render: ({ title, subtitle, lat, lng, zoom }) => (
        <WhereToFindUsEditor
          title={title}
          subtitle={subtitle}
          lat={lat}
          lng={lng}
          zoom={zoom}
        />
      ),
    },
    TextBlock: {
      label: "Заголовок + текст",
      ...landingComponentFields.TextBlock,
      render: ({ id, title, text }) => (
        <TextBlockEditor id={id} title={title} text={text} />
      ),
    },
  },
} satisfies Config<LandingComponents>;
