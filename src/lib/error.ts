import { toast } from 'react-toastify'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export const errorHandler = function <T extends FieldValues>(
    { form, error }: {
        form?: UseFormReturn<T> | null | undefined,
        error: any
    },
) {

    const { data: errors } = error.response

    if ('non_field_errors' in errors) {
        toast.error(errors.non_field_errors[0])
    } else if ('detail' in errors) {
        toast.error(errors.detail)
    } else if (typeof errors === 'object' && errors !== null) {
        const fieldsErrors: { name: string; errors: any[] }[] = []

        Object.entries(errors).forEach(([key, value]) => {
            fieldsErrors.push({
                name: key,
                errors: Array.isArray(value) ? value : [value],
            })
        })


        if (form) {
            const { setError } = form

            fieldsErrors.forEach((fieldError) => {
                // @ts-ignore
                setError(fieldError.name as keyof T, {
                    type: 'manual',
                    message: fieldError.errors[0],
                })
            })
        } else {
            fieldsErrors.forEach((fieldError) => {
                toast.error(`${fieldError.name}: ${fieldError.errors[0]}`)
            })
        }

        return fieldsErrors
    } else {
        toast.error('Internal Server Error')
    }
}
