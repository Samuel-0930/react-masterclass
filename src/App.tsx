// App.tsx
import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/Board';

type Props = {
	// props의 타입 정의
};

const Wrapper = styled.div`
	display: flex;
	width: 100vw;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	gap: 10px;
`;

const App: React.FC<Props> = () => {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult) => {
		const { destination, draggableId, source } = info;
		if (destination?.droppableId === source.droppableId) {
			setToDos((oldToDos) => {
				const boardCopy = [...oldToDos[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, draggableId);
				return {
					...oldToDos,
					[source.droppableId]: boardCopy,
				};
			});
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board
							boardId={boardId}
							key={boardId}
							toDos={toDos[boardId]}
						/>
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
};

export default App;
