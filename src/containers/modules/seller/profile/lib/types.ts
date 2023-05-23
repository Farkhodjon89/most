export type FormValues = {
  name: string;
  inn: string;
  kpp: string;
  ogrn: string;
  foundedYear: string;
  registeredAddress: string;
  factAddress: string;
  employeesCountId: number | null;
  description: string;
  owner: string;
  businessTypes: number[];
  email: string;
  phone: { phone: string } | null;
  webLink: string;
  documents: { name: string; uuid: string }[];
};
