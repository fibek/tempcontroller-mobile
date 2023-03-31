import {useColorScheme, ActivityIndicator} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text, TouchableHighlightBase } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import React, { useState, useEffect } from 'react';

type Props = {
  onPress?: () => void;
  title: string;
};

const url='http://192.168.1.44:8000';

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


export default function App() {
  const [TEMP, setTEMP] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [T, setT] = useState(0);
  const [P, setP] = useState(0);
  const [I, setI] = useState(0);
  const [D, setD] = useState(0);
  const [ST, setST] = useState(0);
 
  const loadAll = async () => {
    try {
      const response = await fetch(url+'/pid/status');
      const json = await response.json();
      setTEMP(json.Temperature);
      setT(json.Temperature);
      setP(json.P);
      setI(json.I);
      setD(json.D);
      setST(json.SampleTime);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const fetchTEMP = async() => {
    try {
      const response = await fetch(url+'/pid/status');
      const json = await response.json();
      setTEMP(json.Temperature);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadAll();

    const interval = setInterval(() => {
      fetchTEMP();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const SendData = async() => {
    try {
      const response = await fetch(url+'/pid/set', {
	method: 'PUT',
	headers: {
	  Accept: 'application/json',
	  'Content-Type': 'application/json',
	},
	body: JSON.stringify({
	  temp: T,
	  p: P,
  	  i: I,
  	  d: D,
  	  st: ST,
	}),
      });
      console.log(response.ok);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{color:'white',fontSize: 21, marginVertical: 30}}>
	temperatura: 
	<Text style={{color:(TEMP > 22 ? '#f04048' : (TEMP < 16 ? '#40c5f4' : 'lightgreen')),fontSize: 24,fontWeight: 'bold'}}> {TEMP}°C </Text>
      </Text>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> {"T\x20\x20"} </Text>
      	<InputSpinner
      	    skin={'clean'}
      	    style={styles.item}
      	    width={140}
      	    max={24}
      	    min={8}
      	   step={1}
      	    colorMax={"#f04048"}
      	    colorMin={"#40c5f4"}
      	    value={T}
      	    onChange={(num) => {
	      setT(num);
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> {"P\x20\x20"} </Text>
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
      	    value={P}
      	    onChange={(num) => {
	      setP(num)
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> {"I\x20\x20\x20"} </Text>
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
      	    value={I}
      	    onChange={(num) => {
	      setI(num)
      	    }}
      	/>
      </View>
      <View style={styles.buttonslayout}>
	<Text style={{color:'white',fontSize: 26,fontWeight: 'bold', marginVertical: 30}}> {"D\x20\x20"} </Text>
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
      	    value={D}
      	    onChange={(num) => {
	      setD(num)
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
      	    value={ST}
      	    onChange={(num) => {
	      setST(num)
      	    }}
      	/>
      </View>
      <SmallButton title="SUBMIT" onPress={SendData} />
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

