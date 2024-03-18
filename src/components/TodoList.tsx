import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

// ToDoList.tsx
type Props = {
	// props의 타입 정의
};

interface IForm {
	toDo: string;
	// 다른 필드들도 추가할 수 있습니다.
}

interface IToDo {
	text: string;
	id: number;
	category: 'TO_DO' | 'DOING' | 'DONE';
}

const toDoState = atom<IToDo[]>({
	key: 'toDo',
	default: [],
});

const ToDoList: React.FC<Props> = () => {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const {
		register,
		handleSubmit,

		setValue,
	} = useForm<IForm>();
	const handleValid = ({ toDo }: IForm) => {
		console.log('add to do', toDo);
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category: 'TO_DO' },
			...oldToDos,
		]);
		setValue('toDo', '');
	};
	console.log(toDos);

	return (
		<div>
			<h1>To Dos</h1>
			<hr />
			<form onSubmit={handleSubmit(handleValid)}>
				<input
					{...register('toDo', {
						required: 'Please write a To Do',
					})}
					placeholder='Write a to do'
				/>

				<button>Add</button>
			</form>
			<ul>
				{toDos.map((toDo) => (
					<li key={toDo.id}>{toDo.text}</li>
				))}
			</ul>
		</div>
	);
};

export default ToDoList;
