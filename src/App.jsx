import React, { useState } from 'react';

//todo 아이템 스타일

const todoinstyle = {
  width: '300px',
  height: '200px',
  border: '3px solid red',
  borderRadius: '10px',
  marginLeft: '10px',
};

//todo 추가 폼 컨포넌트
const SubmitForm = ({ onAddItem }) => {
  const [name, setName] = useState('');
  const [nameco, setNameco] = useState('');

  const handleSubmit = () => {
    onAddItem({ title: name, content: nameco });
    setName('');
    setNameco('');
  };

  return (
    <div className='subbmit' style={{ width: '700px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:"grey" }}>
      <input type='text' placeholder='제목' value={name} onChange={(e) => setName(e.target.value)} className='name'></input>
      <input type='text' placeholder='내용' style={{ margin: '10px' }} value={nameco} onChange={(e) => setNameco(e.target.value)} className='nameco'></input>
      <button onClick={handleSubmit} className='gobtn'>제출</button>
    </div>
  );
};

//todoitem 폼 컨포넌트
const ToDoItem = ({ id, title, content, onDelete, onComplete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleComplete = () => {
    onComplete(id);
  };

  return (
    <div className='todoin' style={todoinstyle}>
      <div className='todotext' style={{ paddingLeft: '20px' }}>
        <h2>{title}</h2>
        <p style={{ height: '50px' }}>{content}</p>
      </div>
      <div className='btn' style={{ textAlign: 'center', paddingTop: "10px"}}>
        <button onClick={handleDelete}>삭제하기</button> <button onClick={handleComplete}>완료</button>
      </div>
    </div>
  );
};

//doneitem 폼 컨포넌트
const DoneItem = ({ id, title, content, onCancel, onDelete }) => {
  const doneHandleDelete = () => {
    onDelete(id);
  };

  const handleCancel = () => {
    onCancel(id);
  };

  return (
    <div className='donein' style={todoinstyle}>
      <div className='donetext' style={{ paddingLeft: '20px' }}>
        <h2>{title}</h2>
        <p style={{ height: '50px' }}>{content}</p>
      </div>
      <div className='btn' style={{ textAlign: 'center',paddingTop: "10px" }}>
        <button onClick={doneHandleDelete}>삭제하기</button> <button onClick={handleCancel}>취소</button>
      </div>
    </div>
  );
};


//앱 컴포넌트 

const App = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);

  //todo 추가 함수 // newItem 객체를 받아와서 현재 todoItems 배열에 추가하고, 각 항목에 고유한 id를 할당하여 저장함
  const handleAddItem = (newItem) => {
    setTodoItems([...todoItems, { ...newItem, id: todoItems.length }]);
  };
  //todo 삭제 함수 // id와 일치하지 않는 항목들만 필터링하여 새로운 todoItems 배열로 설정
  const handleDeleteItem = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };
  //todo 완료 함수 // 해당 항목을 doneItems 배열에 추가하고, todoItems 배열에서는 해당 항목을 제거
  const handleCompleteItem = (id) => {
    const itemToComplete = todoItems.find((item) => item.id === id);
    setDoneItems([...doneItems, itemToComplete]);
    setTodoItems(todoItems.filter((item) => item.id !== id));
  };
  //완료 -> 취소 함수 // id를 가진 항목을 doneItems 배열에서 제거하고, 해당 항목을 todoItems 배열에 추가
  const handleCancelItem = (id) => {
    const itemToCancel = doneItems.find((item) => item.id === id);
    setTodoItems([...todoItems, itemToCancel]);
    setDoneItems(doneItems.filter((item) => item.id !== id));
  };
  //완료 상태에서 삭제하는 함수 -> id를 가진 항목을 doneItems 배열에서 제거
  const doneHandleDelete = (id) => {
    setDoneItems(doneItems.filter((item) => item.id !== id));
  };

  return (
    <div style={{ width: '1200px', height: '800px', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <SubmitForm onAddItem={handleAddItem} />

      <div className='todobox'>
        <h1>Working..!</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ToDoItem title="해야 할 일" content="상단 인풋에 제목과, 내용을 기입하고 제출 버튼을 누르시면 이 포스트 옆에 카드가 생성됩니다." />
          {todoItems.map((item) => (
            <ToDoItem key={item.id} id={item.id} title={item.title} content={item.content} onDelete={handleDeleteItem} onComplete={handleCompleteItem} />
          ))}
        </div>
      </div>

      <div className='donebox'>
        <h1>Done..!</h1>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DoneItem title="완료한 일" content="삭제하기 버튼 클릭 시 카드가 삭제되고, 취소 버튼 클릭 시 카드가 해야 할 일 리스트로 돌아갑니다."/>
        {doneItems.map((item) => (
          <DoneItem key={item.id} id={item.id} title={item.title} content={item.content} onDelete={doneHandleDelete} onCancel={handleCancelItem} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default App;