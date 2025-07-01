export type SearchFormProps = {
  city: string;
  setCity: (city: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};
