import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Interfaz que define la estructura de una idea
interface Idea {
  id: string;     
  value: string;  
}

// Componente principal
export default function App() {

  // Estados para el texto
  const [textoIdea, setTextoIdea] = useState<string>('');
  const [listaIdeas, setListaIdeas] = useState<Idea[]>([]);
  const [idEditando, setIdEditando] = useState<string | null>(null);

  // Guarda o edita una idea
  const guardarIdea = (): void => {

    if (textoIdea.trim().length === 0) {
      Alert.alert(
        'Campo vacío',
        'Por favor, escribe una idea antes de añadirla.'
      );
      return;
    }
    if (idEditando) {
      // EDITAR una idea existente
      setListaIdeas(listaActual =>
        listaActual.map(idea =>
          idea.id === idEditando
            ? { ...idea, value: textoIdea }
            : idea
        )
      );
      setIdEditando(null); // Sale del modo edición
    } else {
      // AGREGAR una nueva idea
      const nuevaIdea: Idea = {
        id: Math.random().toString(),
        value: textoIdea,
      };
      setListaIdeas(ideasActuales => [...ideasActuales, nuevaIdea]);
    }
    // Limpia el campo de texto
    setTextoIdea('');
  };

  // Elimina una idea
  const eliminarIdea = (idSeleccionado: string): void => {
    setListaIdeas(ideasActuales =>
      ideasActuales.filter(idea => idea.id !== idSeleccionado)
    );
  };

  // Carga una idea para editarla
  const editarIdea = (idea: Idea): void => {
    setTextoIdea(idea.value);
    setIdEditando(idea.id);
  };

  // Renderiza la interfaz
  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Gestor de ideas</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una idea"
          value={textoIdea}
          onChangeText={setTextoIdea}
        />
        <TouchableOpacity style={styles.button} onPress={guardarIdea}>
          <Text style={styles.buttonText}>
            {idEditando ? 'Guardar' : 'Añadir'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listaIdeas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{item.value}</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editarIdea(item)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarIdea(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Estilos de la aplicación
const styles = StyleSheet.create({
  screen: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#ccffe5'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#483260'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },
  input: {
    width: '75%',
    borderBottomColor: '#38e973',
    borderBottomWidth: 2,
    padding: 10,
    fontSize: 16
  },
  button: {
    backgroundColor: '#34d8db',
    padding: 12,
    borderRadius: 8
  },
  buttonText: {
    color: '#301556',
    fontWeight: 'bold'
  },
  listItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#65f9ad',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3
  },
  itemText: {
    fontSize: 16,
    color: '#170049',
    flex: 1
  },
  deleteButton: {
    backgroundColor: '#97d5ff',
    padding: 8,
    borderRadius: 5
  },
  deleteButtonText: {
    color: '#4458ef',
    fontWeight: 'bold',
    fontSize: 12
  },
  editButton:{
    backgroundColor: '#97d5ff',
    padding: 8,
    borderRadius: 5
  },
  editButtonText:{
    fontWeight: 'bold',
    fontSize: 12
  }
});
