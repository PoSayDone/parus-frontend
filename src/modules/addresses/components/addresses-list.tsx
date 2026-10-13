import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listAddresses } from "@/lib/data/addresses";
import Link from "next/link";
import CemeteryStatus from "./cemetery-status";

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
        <h2 className="block-title">Кладбища города Перми</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {cemeteriesData.map((cemetery) => {
            const content = (
              <Card className="h-full transition-colors group-hover:border-primary/40">
                <CardHeader className="flex flex-row items-start justify-between gap-2">
                  <CardTitle className="text-lg">
                    {cemetery.name}
                  </CardTitle>
                  <CemeteryStatus note={cemetery.cemeteryStatus} className="mt-0.5" />
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
                className="group block"
              >
                {content}
              </Link>
            ) : (
              <div key={cemetery.id}>{content}</div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="block-title">ЗАГС города Перми</h2>
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
                  <p>{zags.phone?.length ? zags.phone.join(", ") : "Не указан"}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Morgues Section */}
      <div>
        <h2 className="block-title">Морги города Перми</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {morguesData.map((morgue) => (
            <Card key={morgue.id}>
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
