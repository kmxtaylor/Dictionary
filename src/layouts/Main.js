// import { SafeAreaView, StatusBar } from 'react-native';
import { SafeAreaView, StatusBar } from 'components/themed';

const Main = ({children}) => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
          {children}
      </SafeAreaView>
    </>
  );
};

export default Main;
