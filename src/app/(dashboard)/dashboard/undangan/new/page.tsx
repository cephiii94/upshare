import { UndanganEditor } from "@/components/dashboard/undangan-editor";

export default async function NewUndanganEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const theme = typeof resolvedParams.theme === "string" ? resolvedParams.theme : "modern-romance";

  // Create a "Draft" tenant object
  const draftTenant = {
    id: null, // null ID indicates this is a draft (new)
    subdomain: "draft-preview",
    category: "undangan",
    template_data: {
      theme_id: theme,
      nama_pria: "",
      nama_wanita: "",
      tanggal_acara: "",
      lokasi_acara: ""
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <UndanganEditor tenant={draftTenant} />
    </div>
  );
}
