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
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/custom/loading";
import axios from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CasinoLocationInput from "./casinoLocationInput";
import { revalidatePath } from "next/cache";

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
    try {
      const response = await axios.post<CasinoCardData>(
        `/api/casino/${casino.id}`,
        data
      );
      toast({
        title: "Casino information updated",
        description: "Casino information has been updated sucessfully",
      });
      router.push("/live/dashboard/casino");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while editing casino information",
        className: "bg-red-500 text-white",
      });
    }
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
