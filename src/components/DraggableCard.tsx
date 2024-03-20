/* eslint-disable react-refresh/only-export-components */
// DragabbleCard.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

type Props = {
	toDo: string;
	index: number;
};

const Card = styled.div`
	background-color: ${(props) => props.theme.cardColor};
	padding: 10px 10px;
	border-radius: 5px;
	margin-bottom: 5px;
`;

const DraggableCard: React.FC<Props> = ({ toDo, index }) => {
	console.log(toDo, ' rerendered');

	return (
		<Draggable
			// key={toDo}
			draggableId={toDo}
			index={index}>
			{(magic) => (
				<Card
					ref={magic.innerRef}
					{...magic.draggableProps}
					{...magic.dragHandleProps}>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
};

export default React.memo(DraggableCard);
