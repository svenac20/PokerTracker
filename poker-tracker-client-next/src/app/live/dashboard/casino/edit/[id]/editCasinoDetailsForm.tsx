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
    },
  });

  async function onSubmitEditCasinoDetails(
    data: z.infer<typeof casinoDetailsSchema>
  ) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/casino/${casino.id}`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(response.statusText);
      console.error(response.text())
      toast({
        title: "Error",
        description: "An error occurred while editing casino information",
        className: "bg-red-500 text-white",
      });
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
