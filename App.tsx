/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import useContact from './src/stores/useContact';
import {getAllContact} from './src/services/ContactServices';
import {
  ActivityIndicator,
  MD2Colors,
  Text,
  FAB,
  PaperProvider,
  Modal,
  Portal,
} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import Popup from './src/Popup';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
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
    <>
      <Toast />

      <PaperProvider>
        <SafeAreaView
          style={{flex: 1, padding: 16, backgroundColor: '#F8F8F8'}}>
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
          {loading && (
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
          )}

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
                  onPress={() => {
                    setShowPopup(true);
                    setDetailContact(item);
                  }}>
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
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPopup(true);
            }}>
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
                source={require('./src/assets/plus-white.png')}
                style={{
                  width: 23,
                  height: 23,
                }}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;

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
