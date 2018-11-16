import React from 'react';
import axios from 'axios'
import { AsyncStorage } from "react-native"
import {
  Image,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';

/*
var Colors = {
  bg: '#0d224d',
  bg1: '#19346d',
  t1: '#8090b2',
  t2: 'white',
}
*/


/*
TODO:
*/


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBot: 'ATTACK',
      activeRange: 'all_time',
      timeRanges: ['24h', '7d', '30d', 'all_time'],
      timeRangeNames: ['24 hours', '7 days', '30 days', 'All time'],
      timeRange: '24h',
      percentage: [0, 0, 0, 0, 0, 0],
    };
  }


  static navigationOptions = {
    // header: null,
    title: 'Dashboard',
    headerStyle: {
      backgroundColor: Colors.bg,
    },
    headerTitleStyle: { alignSelf: 'center', color: Colors.t1, fontSize: 16, textAlign: 'center', flex: 1 },
    // headerLeftStyle: { color: Colors.t1, alignItems: 'center' },
    headerLeft: (
      <Icon
        style={{ color: Colors.t1, paddingHorizontal: 20 }}
        onPress={() => alert('This is a button!')}
        name='bars'
        size={18}
      />
    ),
    headerRight: (
      <Icon
        style={{ color: Colors.t1, paddingHorizontal: 20 }}
        onPress={() => alert('This is a button!')}
        name='repeat'
        size={18}
      />
    ),
  };


  render() {
    const { activeRange, activeBot, timeRanges, timeRangeNames, timeRange, percentage } = this.state


    var colorOfPercent = []
    percentage.map((item,i) => {
      colorOfPercent[i] = 'white'
      if ( percentage[i] > 0 ) {
        colorOfPercent[i] = '#30bd2c'
      } else {
        colorOfPercent[i] = '#ff6694'
      }
    })


    return (
      <View style={styles.container}>


          {/* Balance */}
          <View style={{
            paddingVertical: 20
          }}>
            <Text style={{ color: Colors.t1, fontSize: 10, paddingHorizontal: 15, ...styles.fontBold}}>
              TRADING CAPITAL
            </Text>

            <View style={{
              flexDirection: 'row',
            }}>
              <Text style={{ color: Colors.t2, fontSize: 30, paddingHorizontal: 15, ...styles.font }}>
                1.00865 BTC
              </Text>

              <View style={{
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{ color: Colors.t1, fontSize: 10, paddingHorizontal: 3, ...styles.fontBold }}>
                    BALANCE:
                  </Text>
                  <Text style={{ color: Colors.t2, fontSize: 10, ...styles.fontBold }}>
                    10 850 H
                  </Text>
                </View>
                <View style={{
                  flexDirection: 'row'
                }}>
                  <Text style={{ color: Colors.t1, fontSize: 10, paddingHorizontal: 3, ...styles.fontBold }}>
                    ON HOLD:
                  </Text>
                  <Text style={{ color: Colors.t2, fontSize: 10, ...styles.fontBold }}>
                    24 000 H
                  </Text>
                </View>
              </View>

            </View>
          </View>



          {/* Graph */}
          <View style={{
            height: 250, justifyContent: 'center', flex: 1
          }}>
            <Text style={{ color: Colors.t1, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
              GRAPH HERE
            </Text>
          </View>




          {/* Bots */}
          <View style={{
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}>
            <View style={{
              flexDirection: 'row',
            }}>

              <TouchableOpacity style={{
                backgroundColor: (activeBot==='ATTACK')?Colors.bg2:Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: (activeBot==='ATTACK')?Colors.bg2:Colors.bg1,
              }}
                onPress={() => this.chooseBot('ATTACK')}
              >
                <Icon
                  style={{ color: '#FFA500', paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
                <Text style={{ color: Colors.t2, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  ATTACK
                </Text>
                <Text style={{ color: colorOfPercent[0], fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  {percentage[0]}%
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                backgroundColor: Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.bg1,
                borderRadius: 5,
              }}
                onPress={() => console.log('PLACE BOT HERE')}
              >
                <Icon
                  style={{ color: Colors.bg, paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
              <Text style={{ color: Colors.t1, fontSize: 10, textAlign: 'center', paddingHorizontal: 10, ...styles.fontBold }}>
                  PLACE BOT HERE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                backgroundColor: (activeBot==='BALANCE')?Colors.bg2:Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: (activeBot==='BALANCE')?Colors.bg2:Colors.bg1,
              }}
                onPress={() => this.chooseBot('BALANCE')}
              >
                <Icon
                  style={{ color: '#a4d3f0', paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
                <Text style={{ color: Colors.t2, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  BALANCE
                </Text>
                <Text style={{ color: colorOfPercent[1], fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  {percentage[1]}%
                </Text>
              </TouchableOpacity>

            </View>



            <View style={{
              flexDirection: 'row',
            }}>

              <TouchableOpacity style={{
                backgroundColor: (activeBot==='DEFENCE')?Colors.bg2:Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: (activeBot==='DEFENCE')?Colors.bg2:Colors.bg1,
              }}
                onPress={() => this.chooseBot('DEFENCE')}
              >
                <Icon
                  style={{ color: '#30bd2c', paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
                <Text style={{ color: Colors.t2, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  DEFENCE
                </Text>
                <Text style={{ color: colorOfPercent[2], fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  {percentage[2]}%
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                backgroundColor: (activeBot==='MEGABOT')?Colors.bg2:Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: (activeBot==='MEGABOT')?Colors.bg2:Colors.bg1,
              }}
                onPress={() => this.chooseBot('MEGABOT')}
              >
                <Icon
                  style={{ color: '#ffff00', paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
                <Text style={{ color: Colors.t2, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  MEGABOT
                </Text>
                <Text style={{ color: colorOfPercent[3], fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  {percentage[3]}%
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                backgroundColor: (activeBot==='ATTACK2')?Colors.bg2:Colors.bg1,
                paddingVertical: 10,
                margin: 1,
                flex: 1,
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: (activeBot==='ATTACK2')?Colors.bg2:Colors.bg1,
              }}
                onPress={() => this.chooseBot('ATTACK2')}
              >
                <Icon
                  style={{ color: 'red', paddingVertical: 5 }}
                  name='paw'
                  size={40}
                />
                <Text style={{ color: Colors.t2, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  ATTACK2
                </Text>
                <Text style={{ color: colorOfPercent[4], fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  {percentage[4]}%
                </Text>
              </TouchableOpacity>
            </View>




            {/* Time range */}
            <View style={{
              paddingVertical: 20,
              flexDirection: 'row',
            }}>

              <View style={{
                //backgroundColor: Colors.bg1,
                paddingVertical: 5,
                marginHorizontal: 5,
                flex: 1.2,
                alignItems: 'center',
              }}>
                <Text style={{ color: Colors.t1, fontSize: 10, textAlign: 'center', ...styles.fontBold }}>
                  Time Range:
                </Text>
              </View>

              {
                timeRanges.map((item,i) => {
                  return (
                    <TouchableOpacity key={i} style={{
                      backgroundColor: (item == activeRange)?Colors.bg1:Colors.bg,
                      paddingVertical: 5,
                      marginHorizontal: 5,
                      flex: 1,
                      alignItems: 'center',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: (item == activeRange)?Colors.bg2:Colors.bg1
                    }}
                      onPress={() => this.setTimeRange(item)}
                    >
                      <Text style={{
                          color: (item == activeRange)?Colors.t2:Colors.t1,
                          fontSize: 10, textAlign: 'center', ...styles.fontBold
                      }}>
                        {timeRangeNames[i]}
                      </Text>
                    </TouchableOpacity>
                  )
                })

              }

            </View>



          </View>


      </View>
    );
  }


  setTimeRange = async (t) => {

    var data = await AsyncStorage.getItem('@MySuperStore:data')
    if (!data) {
      var res = await this.getFileFromSwarm();
      await AsyncStorage.setItem('@MySuperStore:data', JSON.stringify(res));
      data = res;
    }

    var arr = []
    JSON.parse(data)['bots'].map((item,i) => {
      arr[i] = item[t]
    })

    console.log(arr);

    this.setState({ activeRange: t, timeRange: t, percentage: arr });

  }


  chooseBot = (b) => {
    this.setState({ activeBot: b });
  }


  getFileFromSwarm = async () => {
    var gate = 'https://30400.swarm-gateways.net/bzz:/'
    var hash = '604982d7135410bb60860b521ba56643b441c3a605334162b66d9e22788667e8';
    var res = {}
    await axios.get(gate + hash)
    .then((response) => {
      res = response.data;
      // console.log('file content: ', response.data);
    })
    .catch((err) => {
      console.error('error',err);
    });
    return res;
  }


  componentWillMount = async () => {
    var data = await AsyncStorage.getItem('@MySuperStore:data')
    if (!data) {
      var res = await this.getFileFromSwarm();
      await AsyncStorage.setItem('@MySuperStore:data', JSON.stringify(res));
      data = res;
    }

    var arr = []
    JSON.parse(data)['bots'].map((item,i) => {
      arr[i] = item[this.state.activeRange]
    })

    console.log(arr);

    this.setState({ percentage: arr });
  }

}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  font: {
    ...Platform.select({
     ios: { fontFamily: 'OpenSans', },
     android: { fontFamily: 'Roboto' }
    })
  },
  fontBold: {
    fontWeight: 'bold',
    ...Platform.select({
     ios: { fontFamily: 'OpenSans', },
     android: { fontFamily: 'Roboto' }
    })
  }
});
