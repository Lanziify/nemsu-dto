import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import clsx from "clsx";
import { DefaultPropertyWithId } from "@/types/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OneTimeFormDialog<T extends ZodType<any, any, any>> = {
  title: string;
  description?: string;
  triggerButtonText: string;
  fields: OneTimeFormDialogField<T>[];
  defaultValues?: z.infer<T>;
  submitHandler: SubmitHandler<z.infer<T>>;
  schema: T;
  closeButton: React.ReactNode;
  submitButton: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OneTimeFormDialogField<T extends ZodType<any, any, any>> =
  | {
      name: Path<z.infer<T>>;
      label: string;
      type: "text";
    }
  | {
      name: Path<z.infer<T>>;
      label: string;
      type: "select";
      items: DefaultPropertyWithId[];
    };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function OneTimeFormDialog<T extends ZodType<any, any, any>>(
  props: OneTimeFormDialog<T>,
) {
  const form = useForm<z.infer<T>>({
    mode: "all",
    resolver: zodResolver(props.schema),
    defaultValues: props.defaultValues
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>{props.triggerButtonText || "Open"}</Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(props.submitHandler)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>{props.title}</DialogTitle>
              {props.description && (
                <DialogDescription>{props.description}</DialogDescription>
              )}
            </DialogHeader>
            {props.fields.map((f) => (
              <FormField
                key={String(f.name)}
                control={form.control}
                name={f.name}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{f.label}</FormLabel>
                    {f.type === "text" ? (
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={String(f.label)}
                          className={clsx({
                            "border-red-500 placeholder:text-red-500":
                              fieldState.error,
                          })}
                        />
                      </FormControl>
                    ) : (
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder={`Select ${f.label}`} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {f.items?.map((item) => (
                            <SelectItem key={item.refId} value={item.refId}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <DialogClose asChild>
                {props.closeButton ?? <Button>Close</Button>}
              </DialogClose>
              {props.submitButton && props.submitButton}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
