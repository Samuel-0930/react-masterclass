/* eslint-disable react-refresh/only-export-components */
// DragabbleCard.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

type Props = {
	toDoId: number;
	toDoText: string;
	index: number;
};

const Card = styled.div<{ isDragging: boolean }>`
	background-color: ${(props) => props.theme.cardColor};
	padding: 10px 10px;
	border-radius: 5px;
	margin-bottom: 5px;
	background-color: ${(props) =>
		props.isDragging ? '#74b9ff' : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? '0px 2px 5px rgba(0,0,0,0.05)' : ''};
`;

const DraggableCard: React.FC<Props> = ({ toDoId, toDoText, index }) => {
	return (
		<Draggable
			// key={toDo}
			draggableId={toDoId + ''}
			index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.draggableProps}
					{...magic.dragHandleProps}>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
};

export default React.memo(DraggableCard);
