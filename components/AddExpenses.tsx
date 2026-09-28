"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Switch } from "@base-ui/react";
import {
  Field,
  //   FieldContent,
  //   FieldDescription,
  //   FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  //   FieldSeparator,
  FieldSet,
  //   FieldTitle,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "./example-date-picker";

const response = await fetch("http://localhost:3000/api/category");
if (!response.ok) {
  throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();

type categ = {
  category_name: string;
  category_id: number;
};

const items = data.transactions.map((data: categ) => ({
  label: data.category_name,
  value: data.category_id,
}));

export function AddButton() {
  const [isPopup1Open, setIsPopup1Open] = useState(false);

  const [amount, setAmount] = useState<number | string>(0);
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // 2. Helper function to transition from Popup 1 to Popup 2
  const openNextPopup = () => {
    setIsPopup1Open(false); // Close the current popup
    // setIsPopup2Open(true); // Open the next popup
  };
  return (
    <>
      <Button onClick={() => setIsPopup1Open(true)}>Add Expense</Button>

      {isPopup1Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-10  min-h-70 rounded-lg shadow-lg w-full max-w-3xl relative">
            <FieldSet>
              <FieldLegend className="mb-5">Expenses</FieldLegend>
              <FieldGroup className="grid  grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Amount</FieldLabel>
                  <Input
                    id="number"
                    autoComplete="off"
                    type="number"
                    placeholder="0.00"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="username">Date</FieldLabel>
                  <DatePickerDemo date={date} setDate={setDate} />
                </Field>

                <Field className="w-full max-w-full">
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    items={items}
                    value={category ?? ""}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {items.map((item: { value: number; label: string }) => (
                          <SelectItem
                            key={item.value}
                            value={String(item.value)}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="username">Description</FieldLabel>
                  <Input
                    id="username"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field>

                <Field orientation="horizontal">
                  <Button>Save</Button>
                  <Button variant="destructive" onClick={() => openNextPopup()}>
                    Close
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </div>
        </div>
      )}
    </>
  );
}
const handleSave = async () => {
  return console.log("test");
};

//  onClick={handleSave()}