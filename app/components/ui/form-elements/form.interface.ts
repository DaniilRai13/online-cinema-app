import { EditorProps } from 'draft-js'
import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> { }

export interface IFieldProps {
	placeholder: string,
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps
export interface IField extends TypeInputPropsField { }

type TypeEditFieldsProps = EditorProps & IFieldProps
export interface ITextEditor extends Omit<TypeEditFieldsProps, 'editorState'> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange: (...event: any[]) => void
	value: string
}