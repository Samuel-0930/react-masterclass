// Board.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DraggableCard from './DraggableCard';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';

type Props = {
	// props의 타입 정의
	toDos: ITodo[];
	boardId: string;
};

const Wrapper = styled.div`
	width: 300px;
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface IAreaProps {
	isDraggingFromThis: boolean;
	isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver
			? '#dfe6e6'
			: props.isDraggingFromThis
			? '#b2bec3'
			: 'transparent'};
	flex-grow: 1;
	transition: background-color 0.15s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;
	input {
		width: 100%;
	}
`;

interface IForm {
	toDo: string;
}

const Board: React.FC<Props> = ({ toDos, boardId }) => {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newToDo],
			};
		});
		setValue('toDo', '');
	};
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('toDo', { required: true })}
					type='text'
					placeholder={`Add task on ${boardId}`}
				/>
			</Form>
			<Droppable droppableId={boardId}>
				{(magic, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}>
						{toDos.map((toDo, index) => (
							<DraggableCard
								key={toDo.id}
								index={index}
								toDoId={toDo.id}
								toDoText={toDo.text}
							/>
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
};

export default Board;
