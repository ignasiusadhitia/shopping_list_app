import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import SearchInput from "./components/SearchInput";
import Info from "./components/Info";
import Empty from "./components/Empty";
import Todos from "./components/Todos";

function App() {
  // STATE
  // handling event pada react component
  // variabel value, dengan mutator setValue, dan dengan nilai default "" (empty string)
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { title: "Susu ultra", count: 1 },
    { title: "Tahu sumedang", count: 1 },
    { title: "Semangka", count: 1 },
  ]);

  const handleSubmit = (e) => {
    // mencegah browser melakukan auto-refresh
    e.preventDefault();

    // value added todo tidak boleh kosong
    if (!value) {
      alert("No blank list!");
      return;
    }

    // merge isi todos dengan todo baru
    const addedTodos = [
      ...todos,
      {
        title: value,
        count: 1,
      },
    ];

    setTodos(addedTodos);

    // kembalikan input ke default value => empty string setelah menambahkan todo
    setValue("");
  };

  const handleAdditionCount = (index) => {
    const newTodos = [...todos];

    newTodos[index].count = newTodos[index].count + 1;

    setTodos(newTodos);
  };

  const handleSubstractionCount = (index) => {
    const newTodos = [...todos];

    if (newTodos[index].count > 0) {
      // selama jumlah count masih di atas 0, masih bisa melakukan pengurangan nilai count

      newTodos[index].count = newTodos[index].count - 1;
    } else {
      // jika count bernilai nol dan masih dikurangi juga, maka array value dari index yang sesuai akan dihapus

      newTodos.splice(index, 1);
    }

    setTodos(newTodos);
  };

  const getTotalCounts = () => {
    // hitung total nilai count
    // num adalah masing-masing property dari todos state

    const totalCounts = todos.reduce((total, num) => {
      // total adalah parameter yang berisi value yang kita berikan di parameter ke-2 (lihat line 78).
      // num.count adalah property dari todos yang akan dijumlahkan nilainya

      return total + num.count;

      // ini default value dari method reduce
    }, 0);

    return totalCounts;
  };

  return (
    <>
      <Navbar />

      <Container>
        <SearchInput
          onSubmit={handleSubmit}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <Info
          todosLength={todos.length}
          totalCounts={getTotalCounts()}
          onDelete={() => setTodos([])}
        />

        {todos.length > 0 ? (
          <Todos
            todos={todos}
            onSubstraction={(index) => handleSubstractionCount(index)}
            onAddition={(index) => handleAdditionCount(index)}
          />
        ) : (
          <Empty />
        )}
      </Container>
    </>
  );
}

export default App;
