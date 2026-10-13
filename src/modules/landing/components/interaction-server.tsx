import { getSiteSettings } from "@/lib/data/site-settings";
import Interaction, { type InteractionProps } from "./interaction";

// Серверная обёртка: подставляет телефон из настроек сайта
export default async function InteractionWithSettings(props: InteractionProps) {
  const settings = await getSiteSettings();

  return <Interaction {...props} phone={settings?.phone || props.phone} />;
}
