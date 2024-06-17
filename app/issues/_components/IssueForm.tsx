"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issueschema } from "@/app/zodvalidationSchemas";
import { z } from "zod";
import { ErrorMessage, Spinnner } from "@/app/components";
import axios from "axios";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// interface IssueForm {
//   title: string;
//   description: string;
// } we are using this ts interface but we have zod schema too so we can use that to get ts Type
type IssueFormData = z.infer<typeof Issueschema>;

interface Props {
  issuedataToEdit?: Issue;
}

const IssueForm = ({ issuedataToEdit }: Props) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(Issueschema),
  });

  const router = useRouter();

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-6">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsSubmitting(true);
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsSubmitting(false);
            setError("An unexpected error occured");
          }
        })}
        className="space-y-6"
      >
        <TextField.Root
          defaultValue={issuedataToEdit?.title}
          placeholder="Title"
          {...register("title")}
        />
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issuedataToEdit?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description of Issue" {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinnner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
