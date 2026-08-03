import { TypographyH3 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAddresses } from "@/lib/data/addresses";
import Link from "next/link";

// Функция для определения статуса по ключевым словам
const getStatusInfo = (note?: string | null) => {
  if (!note) return null;
  const lowerNote = note.toLowerCase();
  
  if (lowerNote.includes("открыто для новых захоронений")) {
    return { color: "bg-green-500", text: "открыто" };
  }
  if (lowerNote.includes("открыто только для подзахоронений")) {
    return { color: "bg-orange-500", text: "ограничения" };
  }
  if (lowerNote.includes("закрыто для всех видов захоронений")) {
    return { color: "bg-red-500", text: "закрыто" };
  }
  
  return null;
};

export default async function AddressesList() {
  const {
    response: { data: addresses },
  } = await listAddresses({
    page: 1,
    queryParams: { limit: 100 },
  });

  const zagsData = addresses.filter((address) => address.type === "zags");
  const morguesData = addresses.filter((address) => address.type === "morgue");
  const cemeteriesData = addresses.filter(
    (address) => address.type === "cemetery",
  );

  return (
    <>
      {/* Cemeteries Section */}
      <div>
        <TypographyH3 className="mb-4 lg:mb-12" asChild>
          <h2>Кладбища города Перми</h2>
        </TypographyH3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {cemeteriesData.map((cemetery) => {
			  // ЗАКОММЕНТИРОВАЛИ ЛОГИКУ КАРТИНКИ (на случай отката)
            /*
            const primaryImage =
              cemetery.cemeteryThumbnail || cemetery.cemeteryImages?.[0];
			*/
            
			  {/* ЗАКОММЕНТИРОВАЛИ ФОНОВУЮ КАРТИНКУ В КАРТОЧКЕ
                <div
                  className="pointer-events-none absolute right-0 top-0 h-full w-64 opacity-100"
                  style={{
                    backgroundImage: primaryImage
                      ? `url(${primaryImage})`
                      : "url(/placeholder.svg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    maskImage:
                      "linear-gradient(90deg, transparent 0%, #000 100%)",
                  }}
                />
				*/}
               
            // Передаем поле со статусом
            const statusInfo = getStatusInfo(cemetery.cemeteryStatus);

            const content = (
              <Card className="relative overflow-hidden h-full">
                <CardHeader className="flex flex-row items-start justify-between gap-2">
                  <CardTitle className="text-lg">
                    {cemetery.name}
                  </CardTitle>
                  
                  {/* Выводим точку и текст вместе */}
                  {statusInfo && (
                    <div className="flex items-center gap-1.5 shrink-0 mt-1.5 bg-muted/50 px-2 py-1 rounded-md">
                      <div className={`h-2.5 w-2.5 rounded-full ${statusInfo.color} shadow-sm`} />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {statusInfo.text}
                      </span>
                    </div>
                  )}
                </CardHeader>
				
                <CardContent>
                  <div className="space-y-2">
                    {cemetery.address && (
                      <div>
                        <p className="text-sm text-muted-foreground">Адрес</p>
                        <p>{cemetery.address}</p>
                      </div>
                    )}
                    {cemetery.district && (
                      <div>
                        <p className="text-sm text-muted-foreground">Район</p>
                        <p>{cemetery.district}</p>
                      </div>
                    )}
                    {cemetery.phone?.length ? (
                      <div>
                        <p className="text-sm text-muted-foreground">Телефон</p>
                        <p>{cemetery.phone.join(", ")}</p>
                      </div>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );

            return cemetery.handle ? (
              <Link
                key={cemetery.id}
                href={`/addresses/${cemetery.handle}`}
                className="block hover:opacity-90 transition-opacity"
              >
                {content}
              </Link>
            ) : (
              <div key={cemetery.id}>{content}</div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 lg:mt-24">
        <TypographyH3 className="mb-4 lg:mb-12" asChild>
          <h2>ЗАГС города Перми</h2>
        </TypographyH3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {zagsData.map((zags) => (
            <Card key={zags.id}>
              <CardHeader>
                <CardTitle className="text-lg max-w-[80%]">
                  {zags.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p>{zags.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p>{zags.phone?.length ? zags.phone.join(", ") : "—"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Morgues Section */}
      <div className="my-8 lg:my-24">
        <TypographyH3 className="mb-4 lg:mb-12" asChild>
          <h2>Морги города Перми</h2>
        </TypographyH3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {morguesData.map((morgue) => (
            <Card key={morgue.id} className="justify-between">
              <CardHeader>
                <CardTitle className="text-lg max-w-[80%]">
                  {morgue.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Адрес</p>
                  <p>{morgue.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">График работы</p>
                  <p>{morgue.schedule}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
