// CreateToDo.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';

type Props = {
	// props의 타입 정의
};

interface IForm {
	toDo: string;
	// 다른 필드들도 추가할 수 있습니다.
}

const CreateToDo: React.FC<Props> = () => {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();

	const handleValid = ({ toDo }: IForm) => {
		console.log('add to do', toDo);
		setToDos((oldToDos) => [
			{ text: toDo, id: Date.now(), category },
			...oldToDos,
		]);
		setValue('toDo', '');
	};

	return (
		<form onSubmit={handleSubmit(handleValid)}>
			<input
				{...register('toDo', {
					required: 'Please write a To Do',
				})}
				placeholder='Write a to do'
			/>

			<button>Add</button>
		</form>
	);
};

export default CreateToDo;
