import useContact from '../stores/useContact';
import AxiosClient from './AxiosClient';
import ListUrl from './ListUrl';
import {IResponseFormat, RequestContact, getAllContactResponse} from './types';

export const getAllContact = async (): Promise<
  IResponseFormat<String, String>
> => {
  try {
    const res = await AxiosClient.get(ListUrl.contact);
    const data = res.data as getAllContactResponse;

    const {setListContact} = useContact.getState();

    setListContact(data?.data);

    return {
      response: data.message,
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.data?.message;
    return {
      response: null,
      error: errorData,
    };
  }
};

export const addNewContact = async (
  dataPost: RequestContact,
): Promise<IResponseFormat<String, String>> => {
  try {
    const res = await AxiosClient.post(ListUrl.contact, dataPost);
    // const data = res.data as getAllContactResponse;
    return {
      response: 'Success add new contact',
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.data?.message;
    return {
      response: null,
      error: 'Something wrong. Please try again later.',
    };
  }
};

export const editContact = async (
  dataPost: RequestContact,
  userId: string | number,
): Promise<IResponseFormat<String, String>> => {
  try {
    const res = await AxiosClient.put(`${ListUrl.contact}/${userId}`, dataPost);
    // const data = res.data as getAllContactResponse;
    return {
      response: 'Success edit contact',
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.data?.message;
    return {
      response: null,
      error: 'Something wrong. Please try again later.',
    };
  }
};

export const deleteContact = async (
  userId: string | number,
): Promise<IResponseFormat<String, String>> => {
  try {
    const res = await AxiosClient.delete(`${ListUrl.contact}/${userId}`);
    // const data = res.data as getAllContactResponse;
    return {
      response: 'Success delete contact',
      error: null,
    };
  } catch (err) {
    const errorData = err?.response?.data?.message;
    return {
      response: null,
      error: 'Something wrong. Please try again later.',
    };
  }
};
