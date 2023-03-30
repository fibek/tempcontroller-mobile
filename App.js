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


let TEMP = 26;
let Tsetting = 16;
let Psetting = 1.4;
let Isetting = 1;
let Dsetting = 0.001;
let STsetting = 15;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontSize: 21, marginVertical: 30}}>
	temperatura: 
	<Text style={{color:(TEMP > 20 ? '#f04048' : (TEMP < 10 ? '#40c5f4' : 'white')),fontSize: 24,fontWeight: 'bold'}}> {TEMP}°C </Text>
      </Text>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> T </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
      	    max={24}
      	    min={8}
      	   step={1}
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={Tsetting}
      	    onChange={(num) => {
      	    	Tsetting = num;
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> P </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
	    type={"real"}
      	    max={10}
      	    min={0}
	    step={0.1}
	    precision={1} 
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={Psetting}
      	    onChange={(num) => {
      	    	Psetting = num;
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> I </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
	    type={"real"}
      	    max={10}
      	    min={0}
	    step={0.1}
	    precision={1} 
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={Isetting}
      	    onChange={(num) => {
      	    	Isetting = num;
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> D </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
	    type={"real"}
      	    max={10}
      	    min={0}
	    step={0.005}
	    precision={3} 
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={Dsetting}
      	    onChange={(num) => {
      	    	Dsetting = num;
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> ST </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
      	    max={30}
      	    min={1}
	    step={1}
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={STsetting}
      	    onChange={(num) => {
      	    	STsetting = num;
      	    }}
      	/>
      </View>
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
  buttonslayout: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-evenly',
  },
  item: {
    marginVertical: 20,
    color: 'white',
  },
});
