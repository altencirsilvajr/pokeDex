import { StyleSheet } from "react-native";


export const styles = StyleSheet.create ({
  Container: { 
    flex: 1,
    backgroundColor: '#fff' 
  },
  
  topo: { 
    height: 100,
    padding: 20, 
    paddingTop: 40, 
    marginBottom: 45, 
    backgroundColor: '#e73e33' },

  topoTitulo: { fontSize: 20, 
    marginBottom: 15, 
    color: '#fff', 
    textAlign: 'center'},
  
  cardContainer: { 
    borderWidth: 1, 
    borderColor: '#e73e33', 
    borderRadius: 4, 
    marginBottom: 20, 
    marginHorizontal: 35, 
    padding: 10 },

  cardTitle: { 
    fontSize: 25, 
    marginBottom: 20, 
    textAlign: 'center', 
    color: '#656565' },
  
  pokemonBox: { 
    alignItems: 'center' },

  pokemonNome: { 
    fontSize: 22 },

  pokemonPeso: { 
    fontSize: 18 },
    
  pokemonImg:{ 
    width: 200, 
    height: 200,}

  });