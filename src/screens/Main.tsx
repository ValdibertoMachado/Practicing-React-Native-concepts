import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';


export interface Task {
  id: number;
  title: string;
  done: boolean;
}


export function Main() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [task, setTask] = useState('')
  //console.log(tasks)

const completedtasks = tasks.length
const completechecked = tasks.filter(function(item){return item.done === false}).length

console.log(completechecked);

function handleAddNewTask(){

  const search = tasks.filter(t => t.title === task)

  if (search.length !== 0) {
    Alert.alert("Atenção", "Nome da tarefa repetido!");
    return;
  }else{
    handleNewTask(task)
  }

  
}
function handleNewTask(newTaskTitle: string){
const newTask={
  id: new Date().getTime(),
  title: newTaskTitle,
  done: true,
}

setTasks([...tasks, newTask])

}

function handleToggleTaskDone(id: number) {

const searchTask = [...tasks] 
const taskDone = searchTask.find(t => t.id === id)

if(!taskDone){
  return
} else{
taskDone.done = !taskDone.done
setTasks(searchTask)
}
}



function handleRemoveTask(id: number){

  Alert.alert(
    "Deletar Task",
    "Tem certeza que deseja remover esta anotação?",
    [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => setTasks(tasks.filter((t) => t.id !== id))
      }
    ],
    { cancelable: false }
  );
 
}
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.view}>
        <Icon name="rocket" size={50} color="aqua" />
        <Text style={styles.text}>to</Text>
        <Text style={styles.texttwo}>do</Text>
      </View>

      <View style={styles.viewtwo}>
        <TextInput onSubmitEditing={() => handleAddNewTask()} value={task} onChangeText={setTask} placeholder='Adicione uma nova tarefa' style={styles.TextInput}></TextInput>
        <TouchableOpacity onPress={() => handleAddNewTask()} activeOpacity={0.8} style={styles.TouchableOpacity}>
          <Icon name="plus-circle-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.viewthree}>
        <View style={styles.viewfour}>
          <Text style={styles.textthree}>Criadas {completedtasks}</Text>
          <Text style={styles.textfour}>Concluídas {completechecked}</Text>
        </View>

        <View style={styles.viewfive}></View>

        

      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ScrollView contentContainerStyle={styles.ScrollView}>
            <View style={styles.FlatList}>
              {
                item.done
                ?
                <Icon onPress={() => handleToggleTaskDone(item.id)} name='checkbox-blank-circle-outline' size={30} color='white'/>
                :
                <Icon onPress={() => handleToggleTaskDone(item.id)} name='checkbox-marked-circle' size={30} color='white'/>
              }
              
              <Text style={item.done ? styles.textseven : styles.texteight}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
                <Icon name="delete" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
        ListEmptyComponent={() => (
<View style={styles.viewsix}>
          <IconFontAwesome name="tasks" size={50} color="darkgray"></IconFontAwesome>
          <Text style={styles.textsix}>Você ainda não tem tarefas cadastradas</Text>
          <Text style={styles.textsix}>Crie tarefas e organize seus itens a fazer</Text>
        </View>
        )}
      />

    </View>


  );
}

const styles = StyleSheet.create({

  ScrollView: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },

  view: {
    backgroundColor: 'black',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,

  },

  viewtwo: {
    justifyContent: 'center',
    paddingHorizontal: '15%',
    flexDirection: 'row',
    marginTop: '-5%',
    position: 'relative',
  },

  viewthree: {
    marginTop: 10,
    height: '10%',
    marginHorizontal: '5%'
  },

  viewfour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20

  },

  viewfive: {
    height: 20,
    borderBottomColor: 'darkgray',
    borderStyle: 'solid',
    borderBottomWidth: 2,
  },

  viewsix: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  text: {
    color: 'aqua',
    fontSize: 50,
  },

  texttwo: {
    color: 'violet',
    fontSize: 50,
  },

  textthree: {
    color: 'aqua',
    fontSize: 20,
  },

  textfour: {
    color: 'violet',
    fontSize: 20,
  },

  textsix: {
    color: 'darkgray',
    fontSize: 15,
  },

  textseven: {
    fontSize: 20,
    color: 'white',
    flex: 1,
    paddingLeft: 10,
    
  },

  texteight: {
    paddingLeft: 10,
    fontSize: 20,
    color: 'white',
    flex: 1,
    textDecorationLine: 'underline line-through',
  },

  TextInput: {
    backgroundColor: 'darkgray',
    height: 50,
    borderRadius: 5,
    flex: 1,
    paddingLeft: 10,
    fontSize: 15,
  },

  TouchableOpacity: {
    backgroundColor: 'aqua',
    height: 50,
    width: 50,
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  FlatList: {
    backgroundColor: 'black',
    height: 50,
    width: "75%",
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: "center",
    paddingHorizontal: 10


  },


});
