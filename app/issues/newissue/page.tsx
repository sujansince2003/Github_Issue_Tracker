"use client";
import { TextField, Button, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issueschema } from "@/app/zodvalidationSchemas";
import { z } from "zod";
import { ErrorMessage, Spinnner } from "@/app/components";
import axios from "axios";

// interface IssueForm {
//   title: string;
//   description: string;
// } we are using this ts interface but we have zod schema too so we can use that to get ts Type
type IssueForm = z.infer<typeof Issueschema>;

const AddnewIssue = async () => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
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
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
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

export default AddnewIssue;
