export interface getAllContactResponse {
  message: string;
  data: Contact[];
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  photo: string;
}

export type IResponseFormat<K = null, V = null> = {
  response: K | null;
  error: V | null;
};

export type RequestContact = {
  firstName: string;
  lastName: string;
  age: string | number;
  photo: string;
};
