// import { SafeAreaView, StatusBar } from 'components/themed';
import { SafeAreaView, StatusBar } from 'react-native';

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
