import {StatusBar} from "expo-status-bar";
import {Dimensions, ScrollView, StyleSheet, Text, View} from "react-native";
const {width: SCREEN_WIDTH} = Dimensions.get("window");
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        contentContainerStyle={styles.weather}
      >
        <View style={styles.day}>
          <Text style={styles.temp}>20</Text>
          <Text style={styles.description}>snow..</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20</Text>
          <Text style={styles.description}>snow..</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20</Text>
          <Text style={styles.description}>snow..</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>20</Text>
          <Text style={styles.description}>snow..</Text>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "orange"},
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {fontSize: 68, fontWeight: "600"},
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 158,
  },
  description: {
    marginTop: -30,
    fontSize: 50,
  },
});

/* 웹과 다른 엘리멘탈을 사용해야한다.
리엑트 네이티브에 없는 api는 동일한 동작을 하는 다른 api 를 찾아 설치하고 사용해야한다.
기본적으로 view는 flex로 이루어져있다
flex direction은 웹과 다른게 column이다
웹과 다르게 width와 height를 사용하지 않고 flex의 비율을 사용한다.  */
