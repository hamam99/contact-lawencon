import React, {useEffect, useState} from 'react';
import {Text, Modal, Portal, TextInput, Button} from 'react-native-paper';
import {ToastAndroid} from 'react-native';
import useContact from './stores/useContact';
import {
  addNewContact,
  deleteContact,
  editContact,
} from './services/ContactServices';

type IProps = {
  visible: boolean;
  onDismiss: () => void;
  refetch: () => void;
};
const Popup = ({visible, onDismiss, refetch}: IProps) => {
  const {setDetailContact, detailContact} = useContact(state => state);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [profileUrl, setProfileUrl] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && detailContact) {
      console.log(`detailContact`, {detailContact, age: detailContact?.age});
      setFirstName(detailContact.firstName);
      setLastName(detailContact?.lastName);
      setAge(detailContact?.age);
      setProfileUrl(detailContact?.photo);
    }
  }, [visible]);

  const doAction = async () => {
    if (detailContact) {
      await doAddNewContact('edit');

      return;
    }

    await doAddNewContact('new');
  };

  const doAddNewContact = async (type = 'new') => {
    setLoading(true);
    const data = {
      firstName,
      lastName,
      age,
      photo: profileUrl ?? 'N/A',
    };

    const userId = detailContact?.id;
    const {response, error} =
      type == 'edit'
        ? await editContact(data, userId)
        : await addNewContact(data);

    setLoading(false);
    ToastAndroid.showWithGravity(
      response ?? error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    if (response) {
      resetForm();
      onDismiss();
      refetch();
    }
  };

  const resetForm = () => {
    setFirstName(null);
    setLastName(null);
    setAge(null);
    setProfileUrl(null);
  };

  const doDelete = async () => {
    setLoading(true);
    const userId = detailContact?.id;
    const {response, error} = await deleteContact(userId);

    setLoading(false);
    ToastAndroid.showWithGravity(
      response ?? error,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );

    if (response) {
      resetForm();
      onDismiss();
      refetch();
    }
  };

  const isAllFormFilled = () => {
    if (!firstName || !lastName || !age) {
      return false;
    }

    return true;
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          onDismiss();
          setDetailContact(null);
          resetForm();
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          gap: 8,
          borderRadius: 16,
        }}
        style={{
          marginHorizontal: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {detailContact ? 'Edit Contact' : ' Add Contact'}
        </Text>
        <TextInput
          label={'First Name'}
          mode="outlined"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          label={'Last Name'}
          mode="outlined"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          label={'Age'}
          mode="outlined"
          inputMode="numeric"
          value={age?.toString()}
          onChangeText={text => setAge(text)}
        />
        <TextInput
          label={'Profile URL'}
          mode="outlined"
          value={profileUrl}
          onChangeText={text => setProfileUrl(text)}
        />

        <Button
          disabled={!isAllFormFilled()}
          loading={loading}
          mode="contained"
          onPress={doAction}
          style={{
            marginTop: 16,
            borderRadius: 8,
          }}>
          {detailContact ? 'Edit Contact' : ' Add Contact'}
        </Button>
        {detailContact && (
          <Button
            loading={loading}
            mode="contained"
            onPress={doDelete}
            style={{
              //   marginTop: 4,
              borderRadius: 8,
              backgroundColor: 'red',
            }}>
            {'Delete Contact'}
          </Button>
        )}
      </Modal>
    </Portal>
  );
};

export default Popup;
