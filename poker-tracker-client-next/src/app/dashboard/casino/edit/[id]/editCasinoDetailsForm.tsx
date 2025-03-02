"use client";

import { Form } from "@/components/ui/form";
import { CasinoCardData } from "@/lib/types";
import { casinoDetailsSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CasinoRakeInput from "./casinoRakeInput";
import CasinoInformationInput from "./casinoInformationInput";

interface EditCasinoDetailsFormProps {
  casino: CasinoCardData;
}

const EditCasinoDetailsForm: FunctionComponent<EditCasinoDetailsFormProps> = ({
  casino,
}) => {
  const form = useForm<z.infer<typeof casinoDetailsSchema>>({
    resolver: zodResolver(casinoDetailsSchema),
    defaultValues: {
      information: casino.information ?? "",
      rake: casino.rake ?? "",
    },
  });

  async function onSubmitEditCasinoDetails(
    data: z.infer<typeof casinoDetailsSchema>
  ) {
    console.log("edit rake and info");
  }

  return (
    <Form {...form}>
      <form
        className=""
        onSubmit={form.handleSubmit(onSubmitEditCasinoDetails)}
      >
        <div className="grid grid-cols-1 gap-6 lg:w-1/2">
            <CasinoRakeInput form={form} />
            <CasinoInformationInput form={form} />
        </div>
      </form>
    </Form>
  );
};

export default EditCasinoDetailsForm;
