import React, { useState, useEffect } from 'react';
import './styles.css';
import { Card, CardProps } from '../../components/Card';

type TProfileResponse = {
  name: string;
  avatar_url: string;
}

type TUser = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<TUser>({} as TUser);

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    // corpo do useEffect
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/Vitchenzo2812')
      const data = await response.json() as TProfileResponse;
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }

    fetchData();
  
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input 
      type="text" 
      placeholder="Digite seu nome..."
      onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name} 
            time={student.time}
          />
        ))        
      }      
    </div>
  )
}

export default Home