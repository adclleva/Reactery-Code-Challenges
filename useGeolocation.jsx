import { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CURRENT_POSITION": {
      console.log({ action });
      return { ...state, coords: action.payload };
    }
    case "GET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const useGeolocation = () => {
  // Write the body of your hook here
  const [geoLocationState, dispatch] = useReducer(reducer, {
    coords: {
      latitude: null,
      longitude: null,
    },
    error: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: "GET_CURRENT_POSITION",
          payload: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.log({ error });
        dispatch({ type: "GET_ERROR", payload: error.message });
      }
    );
  }, []);

  return geoLocationState;
};

const App = () => {
  const { coords, error } = useGeolocation();

  if (error) {
    return <div>{error}</div>;
  }

  if (!coords?.latitude || !coords?.longitude) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <p>Latitude: {coords?.latitude}</p>
      <p>Longitude: {coords?.longitude}</p>
    </div>
  );
};

export default App;
