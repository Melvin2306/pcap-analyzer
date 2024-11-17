"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createSubmitHandler, FormValues } from "@/components/PcapUploader";
import { toast } from "sonner";

export default function Home() {
  const [fileError, setFileError] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = createSubmitHandler(setFileError);

  const handleSubmit = async (values: FormValues) => {
    toast.promise(
      async () => {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Error during submission:", error);
          throw error; // Rethrow to trigger the error toast
        }
      },
      {
        loading: "Uploading file...",
        success: "File processed successfully!",
        error: `An error occurred while processing the file.`,
      }
    );
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Upload your PCAP file here
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="file"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>PCAP File</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="file"
                      accept=".pcap"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your PCAP file here. Only .pcap files are accepted.
                  </FormDescription>
                  <FormMessage />
                  {fileError && <p className="text-red-500">{fileError}</p>}
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    </div>
  );
}
