import {create} from 'zustand';
import {Contact} from '../services/types';

type IState = {
  listContact: Contact[] | [];
  setListContact: (list: Contact[]) => void;
  detailContact: Contact | null;
  setDetailContact: (detailContact: Contact | null) => void;
};

const useContact = create<IState>((set, get) => ({
  listContact: [],
  setListContact: listContact => set({listContact}),
  detailContact: null,
  setDetailContact: detailContact => set({detailContact}),
}));

export default useContact;
