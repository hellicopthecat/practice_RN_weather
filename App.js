import {StatusBar} from "expo-status-bar";
import * as Location from "expo-location";
import {useEffect, useState} from "react";
import {Fontisto} from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const year = new Date().getFullYear();
const month =
  new Date().getMonth() > 10
    ? "0" + (new Date().getMonth() + 1)
    : new Date().getMonth() + 1;
const date = new Date().getDate();

const base_url = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const icons = {
  "clear sky": "day-sunny",
  "few clouds": "day-cloudy",
  "scattered clouds": "cloudy",
  "broken clouds": "cloudy-gusts",
  "shower rain": "rains",
  rain: "rain",
  thunderstorm: "lightning",
  snow: "snow",
  mist: "fog",
};
export default function App() {
  const [city, setCity] = useState("Loading.. ");
  const [day, setDay] = useState([]);
  const [ok, setOk] = useState(true);
  const getLocateWeather = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({accuracy: 5});
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude},
      {useGoogleMaps: false}
    );

    setCity(`${location[0].region}, ${location[0].district}`);
    const response = await (await fetch(base_url(latitude, longitude))).json();
    setDay(
      response.list.filter((weather) => {
        if (weather.dt_txt.includes(`${year}-${month}-${date}`)) {
          return weather;
        }
      })
    );
    // console.log(day);
  };

  useEffect(() => {
    getLocateWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {day.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color={"white"} size={"large"} />
            <Text style={styles.temp}>No DATA</Text>
          </View>
        ) : (
          day.map((weather, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.time}>{weather.dt_txt.slice(0, 10)}</Text>
              <Text style={styles.time}>{weather.dt_txt.slice(11)}</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.temp}>{weather.main.temp.toFixed(1)}</Text>
                <View>
                  <Fontisto
                    name={icons[weather.weather[0].description]}
                    size={24}
                    color="black"
                  />
                  <Text style={styles.time}>{weather.weather[0].main}</Text>
                  <Text>{weather.weather[0].description}</Text>
                </View>
              </View>
            </View>
          ))
        )}
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
  cityName: {fontSize: 40, fontWeight: "600"},
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  time: {fontSize: 20, fontWeight: "600"},
  temp: {
    fontSize: 70,
    textAlign: "center",
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
