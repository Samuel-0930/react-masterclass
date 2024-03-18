// ToDo.tsx
import React from 'react';
import { Categories, IToDo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

type Props = IToDo;

const ToDo: React.FC<Props> = ({ text, category, id }) => {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: name as any };
			localStorage.setItem(
				'toDoList',
				JSON.stringify([
					...oldToDos.slice(0, targetIndex),
					newToDo,
					...oldToDos.slice(targetIndex + 1),
				])
			);
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	const handleDelete = () => {
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			console.log(targetIndex);

			localStorage.setItem(
				'toDoList',
				JSON.stringify([
					...oldToDos.slice(0, targetIndex),
					...oldToDos.slice(targetIndex + 1),
				])
			);
			return [
				...oldToDos.slice(0, targetIndex),
				...oldToDos.slice(targetIndex + 1),
			];
		});
	};

	return (
		<li>
			<span>{text}</span>
			{category !== Categories.TO_DO && (
				<button
					name={Categories.TO_DO}
					onClick={onClick}>
					To Do
				</button>
			)}
			{category !== Categories.DOING && (
				<button
					name={Categories.DOING}
					onClick={onClick}>
					Doing
				</button>
			)}
			{category !== Categories.DONE && (
				<button
					name={Categories.DONE}
					onClick={onClick}>
					Done
				</button>
			)}
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
};

export default ToDo;
