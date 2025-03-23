"use client";

import { LoadingSpinner } from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { CasinoCardData } from "@/lib/types";
import { casinoDetailsSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CasinoInformationInput from "./casinoInformationInput";
import CasinoLocationInput from "./casinoLocationInput";
import CasinoRakeInput from "./casinoRakeInput";
import CasinoImageInput from "./casinoPhotoInput";

interface EditCasinoDetailsFormProps {
  casino: CasinoCardData;
}

const EditCasinoDetailsForm: FunctionComponent<EditCasinoDetailsFormProps> = ({
  casino,
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof casinoDetailsSchema>>({
    resolver: zodResolver(casinoDetailsSchema),
    defaultValues: {
      location: casino.location ?? "",
      information: casino.information ?? "",
      rake: casino.rake ?? "",
      imageUrl: casino.imageUrl,
      image: new File([], ""),
    },
  });

  async function onSubmitEditCasinoDetails(
    data: z.infer<typeof casinoDetailsSchema>,
  ) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (data.image) {
      formData.append("image", data.image);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/casino/${casino.id}`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      toast({
        title: "Error",
        description: "An error occurred while editing casino information",
        className: "bg-red-500 text-white",
      });
      return;
    }

    toast({
      title: "Casino information updated",
      description: "Casino information has been updated sucessfully",
    });
    router.push("/live/dashboard/casino");
  }

  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={form.handleSubmit(onSubmitEditCasinoDetails)}
      >
        <div className="grid grid-cols-1 gap-6 lg:w-1/2">
          <CasinoLocationInput form={form} />
          <CasinoRakeInput form={form} />
          <CasinoInformationInput form={form} />
          <CasinoImageInput form={form} />
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCasinoDetailsForm;
