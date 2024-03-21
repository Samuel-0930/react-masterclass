// Board.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import styled from 'styled-components';

type Props = {
	// props의 타입 정의
	toDos: string[];
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

const Board: React.FC<Props> = ({ toDos, boardId }) => {
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
						ref={magic.innerRef}
						{...magic.droppableProps}>
						{toDos.map((toDo, index) => (
							<DraggableCard
								key={toDo}
								index={index}
								toDo={toDo}
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
