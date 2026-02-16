export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full relative mx-auto">{children}</main>
  );
}
