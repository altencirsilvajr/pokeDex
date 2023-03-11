import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, Image, Button} from 'react-native';
import { styles } from '../Home/style';

interface Pokemon {
  id: number;
  nome: string;
}

interface PokemonDetails {
  nome: string;
  img: string;
  peso: number;
}

const pokemons: Pokemon[] = [
  { id: 1, nome: "Bulbasauro" },
  { id: 2, nome: "Ivysaur" }
];

export function Detalhes() {

  const [pokemonEscolhido, setPokemonEscolhido] = useState<PokemonDetails | null>(null);

  const getPokemonData = (idPokemon: number) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`;

    fetch(endpoint)
      .then(resposta => resposta.json())
      .then(json => {
        const pokemon: PokemonDetails = {
          nome: json.name,
          img: json.sprites.other["official-artwork"].front_default,
          peso: json.weight,
        };

        setPokemonEscolhido(pokemon);
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível carregar os dados do Pokémon');
      });
  }

  return (
    <View style={styles.Container}>

      <View style={styles.topo}>
        <Text style={styles.topoTitulo}>ESCOLHA SEU POKÉMON</Text>
      </View>

      {pokemonEscolhido != null && (
        <View style={styles.pokemonBox}>
          <Text style={styles.pokemonNome}>Codinome: {pokemonEscolhido.nome}</Text>
          <Text style={styles.pokemonPeso}>Peso: {pokemonEscolhido.peso}</Text>

          <Image resizeMode="stretch" source={{ uri: pokemonEscolhido.img }} style={styles.pokemonImg} />
        </View>
      )}
      <ScrollView>
        {pokemons.map(pokemon => (
          <View style={styles.cardContainer} key={pokemon.id}>
            <Text style={styles.cardTitle}>{pokemon.nome}</Text>
            <Button title="Dados"
              onPress={() => getPokemonData(pokemon.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
