import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import useContact from './stores/useContact';
import {getAllContact} from './services/ContactServices';
import {SafeAreaView} from 'react-native-safe-area-context';
import Popup from './Popup';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

const Main = () => {
  const {listContact, setDetailContact} = useContact(state => state);
  const [loading, setLoading] = useState(false);
  const [isShowPopup, setShowPopup] = useState(false);

  React.useEffect(() => {
    loadAllContact();
    return () => {};
  }, []);

  const loadAllContact = async () => {
    setLoading(true);
    const {response, error} = await getAllContact();
    setLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, padding: 16, backgroundColor: '#F8F8F8'}}>
      <Text
        style={{
          width: '100%',
          textAlign: 'center',
          paddingVertical: 12,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        Contact App
      </Text>
      {loading && <Loading />}

      {isShowPopup && (
        <Popup
          onDismiss={() => setShowPopup(false)}
          visible={isShowPopup}
          refetch={loadAllContact}
        />
      )}

      <FlatList
        data={listContact}
        ItemSeparatorComponent={<View style={{height: 8}} />}
        renderItem={({item}) => {
          return (
            <ItemContact
              item={item}
              onPress={() => {
                setShowPopup(true);
                setDetailContact(item);
              }}
            />
          );
        }}
      />
      <AddIcon
        onPress={() => {
          setShowPopup(true);
        }}
      />
    </SafeAreaView>
  );
};

export default Main;

const ItemContact = ({item, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12,
      }}
      onPress={onPress}>
      <Avatar
        photo={item.photo}
        firstName={item.firstName}
        lastName={item.lastName}
      />
      <Text>
        {item?.firstName} {item?.lastName}
      </Text>
    </TouchableOpacity>
  );
};
const Avatar = ({
  photo,
  firstName,
  lastName,
}: {
  photo: string;
  firstName: string;
  lastName: string;
}) => {
  if (photo.toUpperCase() != 'N/A') {
    return (
      <FastImage
        source={{uri: photo}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
        resizeMode={'cover'}
      />
    );
  }

  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
      }}>
      <Text>{firstName?.[0]}</Text>
      <Text>{lastName?.[0]}</Text>
    </View>
  );
};

const AddIcon = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#00B2FF',
          position: 'absolute',
          bottom: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./assets/plus-white.png')}
          style={{
            width: 23,
            height: 23,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const Loading = () => {
  return (
    <ActivityIndicator
      animating={true}
      color={MD2Colors.red800}
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: 999,
      }}
    />
  );
};
