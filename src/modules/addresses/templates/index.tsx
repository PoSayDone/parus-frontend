import PageTemplate from "@/modules/common/templates/page-template";
import AddressesList from "../components/addresses-list";

export default function AddressesTemplate() {
  return (
    <PageTemplate
      title="Полезные адреса в Перми"
      description="На этой странице собраны важные адреса и контактная информация городских учреждений Перми — ЗАГСов, моргов и кладбищ. Эти данные помогут вам быстро найти нужное место и уточнить время работы."
      contactSection={{
        title: "Нужна консультация?",
        description:
          "Наши специалисты готовы ответить на все ваши вопросы и помочь в организации ритуальных услуг. Мы работаем круглосуточно и всегда готовы прийти на помощь.",
      }}
    >
      <AddressesList />
    </PageTemplate>
  );
}
