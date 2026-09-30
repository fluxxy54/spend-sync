"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
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

type CategoryItem = {
  label: string;
  value: string;
};

type CategoryResponseItem = {
  category_name: string;
  category_id: number | string;
};

export function AddButton() {
  const [isPopup1Open, setIsPopup1Open] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [amount, setAmount] = useState<number | string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  // Categories State
  const [items, setItems] = useState<CategoryItem[]>([]);

  // 1. Fetch categories safely on component mount to prevent build errors
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use relative path to avoid CORS and production issues
        const response = await fetch("/api/category");
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        // Map data and convert IDs to strings (shadcn Select requires string values)
        const formattedItems = data.transactions.map(
          (cat: CategoryResponseItem) => ({
            label: cat.category_name,
            value: String(cat.category_id),
          }),
        );

        setItems(formattedItems);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 2. The Save Action (now inside the component to access state)
  const handleSave = async () => {
    // 1. Validation: Stop immediately if fields are empty
    if (!amount || !date || !category) {
      alert("Please fill in the amount, date, and category.");
      return;
    }

    try {
      setIsSaving(true);

      // Format the date for PostgreSQL (converts the Date object to "YYYY-MM-DD")
      const formattedDate = date.toLocaleDateString("en-CA");

      // 2. Send the POST request
      const response = await fetch("/api/add-expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Properly structured JSON object
        body: JSON.stringify({
          amount: Number(amount),
          date: formattedDate,
          category_id: Number(category),
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save transaction");
      }

      // 3. Reset form and close popup on success
      alert("Expense saved successfully!");
      setAmount("");
      setDate(undefined);
      setCategory(null);
      setDescription("");
      setIsPopup1Open(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("There was a problem saving your expense.");
    } finally {
      setIsSaving(false);
    }
  };

  const openNextPopup = () => {
    setIsPopup1Open(false);
  };

  return (
    <>
      <Button onClick={() => setIsPopup1Open(true)}>Add Expense</Button>

      {isPopup1Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-10 min-h-70 rounded-lg shadow-lg w-full max-w-3xl relative">
            <FieldSet>
              <FieldLegend className="mb-5">Expenses</FieldLegend>
              <FieldGroup className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="amount">Amount</FieldLabel>
                  <Input
                    id="amount"
                    autoComplete="off"
                    type="number"
                    placeholder="0.00"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Date</FieldLabel>
                  <DatePickerDemo date={date} setDate={setDate} />
                </Field>

                <Field className="w-full max-w-full">
                  <FieldLabel>Category</FieldLabel>
                  <Select value={category ?? ""} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {items.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Input
                    id="description"
                    autoComplete="off"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field>

                <Field orientation="horizontal">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => openNextPopup()}
                    disabled={isSaving}
                  >
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
