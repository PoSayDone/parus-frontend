import PageTemplate from "@/modules/common/templates/page-template";
import ServicesList from "../components/services-list";

export default function ServicesTemplate() {
  return (
    <PageTemplate
      title="Наши услуги"
      description="Мы предоставляем полный спектр ритуальных услуг с заботой и пониманием. Наша команда профессионалов поможет вам в трудную минуту, взяв на себя все организационные вопросы и обеспечив достойное прощание с вашими близкими."
      rootClassName="bg-background"
      contactSection={{
        title: `Нужна
        консультация?`,
        description:
          "Наши специалисты готовы ответить на все ваши вопросы и помочь выбрать подходящие услуги. Мы работаем круглосуточно и всегда готовы прийти на помощь.",
      }}
    >
      <ServicesList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-8" />
    </PageTemplate>
  );
}
