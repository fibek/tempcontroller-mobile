import {useColorScheme} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text, TouchableHighlightBase } from 'react-native';
import InputSpinner from 'react-native-input-spinner';

type Props = {
  onPress?: () => void;
  title: string;
};

export const SmallButton: React.FC<Props> = ({ onPress, title }) => {
  return (
    <Pressable
      style={{
	marginVertical: 15,
        borderColor: '#2e2e2e',
        borderWidth: 1,
        padding: 10,
        width: 160,
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#151515',
      }}
      onPress={onPress}
    >
      <Text style={{ color: 'white', fontSize: 19 }}>{title}</Text>
    </Pressable>
  );
};


const TEMP = 31;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontSize: 21, marginVertical: 30}}>
	temperatura: 
	<Text style={{color:(TEMP > 21 ? '#f04048' : (TEMP < 17 ? '#40c5f4' : 'white')),fontSize: 24,fontWeight: 'bold'}}> {TEMP}°C </Text>
      </Text>
      <InputSpinner
	  skin={'clean'}
	  style={styles.item}
	  width={180}
          max={10}
          min={2}
          step={2}
          colorMax={"#f04048"}
          colorMin={"#40c5f4"}
          value={4}
          onChange={(num) => {
          	console.log(num);
          }}
      />
      <SmallButton title="SUBMIT" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    primary: '#ffffff',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginVertical: 20,
    color: 'white',
  },
});
