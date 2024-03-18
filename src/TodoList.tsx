import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

// export default ToDoList;

// ToDoList.tsx
type Props = {
	// props의 타입 정의
};

interface IForm {
	email: string;
	firstName: string;
	lastName: string;
	userName: string;
	password: string;
	password1: string;
	extraError?: string;
	// 다른 필드들도 추가할 수 있습니다.
}

const ToDoList: React.FC<Props> = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm<IForm>({
		defaultValues: {
			email: '@naver.com',
		},
	});
	const onValid = (data: IForm) => {
		if (data.password !== data.password1) {
			setError(
				'password1',
				{ message: 'Password are not the same' },
				{ shouldFocus: true }
			);
		}
		setError('extraError', { message: 'Server offline.' });
		setValue('email', '');
		setValue('firstName', '');
		setValue('lastName', '');
		setValue('email', '');
	};

	return (
		<div>
			<form
				style={{ display: 'flex', flexDirection: 'column' }}
				onSubmit={handleSubmit(onValid)}>
				<input
					{...register('email', {
						required: 'Email is required',
						pattern: {
							value: /^[A-Za-z0-9._%+-]+@naver.com$/,
							message: 'Only naver.com emails allowed',
						},
					})}
					placeholder='email'
				/>
				<span>{errors?.email?.message}</span>
				<input
					{...register('firstName', { required: 'Write here' })}
					placeholder='firstName'
				/>
				<span>{errors?.firstName?.message}</span>

				<input
					{...register('lastName', {
						required: 'Write here',
						validate: {
							noNico: (value) =>
								value.includes('nico') ? 'no nico allowed' : true,
							noNick: (value) =>
								value.includes('nick') ? 'no nick allowed' : true,
						},
					})}
					placeholder='lastName'
				/>
				<span>{errors?.lastName?.message}</span>

				<input
					{...register('userName', { required: 'Write here', minLength: 10 })}
					placeholder='userName'
				/>
				<span>{errors?.userName?.message}</span>

				<input
					{...register('password', { required: 'Write here', minLength: 5 })}
					placeholder='password'
				/>
				<span>{errors?.password?.message}</span>

				<input
					{...register('password1', {
						required: 'Password is required',
						minLength: {
							value: 5,
							message: 'Your password is too short',
						},
					})}
					placeholder='password1'
				/>
				<span>{errors?.password1?.message}</span>

				<button>Add</button>
				<span>{errors?.extraError?.message}</span>
			</form>
		</div>
	);
};

export default ToDoList;
