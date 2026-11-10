import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from "react-native";

const URL =
  "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL";

export default function App() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erro " + res.status);
        return res.json();
      })
      .then((json) => setDados(Object.values(json)))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", padding: 12 }}>
        Cotações
      </Text>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>Valor: R$ {Number(item.bid).toFixed(2)}</Text>
            <Text>Máxima: R$ {Number(item.high).toFixed(2)}</Text>
            <Text>Mínima: R$ {Number(item.low).toFixed(2)}</Text>
            <Text>Variação: {item.pctChange}%</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
