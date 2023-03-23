import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView, Text,TextInput, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { styles } from './src/screens/Home/style';
import axios from 'axios';

interface Pokemon {
  id: number;
  nome: string;
}

const pokemons: Pokemon[] = [
  { id: 1, nome: "Bulbasauro" },
  { id: 2, nome: "Ivysaur" },
  { id: 3, nome: "venusaur" },
  { id: 4, nome: "charmander" },
  { id: 5, nome: "charmeleon" },
  { id: 6, nome: "charizard" },
  { id: 7, nome: "squirtle" },
  { id: 8, nome: "wartortle" },
  { id: 9, nome: "blastoise" },
  { id: 10, nome: "caterpie" },
  { id: 11, nome: "metapod" },
  { id: 12, nome: "butterfree" },
  { id: 13, nome: "weedle" },
  { id: 14, nome: "kakuna" },
  { id: 15, nome: "beedrill" },
  { id: 16, nome: "pidgey" },
  { id: 17, nome: "pidgeotto" },
  { id: 18, nome: "pidgeot" },
  { id: 19, nome: "rattata" },
  { id: 20, nome: "raticate" },
];

function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const handlePokemonSelection = (pokemon: Pokemon) => {
    navigation.navigate('Details', { pokemon });
  }
  const [searchText, setSearchText] = useState<string>('');


  return (
    <View style={styles.Container}>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>POKÉDEX VIRTUAL</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar Pokémom"
          onChangeText={text => setSearchText(text)}
          value={searchText}
        />



      </View>
      <ScrollView>
        {pokemons.filter(pokemon => pokemon.nome.toLowerCase().includes(searchText.toLowerCase())).map(({ id, nome }) => (
          <View style={styles.cardContainer} key={id}>
            <Text style={styles.cardTitle}> {nome} </Text>
            <Button
              title="Sobre o Pokémon"
              onPress={() => handlePokemonSelection({ id, nome })}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}






interface PokemonDetails {
  img: string;
  peso: number;
  habilidades: string[];
  especie: string;
  tipos: string[];
}

function DetailsScreen({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [pokemon, setPokemon] = useState<PokemonDetails>
    ({ img: '', peso: 0, habilidades: [],especie: '', tipos: [] });

  const [isLoading, setIsLoading] = useState<boolean>(true);


  const getPokemonData = async (idPokemon: number) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
      const abilities = response.data.abilities.map((ability: any) => ability.ability.name);
      const types = response.data.types.map((type: any) => type.type.name);
        const especieResponse = await axios.get(response.data.species.url);
      const especie = especieResponse.data.name;

      const pokemonDetails: PokemonDetails ={
        img: response.data.sprites.other['official-artwork'].front_default,
        peso: response.data.weight,
        habilidades: abilities,
        especie: especie,
        tipos: types
      };
      
      setPokemon(pokemonDetails);
      setIsLoading(false);
    } 
  catch (error){
      console.error(error);
      Alert.alert('Algo está errado:', 'Não foi possível encontrar o pokémom');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const { pokemon: selectedPokemon } = route.params;
      getPokemonData(selectedPokemon.id);
  },[])

  return (
    <View style={styles.Container}>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>SOBRE O POKÉMON:</Text>
      </View>
      {isLoading ? (
        <Text>Encontrando Pokémom...</Text>
      ) : (
        <View style={styles.pokemonBox}>
          <Text style={styles.pokemonEspecie}>Espécie: {pokemon.especie}</Text>
          <Text style={styles.pokemonPeso}>Peso: {pokemon.peso}</Text>
          <Text style={styles.pokemonTipos}>Tipos: {pokemon.tipos.join(', ')}</Text>
          <Text style={styles.pokemonHabilidades}>Habilidades: {pokemon.habilidades.join(', ')}</Text>
          <Image resizeMode="stretch" source={{ uri: pokemon.img }} style={styles.pokemonImg} />
        </View>
      )}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{headerShown: false}}>

        <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'My home' }}
        />
        <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
