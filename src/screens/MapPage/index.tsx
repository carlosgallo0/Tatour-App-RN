import React, { useState } from "react";
import { theme } from "../../global/styles/theme";

import { MapViewProps, Marker, Polyline } from "react-native-maps";
import { View, Text } from "react-native";
import { Container, Map, Title, Button, Icon } from "./styles";
import { CustomMarker, CustomMarkerProps } from "../../components/CustomMarker";
import { MapLines } from "./components/MapLines";

import { coordinates } from "../../global/types/vroomTypes";

import { handleOptimizeButtonClick } from "../../services/handleOptimizeButtonClick";

type Props = MapViewProps & {
  title: string;
};

export function MapPage({ ...rest }) {
  const [baseCoordinates, setBaseCoordinates] = useState<coordinates>();
  const [pointsCoordinates, setPointsCoordinates] = useState<coordinates[]>([]);
  const [optimizedPointsCoordinates, setOptimizedPointsCoordinates] = useState(
    []
  );

  const mockRegion = {
    latitude: -22.908,
    longitude: -43.17,
    latitudeDelta: 0.06,
    longitudeDelta: 0.04,
  };

  const mockOptimizedPointsCoordinates = [
    { latitude: -22.904589380614983, longitude: -43.20372596383095 },
    { latitude: -22.90370176860781, longitude: -43.21035571396352 },
    { latitude: -22.909536614724093, longitude: -43.20950377732515 },
    { latitude: -22.8973894875608, longitude: -43.20061560720205 },
    { latitude: -22.914174849474556, longitude: -43.1990971416235 },
  ];

  const handleLongPressEvents = (nativeEvent) => {
    const pointCoordinates = nativeEvent.coordinate;
    setBaseCoordinates(pointCoordinates);
    setPointsCoordinates([]);
  };

  const handlePressEvents = (nativeEvent) => {
    setPointsCoordinates([...pointsCoordinates, nativeEvent.coordinate]);
  };

  return (
    <Container>
      <Map
        {...rest}
        initialRegion={mockRegion}
        onPress={(e) => handlePressEvents(e.nativeEvent)}
        onLongPress={(e) => handleLongPressEvents(e.nativeEvent)}
      >
        <MapLines coordinates={mockOptimizedPointsCoordinates} />
        {baseCoordinates && (
          <Marker coordinate={baseCoordinates} title="Base">
            <View
              style={{
                backgroundColor: theme.colors.line,
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text>B</Text>
            </View>
          </Marker>
        )}

        {pointsCoordinates.map((item) => (
          <Marker key={Math.random()} coordinate={item} title={"test"}>
            <View
              style={{
                backgroundColor: theme.colors.primary100,
                padding: 5,
                borderRadius: 10,
              }}
            >
              <Text>P</Text>
            </View>
          </Marker>
        ))}
      </Map>

      <Button
        onPress={() =>
          handleOptimizeButtonClick(baseCoordinates, pointsCoordinates)
        }
      >
        <Title>OTIMIZAR ROTA</Title>
      </Button>
    </Container>
  );
}
