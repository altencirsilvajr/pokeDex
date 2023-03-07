import { StatusBar } from "react-native";
import { Home } from "./src/Home"
import React from "react";

export default function App() {
  return (
    <>
      <StatusBar 
          barStyle={"default"}
          backgroundColor= "transparent"
          translucent   
      />
      <Home/>
      </>
  );
}