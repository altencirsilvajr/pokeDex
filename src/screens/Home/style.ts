import { StyleSheet } from "react-native";


export const styles = StyleSheet.create ({
  Container: { 
    flex: 1,
    backgroundColor: '#fff' 
  },
  
  topo: { 
    height: 190,
    padding: 20, 
    paddingTop: 40, 
    marginBottom: 20, 
    backgroundColor: '#e73e33' },

  topoTitulo: { 
    fontSize: 25, 
    marginTop: 18,
    marginBottom: 10, 
    color: '#fff', 
    textAlign: 'center'},

  searchBar:{
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 22,
    marginRight: 20,
    marginBottom:40,
    height: 55,
    padding: 10,
    fontSize: 15,
    color:'#000000',
  },
  
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

  pokemonPeso: { 
    fontSize: 25 ,
    marginBottom: 5,
    color: '#ff1a1a'
  },
  
  pokemonHabilidades: { 
    fontSize: 20,
    color: '#ff1a1a'
  },

  pokemonEspecie: { 
    fontSize: 25,
    marginBottom: 5,
    color: '#ff1a1a'
  },
  
  pokemonTipos: {
    fontSize: 25,
    marginBottom: 5,
    color: '#ff1a1a'
  },
    
  pokemonImg:{ 
    marginTop: 30,
    marginLeft: 70,
    marginRight: 45,
    width: 250, 
    height: 250,}

  });