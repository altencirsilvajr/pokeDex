import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import { styles } from './src/screens/Home/style';

interface Pokemon {
  id: number;
  nome: string;
}

const pokemons: Pokemon[] = [
  { id: 1, nome: "Bulbasauro" },
  { id: 2, nome: "Ivysaur" }
];

function HomeScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const handlePokemonSelection = (pokemon: Pokemon) => {
    navigation.navigate('Details', { pokemon });
  }

  return (
    <View style={styles.Container}>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>ESCOLHA SEU POKÉMON</Text>
      </View>
      <ScrollView>
        {pokemons.map(({ id, nome }) => (
          <View style={styles.cardContainer} key={id}>
            <Text style={styles.cardTitle}>{nome}</Text>
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
  nome: string;
  img: string;
  peso: number;
}

function DetailsScreen({ navigation, route }: { navigation: NavigationProp<any>, route: any }) {
  const [pokemon, setPokemon] = useState<PokemonDetails>({ nome: '', img: '', peso: 0 });

  const getPokemonData = (idPokemon: number) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const pokemonDetails: PokemonDetails = {
          nome: json.name,
          img: json.sprites.other["official-artwork"].front_default,
          peso: json.weight,
        };
        setPokemon(pokemonDetails);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');
      });
  }

  const { pokemon: selectedPokemon } = route.params;
  getPokemonData(selectedPokemon.id);

  return (
    <View style={styles.Container}>
      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>SOBRE O POKÉMON:</Text>
      </View>
      <View style={styles.pokemonBox}>
        <Text style={styles.pokemonNome}>Codinome: {pokemon.nome}</Text>
        <Text style={styles.pokemonPeso}>Peso: {pokemon.peso}</Text>
        <Image resizeMode="stretch" source={{ uri: pokemon.img }} style={styles.pokemonImg} />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
